import {cacheTag} from "next/cache";
import type {ClimateCreateInput} from "@/generated/prisma/models/Climate";
import {invalidateCacheTag} from "@/helpers/invalidateCacheTag";
import {prisma} from "@/utils/db/prisma/prisma";

export const ClimateRepository = {
  async createBySensorId(
    sensorId: number,
    data: Omit<ClimateCreateInput, "sensor">,
  ) {
    return prisma.climate
      .create({
        data: { sensor: { connect: { id: sensorId } }, ...data },
      })
      .then(() => invalidateCacheTag("climate"));
  },
  async getClimateBySensorId(sensorId: number) {
    "use cache";
    cacheTag("climate");
    return (
      await prisma.climate.findMany({
        where: {
          sensorId: sensorId,
        },
        orderBy: { createdAt: "desc" },
        take: 24,
      })
    ).reverse();
  },
};
