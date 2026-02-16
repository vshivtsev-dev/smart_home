import type {Device, Sensor} from "@/generated/prisma/client";
import {getTargetNumber} from "@/helpers/getTargetNumber";
import {getDeviceFunctionBody, getDeviceFunctionByTarget,} from "@/utils/device/getDeviceFunction";
import {insertSoil} from "@/utils/device/insertSoil";
import type {SensorResponse, SoilValue} from "@/utils/device/model";
import {postToDevice} from "@/utils/device/postToDevice";

export async function compareSensorResponseWithConfig(
  device: Device,
  sensor: Sensor,
  sensorResponse: SensorResponse,
) {
  const deviceFunction = await getDeviceFunctionByTarget(sensor.target);
  const functionConfig = deviceFunction.config;
  const targetNumber = getTargetNumber(sensor.target);
  if (!functionConfig) {
    return;
  }
  if (sensor.type === "SOIL") {
    const soilResponse = sensorResponse[targetNumber] as SoilValue;
    if (soilResponse.moisture < functionConfig.minMoisture) {
      const functions = await getDeviceFunctionBody(deviceFunction.id);
      await postToDevice(device.ip, { functions });
    }
    await insertSoil(sensor.id, {
      ...soilResponse,
      duration: functionConfig.duration,
    });
  }
}
