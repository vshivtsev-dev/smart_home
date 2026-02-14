import {prisma} from "@/utils/db/prisma/prisma";
import {getSensorsArray} from "@/utils/device/getSensors";
import {postToDevice} from "@/utils/device/postToDevice";

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: Context) {
  const { id } = await context.params;
  const device = await prisma.device.findUnique({ where: { id: Number(id) } });

  if (!device) {
    return Response.json({
      status: 404,
      statusText: `Device id:${id} not found`,
    });
  }

  // const functions = await getDeviceFunctionForIot(1);
  // const deviceResponse = await postToDevice(device.ip, { functions });
  const sensors = await getSensorsArray(device.id);
  const deviceResponse = await postToDevice(device.ip, { sensors });
  return Response.json(deviceResponse);
}
