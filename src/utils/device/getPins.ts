import type {DevicePin} from "@/generated/prisma/client";
import {PinsRepository} from "@/repositories/pins.repository";
import type {PinRecord} from "@/utils/device/model";

export async function getPins(configId: number, type: "SENSOR" | "FUNCTION") {
  let pins: DevicePin[];

  switch (type) {
    case "SENSOR":
      pins = await PinsRepository.getPinsBySensorConfigId(configId);
      break;
    case "FUNCTION":
      pins = await PinsRepository.getPinsByFunctionConfigId(configId);
  }

  return Object.fromEntries(
    pins.map((pin) => [pin.name, pin.number]),
  ) as PinRecord;
}
