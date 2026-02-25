import {cacheTag} from "next/cache";
import type {SoilCreateInput} from "@/generated/prisma/models/Soil";
import {invalidateCacheTag} from "@/helpers/invalidateCacheTag";
import {prisma} from "@/utils/db/prisma/prisma";

export const SoilRepository = {
  async createBySensorId(
    sensorId: number,
    data: Omit<SoilCreateInput, "sensor">,
  ) {
    return prisma.soil
      .create({
        data: { sensor: { connect: { id: sensorId } }, ...data },
      })
      .then(() => invalidateCacheTag("soil"));
  },
  async getSoilBySensorId(sensorId: number) {
    "use cache";
    cacheTag("soil");
    return (
      await prisma.soil.findMany({
        where: {
          sensorId: sensorId,
        },
        orderBy: { createdAt: "desc" },
        take: 24,
      })
    ).reverse();
  },
};
