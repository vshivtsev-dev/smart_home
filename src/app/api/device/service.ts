import type {PrismaPg} from "@prisma/adapter-pg";
import type {DefaultArgs, GetFindResult, PrismaClientOptions,} from "@prisma/client/runtime/client";
import {insertClimate} from "@/app/api/device/index";
import type {ClimateResponse, DeviceBody, DeviceResponse, SensorData, SoilResponse,} from "@/app/api/device/model";
import type {$DevicePayload} from "@/generated/prisma/models/Device";
import {prisma} from "@/utils/db/prisma/prisma";

async function postToDevice(
  ip: string,
  body: DeviceBody,
): Promise<DeviceResponse> {
  try {
    return await fetch(`http://${ip}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "close",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  } catch (error) {
    console.error(`Failed to connect to device ${ip}`);
    throw new Error(`Failed to connect to device ${ip}`);
  }
}

async function processSensorData(
  //todo find correct type
  device: GetFindResult<
    $DevicePayload<DefaultArgs>,
    { include: { sensors: boolean; deviceFunctions: boolean } },
    {
      omit: { adapter: PrismaPg } extends { omit: infer U }
        ? U
        : PrismaClientOptions["omit"];
    }
  >,
  targetNumber: number,
  responseSensors: SensorData[],
): Promise<void> {
  await Promise.all(
    device.sensors.map(async (deviceSensor) => {
      const matchingSensor = responseSensors.find(
        (responseSensor) =>
          Object.keys(responseSensor)[0] === deviceSensor.name,
      );

      if (!matchingSensor) {
        return;
      }

      if (deviceSensor.sensorType === "CLIMATE") {
        const sensorData = matchingSensor[deviceSensor.name] as ClimateResponse;
        await insertClimate({
          sensor: { connect: { id: deviceSensor.id } },
          ...sensorData,
        });
      }

      if (deviceSensor.sensorType === "SOIL") {
        const data = matchingSensor[deviceSensor.name] as SoilResponse;
        const sensorData = data[targetNumber];
        let duration = 0;

        device.deviceFunctions.map(async (deviceFunction) => {
          const functionConfig = await prisma.functionConfig.findUnique({
            where: { id: deviceFunction.id },
          });
          if (
            functionConfig &&
            functionConfig.minMoisture &&
            functionConfig.duration &&
            sensorData.moisture < functionConfig.minMoisture
          ) {
            duration = functionConfig.duration;
            await postToDevice(device.ip, {
              functions: {
                pump: {
                  [targetNumber]: {
                    duration: functionConfig.duration,
                  },
                },
              },
            });
          }
        });

        await prisma.soil.create({
          data: {
            sensor: { connect: { id: deviceSensor.id } },
            ...sensorData,
            duration,
          },
        });
      }
    }),
  );
}

export async function getDevicesData(): Promise<void> {
  process.env.NODE_ENV === "development" ? console.log("getDevicesData") : null;
  const devices = await prisma.device.findMany({
    include: {
      sensors: true,
      deviceFunctions: true,
    },
  });

  await Promise.allSettled(
    devices.map(async (device) => {
      let targetNumber: number = 1;
      const sensors = device.sensors.map((sensor) => {
        targetNumber = Number(sensor.target.split("_").pop());
        if (sensor.name === "SOIL") {
          return { [sensor.name]: targetNumber };
        } else {
          return sensor.name;
        }
      });
      if (sensors.length === 0) {
        return;
      }

      const body: DeviceBody = {
        sensors,
      };

      const response = await postToDevice(device.ip, body);
      await processSensorData(device, targetNumber, response.sensors);
    }),
  );
}
