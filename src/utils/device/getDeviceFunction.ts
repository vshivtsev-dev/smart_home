import {getTargetNumber} from "@/helpers/getTargetNumber";
import {FunctionRepository} from "@/repositories/functiom.repository";
import {getPins} from "@/utils/device/getPins";

export async function getDeviceFunctionBody(deviceFunctionId: number) {
  const deviceFunction =
    await FunctionRepository.getFunctionById(deviceFunctionId);
  const deviceFunctionConfig = await FunctionRepository.getFunctionConfigById(
    deviceFunction.id,
  );
  if (!deviceFunction || !deviceFunctionConfig) {
    return;
  }

  const functionType = deviceFunction.type;
  const targetNumber = getTargetNumber(deviceFunction.target);
  const pins = await getPins(deviceFunctionId, "FUNCTION");
  return {
    [functionType]: {
      [targetNumber]: {
        pins,
        duration: deviceFunctionConfig.duration,
      },
    },
  };
}
