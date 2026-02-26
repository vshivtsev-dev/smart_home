import {prisma} from "@/utils/db/prisma/prisma";

export const FunctionRepository = {
  async getFunctionById(id: number) {
    return prisma.deviceFunction.findFirstOrThrow({
      where: { id },
    });
  },
  async getFunctionByTarget(target: string) {
    return prisma.deviceFunction.findFirstOrThrow({
      where: { target },
    });
  },
  async getFunctionConfigById(id: number) {
    return prisma.functionConfig.findFirstOrThrow({
      where: { functionId: id },
    });
  },
};
