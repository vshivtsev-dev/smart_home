import {isPrerender} from "@/helpers/isPrerender";
import {pollDevices} from "@/utils/device/pollDevices";

export async function GET(request: Request) {
  if (!isPrerender(request)) {
    await pollDevices();
  }

  return Response.json({ getDevicesData: true });
}
