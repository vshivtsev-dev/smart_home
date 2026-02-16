import type {Prisma} from "@/generated/prisma/client";
import {prisma} from "@/utils/db/prisma/prisma";

export type SeedDevice = Prisma.DeviceCreateInput & {
  sensors?: Array<
    Prisma.SensorCreateInput & {
      config?: Prisma.SensorConfigCreateInput;
    }
  >;
  functions?: Array<
    Prisma.DeviceFunctionCreateInput & {
      config?: Prisma.FunctionConfigCreateInput;
    }
  >;
};

export async function seedDatabase(devices: SeedDevice[]) {
  try {
    for (const deviceData of devices) {
      const { sensors, functions, ...deviceBase } = deviceData;

      const device = await prisma.device.create({
        data: deviceBase,
      });

      console.log(`- Device "${device.name}" created`);

      if (sensors && Array.isArray(sensors)) {
        for (const sensorData of sensors) {
          const { config, ...sensorBase } = sensorData;

          const sensor = await prisma.sensor.create({
            data: {
              ...sensorBase,
              device: { connect: { id: device.id } },
            },
          });

          if (config) {
            const { pins, ...configBase } = config;
            await prisma.sensorConfig.create({
              data: {
                ...configBase,
                sensor: { connect: { id: sensor.id } },
                pins,
              },
            });
          }

          console.log(`  └─ Sensor "${sensor.name}" created`);
        }
      }

      // Создаём функции
      if (functions && Array.isArray(functions)) {
        for (const funcData of functions) {
          const { config, ...funcBase } = funcData;

          const func = await prisma.deviceFunction.create({
            data: {
              ...funcBase,
              device: { connect: { id: device.id } },
            },
          });

          if (config) {
            const { pins, ...funcBase } = config;

            await prisma.functionConfig.create({
              data: {
                ...funcBase,
                function: { connect: { id: func.id } },
                pins,
              },
            });
          }

          console.log(`  └─ Function "${func.name}" created`);
        }
      }
    }

    console.log("Database seeded");
  } catch (error) {
    console.error("Seeding error:", error);
    throw error;
  }
}
