import type {ClimateCreateInput} from "@/generated/prisma/models/Climate";
import {prisma} from "@/utils/db/prisma/prisma";

export async function insertClimate(
  sensorId: number,
  sensorData: Omit<ClimateCreateInput, "sensor">,
) {
  return prisma.climate.create({
    data: { sensor: { connect: { id: sensorId } }, ...sensorData },
  });
}
