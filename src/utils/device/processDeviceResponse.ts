import type {Device} from "@/generated/prisma/client";
import {devLog} from "@/helpers/devLog";
import {ClimateRepository} from "@/repositories/climate.repository";
import {SensorRepository} from "@/repositories/sensor.repository";
import {compareSensorResponseWithConfig} from "@/utils/device/compareSensorResponseWithConfig";
import type {ClimateResponse, SensorResponse, SoilResponse,} from "@/utils/device/model";

export async function processDeviceResponse(
  device: Device,
  deviceResponse: SensorResponse[],
) {
  const sensors = await SensorRepository.getSensorsByDeviceId(device.id);
  for (const sensor of sensors) {
    const currentSensor = deviceResponse.find(
      (responseSensor) => sensor.name in responseSensor,
    );
    if (!currentSensor) {
      devLog(`no currentSensor ${sensor.name} ${sensor.target}`);
      continue;
    }
    try {
      switch (sensor.type) {
        case "CLIMATE":
          {
            const sensorResponse = currentSensor[
              sensor.name
            ] as ClimateResponse;
            await ClimateRepository.createBySensorId(sensor.id, sensorResponse);
          }
          break;
        case "SOIL": {
          const sensorResponse = currentSensor[sensor.name] as SoilResponse;
          await compareSensorResponseWithConfig(device, sensor, sensorResponse);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
