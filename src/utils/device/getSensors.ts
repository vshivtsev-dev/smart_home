import {getTargetNumber} from "@/helpers/getTargetNumber";
import {prisma} from "@/utils/db/prisma/prisma";
import {getPins} from "@/utils/device/getPins";
import type {SensorsBody} from "@/utils/device/model";

export async function getSensors(deviceId: number) {
  return prisma.sensor.findMany({
    where: {
      device: {
        id: deviceId,
      },
    },
    include: { config: true },
  });
}

export async function getSensorsBody(deviceId: number) {
  const sensors = await getSensors(deviceId);
  const sensorsBody: SensorsBody = [];
  for (const sensor of sensors) {
    if (!sensor.config) continue;
    const pins = await getPins(sensor.config.id, "SENSOR");
    const targetNumber = getTargetNumber(sensor.target);

    switch (sensor.type) {
      case "CLIMATE":
        sensorsBody.push({
          name: sensor.name,
          pins,
        });
        continue;
      case "SOIL":
        if (!sensor.config.dry || !sensor.config.wet) continue;
        sensorsBody.push({
          name: sensor.name,
          id: targetNumber,
          dry: sensor.config.dry,
          wet: sensor.config.wet,
          pins,
        });
    }
  }
  return sensorsBody;
}
