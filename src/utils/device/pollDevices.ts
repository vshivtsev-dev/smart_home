import {devLog} from "@/helpers/devLog";
import {DeviceRepository} from "@/repositories/device.repository";
import {getSensorsBody} from "@/utils/device/getSensorsBody";
import {postToDevice} from "@/utils/device/postToDevice";
import {processDeviceResponse} from "@/utils/device/processDeviceResponse";

export async function pollDevices(): Promise<void> {
  devLog("getDevicesData");
  const devices = await DeviceRepository.getDevices();

  await Promise.allSettled(
    devices.map(async (device) => {
      const sensors = await getSensorsBody(device.id);
      if (sensors.length === 0) {
        return;
      }
      const deviceResponse = await postToDevice(device.ip, { sensors });
      await processDeviceResponse(device, deviceResponse.sensors);
    }),
  );
}
