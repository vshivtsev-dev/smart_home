import {prisma} from "@/utils/db/prisma/prisma";

export const DeviceRepository = {
  async getDevices() {
    return prisma.device.findMany();
  },
  async getDeviceById(id: number) {
    return prisma.device.findFirstOrThrow({ where: { id } });
  },
};
