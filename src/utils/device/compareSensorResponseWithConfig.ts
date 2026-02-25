import type {Device, Sensor} from "@/generated/prisma/client";
import {getTargetNumber} from "@/helpers/getTargetNumber";
import {SoilRepository} from "@/repositories/soil.repository";
import {getDeviceFunctionBody, getDeviceFunctionByTarget,} from "@/utils/device/getDeviceFunction";
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
    await SoilRepository.createBySensorId(sensor.id, {
      ...soilResponse,
      duration: functionConfig.duration,
    });
    if (soilResponse.moisture < functionConfig.minMoisture) {
      const functions = await getDeviceFunctionBody(deviceFunction.id);
      await postToDevice(device.ip, { functions });
    }
  }
}
