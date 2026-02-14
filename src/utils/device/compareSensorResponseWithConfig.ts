import type {Device, Sensor} from "@/generated/prisma/client";
import {getTargetNumber} from "@/helpers/getTargetNumber";
import {getDeviceFunctionByTarget, getDeviceFunctionForIot,} from "@/utils/device/getDeviceFunction";
import {insertSoil} from "@/utils/device/insertSoil";
import type {SensorResponse, SoilValue} from "@/utils/device/model";
import {postToDevice} from "@/utils/device/postToDevice";

export async function compareSensorResponseWithConfig(
  device: Device,
  sensor: Sensor,
  sensorResponse: SensorResponse,
) {
  const deviceFunction = await getDeviceFunctionByTarget(sensor.target);
  const functionConfig = deviceFunction.config[0];
  const targetNumber = getTargetNumber(sensor.target);

  if (sensor.sensorType === "SOIL") {
    const soilResponse = sensorResponse[targetNumber] as SoilValue;
    if (soilResponse.moisture < functionConfig.minMoisture) {
      const functions = await getDeviceFunctionForIot(deviceFunction.id);
      await postToDevice(device.ip, { functions });
    }
    await insertSoil(sensor.id, {
      ...soilResponse,
      duration: functionConfig.duration,
    });
  }
}
