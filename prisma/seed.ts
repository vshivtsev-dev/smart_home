import "dotenv/config";
import {PrismaPg} from "@prisma/adapter-pg";
import {Pool} from "pg";
import {PrismaClient} from "@/generated/prisma/client";
import {DATABASE_URL} from "../prisma.config";

const connectionString = DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  await prisma.device.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "esp32_1",
      ip: "192.168.0.201",
      sensors: {
        create: {
          name: "BME_280",
          type: "CLIMATE",
          target: "living_room_1",
          config: {
            create: {
              pins: {
                create: [
                  {
                    name: "SDA",
                    number: 21,
                  },
                  {
                    name: "SCL",
                    number: 22,
                  },
                ],
              },
            },
          },
        },
      },
    },
  });
  await prisma.device.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "esp32_2",
      ip: "192.168.0.202",
      sensors: {
        create: [
          {
            name: "BME_280",
            type: "CLIMATE",
            target: "plant_1",
            config: {
              create: {
                pins: {
                  create: [
                    {
                      name: "SDA",
                      number: 21,
                    },
                    {
                      name: "SCL",
                      number: 22,
                    },
                  ],
                },
              },
            },
          },
          {
            name: "SOIL",
            type: "SOIL",
            target: "plant_1",
            config: {
              create: {
                dry: 3300,
                wet: 1000,
                pins: {
                  create: {
                    name: "ANALOG",
                    number: 32,
                  },
                },
              },
            },
          },
        ],
      },
      functions: {
        create: {
          name: "pump_1",
          type: "PUMP",
          target: "plant_1",
          config: {
            create: {
              duration: 800,
              minMoisture: 40,
              pins: {
                create: {
                  name: "DIGITAL",
                  number: 18,
                },
              },
            },
          },
        },
      },
    },
  });
}
seed()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
