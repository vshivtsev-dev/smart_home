import {cacheTag} from "next/cache";
import {prisma} from "@/utils/db/prisma/prisma";

export const PinsRepository = {
  async getPinsByFunctionConfigId(functionConfigId: number) {
    "use cache";
    cacheTag("functionConfig", "functionPins");
    return prisma.devicePin.findMany({
      where: { functionConfigId },
    });
  },
  async getPinsBySensorConfigId(sensorConfigId: number) {
    "use cache";
    cacheTag("sensorConfig", "sensorPins");
    return prisma.devicePin.findMany({
      where: { sensorConfigId },
    });
  },
};
