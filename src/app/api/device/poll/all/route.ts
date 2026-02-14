import {pollDevices} from "@/utils/device/pollDevices";

export async function GET() {
  await pollDevices();
  return Response.json({ getDevicesData: true });
}
