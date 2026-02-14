import {devLog} from "@/helpers/devLog";
import {prisma} from "@/utils/db/prisma/prisma";
import {getSensorsArray} from "@/utils/device/getSensors";
import {postToDevice} from "@/utils/device/postToDevice";
import {processDeviceResponse} from "@/utils/device/processDeviceResponse";

export async function pollDevices(): Promise<void> {
  devLog("getDevicesData");
  const devices = await prisma.device.findMany();

  await Promise.allSettled(
    devices.map(async (device) => {
      const sensors = await getSensorsArray(device.id);
      if (sensors.length === 0) {
        return;
      }
      const deviceResponse = await postToDevice(device.ip, { sensors });
      await processDeviceResponse(device, deviceResponse.sensors);
    }),
  );
}
