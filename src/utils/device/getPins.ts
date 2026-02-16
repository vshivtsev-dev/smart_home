import {prisma} from "@/utils/db/prisma/prisma";
import type {PinRecord} from "@/utils/device/model";

export async function getPins(configId: number, type: "SENSOR" | "FUNCTION") {
  const configType =
    type === "SENSOR"
      ? "sensorConfigId"
      : type === "FUNCTION"
        ? "functionConfigId"
        : "";
  const pins = await prisma.devicePin.findMany({
    where: { [configType]: configId },
  });
  return Object.fromEntries(
    pins.map((pin) => [pin.name, pin.number]),
  ) as PinRecord;
}
