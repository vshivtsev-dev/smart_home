import {getTargetNumber} from "@/helpers/getTargetNumber";
import {SensorRepository} from "@/repositories/sensor.repository";
import {getPins} from "@/utils/device/getPins";
import type {SensorsBody} from "@/utils/device/model";

export async function getSensorsBody(deviceId: number) {
  const sensors = await SensorRepository.getSensorsByDeviceId(deviceId);
  const sensorsBody: SensorsBody = [];
  for (const sensor of sensors) {
    const sensorConfig = await SensorRepository.getSensorConfigBySensorId(
      sensor.id,
    );
    if (!sensorConfig) continue;
    const pins = await getPins(sensorConfig.id, "SENSOR");
    const targetNumber = getTargetNumber(sensor.target);

    switch (sensor.type) {
      case "CLIMATE":
        sensorsBody.push({
          name: sensor.name,
          pins,
        });
        continue;
      case "SOIL":
        if (!sensorConfig.dry || !sensorConfig.wet) continue;
        sensorsBody.push({
          name: sensor.name,
          id: targetNumber,
          dry: sensorConfig.dry,
          wet: sensorConfig.wet,
          pins,
        });
    }
  }
  return sensorsBody;
}
