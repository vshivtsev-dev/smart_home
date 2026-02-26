import type {Device, Sensor} from "@/generated/prisma/client";
import {getTargetNumber} from "@/helpers/getTargetNumber";
import {FunctionRepository} from "@/repositories/functiom.repository";
import {SoilRepository} from "@/repositories/soil.repository";
import {getDeviceFunctionBody} from "@/utils/device/getDeviceFunction";
import type {SensorResponse, SoilValue} from "@/utils/device/model";
import {postToDevice} from "@/utils/device/postToDevice";

export async function compareSensorResponseWithConfig(
  device: Device,
  sensor: Sensor,
  sensorResponse: SensorResponse,
) {
  const deviceFunction = await FunctionRepository.getFunctionByTarget(
    sensor.target,
  );
  const functionConfig = await FunctionRepository.getFunctionConfigById(
    deviceFunction.id,
  );
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
