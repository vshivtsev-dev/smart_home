import {getDevicesData} from "@/app/api/device/service";

export async function GET() {
  await getDevicesData();
  return Response.json({ getDevicesData: true });
}
