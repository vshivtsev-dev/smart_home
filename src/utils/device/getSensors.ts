import {getTargetNumber} from "@/helpers/getTargetNumber";
import {prisma} from "@/utils/db/prisma/prisma";

export async function getSensors(deviceId: number) {
  return prisma.sensor.findMany({
    where: {
      devices: {
        some: { id: deviceId },
      },
    },
  });
}

export async function getSensorsArray(deviceId: number) {
  const sensors = await getSensors(deviceId);
  return sensors.map((sensor) => {
    if (sensor.sensorType === "SOIL" && sensor.name === "SOIL") {
      const targetNumber = getTargetNumber(sensor.target);
      return { [sensor.name]: targetNumber };
    }
    return sensor.name;
  });
}
