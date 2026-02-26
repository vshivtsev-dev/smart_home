import {cacheTag} from "next/cache";
import {prisma} from "@/utils/db/prisma/prisma";

export const DeviceRepository = {
  async getDevices() {
    "use cache";
    cacheTag("devices");
    return prisma.device.findMany();
  },
  async getDeviceById(id: number) {
    "use cache";
    cacheTag(`deviceById-${id}`);
    return prisma.device.findFirstOrThrow({ where: { id } });
  },
};
