import type {Device} from "@/generated/prisma/client";
import {devLog} from "@/helpers/devLog";
import {compareSensorResponseWithConfig} from "@/utils/device/compareSensorResponseWithConfig";
import {getSensors} from "@/utils/device/getSensors";
import {insertClimate} from "@/utils/device/insertClimate";
import type {ClimateResponse, SensorResponse, SoilResponse,} from "@/utils/device/model";

export async function processDeviceResponse(
  device: Device,
  deviceResponse: SensorResponse[],
) {
  const sensors = await getSensors(device.id);
  await Promise.all(
    sensors.map(async (sensor) => {
      const currentSensor = deviceResponse.find(
        (responseSensor) => Object.keys(responseSensor)[0] === sensor.name,
      );
      if (!currentSensor) {
        devLog("no currentSensor");
        return;
      }

      if (sensor.sensorType === "CLIMATE") {
        const sensorResponse = currentSensor[sensor.name] as ClimateResponse;
        await insertClimate(sensor.id, sensorResponse);
      }

      if (sensor.sensorType === "SOIL") {
        const sensorResponse = currentSensor[sensor.name] as SoilResponse;
        await compareSensorResponseWithConfig(device, sensor, sensorResponse);
      }
    }),
  );
}
