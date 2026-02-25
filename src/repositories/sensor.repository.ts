import {cacheTag} from "next/cache";
import type {SensorType} from "@/generated/prisma/enums";
import {prisma} from "@/utils/db/prisma/prisma";

export const SensorRepository = {
  async getSensorsByType(type: SensorType) {
    "use cache";
    cacheTag("sensors");
    return prisma.sensor.findMany({
      where: { type },
    });
  },
  async getSensorsByDeviceId(deviceId: number) {
    "use cache";
    cacheTag("sensors");
    return prisma.sensor.findMany({
      where: { deviceId },
    });
  },
  async getSensorConfigBySensorId(sensorId: number) {
    "use cache";
    cacheTag("sensors", "sensorConfig");
    return prisma.sensorConfig.findUnique({
      where: { sensorId },
    });
  },
};
