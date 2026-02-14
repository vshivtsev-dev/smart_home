import {getTargetNumber} from "@/helpers/getTargetNumber";
import {prisma} from "@/utils/db/prisma/prisma";

export async function getDeviceFunction(deviceFunctionId: number) {
  const deviceFunction = await prisma.deviceFunction.findUnique({
    where: { id: deviceFunctionId },
    include: { config: true },
  });
  if (!deviceFunction) {
    return;
  }
  return deviceFunction;
}

export async function getDeviceFunctionForIot(deviceFunctionId: number) {
  const deviceFunction = await getDeviceFunction(deviceFunctionId);
  if (!deviceFunction) {
    return;
  }
  const functionName = deviceFunction.functionType.toLowerCase();
  const targetNumber = getTargetNumber(deviceFunction.target);
  return {
    [functionName]: {
      [targetNumber]: {
        duration: deviceFunction.config[0].duration,
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
