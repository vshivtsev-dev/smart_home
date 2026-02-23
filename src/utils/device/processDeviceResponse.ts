import {updateTag} from "next/cache";
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
  for (const sensor of sensors) {
    const currentSensor = deviceResponse.find(
      (responseSensor) => Object.keys(responseSensor)[0] === sensor.name,
    );
    if (!currentSensor) {
      devLog(`no currentSensor ${sensor.name} ${sensor.target}`);
      return;
    }
    switch (sensor.type) {
      case "CLIMATE":
        {
          const sensorResponse = currentSensor[sensor.name] as ClimateResponse;
          await insertClimate(sensor.id, sensorResponse);
          updateTag("climate");
        }
        break;
      case "SOIL": {
        const sensorResponse = currentSensor[sensor.name] as SoilResponse;
        await compareSensorResponseWithConfig(device, sensor, sensorResponse);
        updateTag("climate");
      }
    }
  }
}
