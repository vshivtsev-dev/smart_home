import {DeviceRepository} from "@/repositories/device.repository";
import {getSensorsBody} from "@/utils/device/getSensorsBody";
import {postToDevice} from "@/utils/device/postToDevice";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: Context) {
  const { id } = await context.params;
  const device = await DeviceRepository.getDeviceById(Number(id));

  if (!device) {
    return Response.json({
      status: 404,
      statusText: `Device id:${id} not found`,
    });
  }

  const sensors = await getSensorsBody(device.id);
  const deviceResponse = await postToDevice(device.ip, { sensors });
  return Response.json(deviceResponse);
}
