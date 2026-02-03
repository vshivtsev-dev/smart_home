import type {ClimateCreateInput} from "generated/prisma/models/Climate";
import {prisma} from "utils/db/prisma/prisma";

export async function insertClimate(data: ClimateCreateInput) {
  return prisma.climate.create({ data });
}
