import {getTargetNumber} from "@/helpers/getTargetNumber";
import {prisma} from "@/utils/db/prisma/prisma";
import {getPins} from "@/utils/device/getPins";

export async function getDeviceFunction(deviceFunctionId: number) {
  return prisma.deviceFunction.findUnique({
    where: { id: deviceFunctionId },
    include: { config: true },
  });
}

export async function getDeviceFunctionBody(deviceFunctionId: number) {
  const deviceFunction = await getDeviceFunction(deviceFunctionId);
  if (!deviceFunction || !deviceFunction.config) {
    return;
  }

  const functionType = deviceFunction.type;
  const targetNumber = getTargetNumber(deviceFunction.target);
  const pins = await getPins(deviceFunctionId, "FUNCTION");
  return {
    [functionType]: {
      [targetNumber]: {
        pins,
        duration: deviceFunction.config.duration,
      },
    },
  };
}

export async function getDeviceFunctionByTarget(target: string) {
  return prisma.deviceFunction.findFirstOrThrow({
    where: { target },
    include: { config: true },
  });
}
