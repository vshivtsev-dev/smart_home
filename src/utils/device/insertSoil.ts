import type {SoilCreateInput} from "@/generated/prisma/models/Soil";
import {prisma} from "@/utils/db/prisma/prisma";

export async function insertSoil(
  sensorId: number,
  sensorData: Omit<SoilCreateInput, "sensor">,
) {
  return prisma.soil.create({
    data: { sensor: { connect: { id: sensorId } }, ...sensorData },
  });
}
