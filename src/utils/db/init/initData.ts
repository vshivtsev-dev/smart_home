import type {SeedDevice} from "@/utils/db/init/seedDatabase";

export const initData: Array<SeedDevice> = [
  {
    name: "esp32_1",
    ip: "192.168.0.201",
    sensors: [
      {
        name: "BME_280",
        type: "CLIMATE",
        target: "living_room_1",
        device: undefined as any,
        config: {
          sensor: undefined as any,
          pins: {
            create: [
              { name: "SDA", number: 21 },
              { name: "SCL", number: 22 },
            ],
          },
        },
      },
    ],
  },
  {
    name: "esp32_2",
    ip: "192.168.0.202",
    sensors: [
      {
        name: "BME_280",
        type: "CLIMATE",
        target: "bedroom_1",
        device: undefined as any,
        config: {
          sensor: undefined as any,
          pins: {
            create: [
              { name: "SDA", number: 21 },
              { name: "SCL", number: 22 },
            ],
          },
        },
      },
    ],
  },
  {
    name: "uno_r4_wifi_1",
    ip: "192.168.0.203",
    sensors: [
      {
        name: "DHT_11",
        type: "CLIMATE",
        target: "plant_1",
        device: undefined as any,
        config: {
          sensor: undefined as any,
          pins: {
            create: [{ name: "DIGITAL", number: 4 }],
          },
        },
      },
      {
        name: "SOIL",
        type: "SOIL",
        target: "plant_1",
        device: undefined as any,
        config: {
          dry: 610,
          wet: 220,
          sensor: undefined as any,
          pins: {
            create: [{ name: "ANALOG", number: 0 }],
          },
        },
      },
    ],
    functions: [
      {
        name: "pump_1",
        type: "PUMP",
        target: "plant_1",
        device: undefined as any,
        config: {
          duration: 400,
          minMoisture: 20,
          function: undefined as any,
          pins: {
            create: [{ name: "DIGITAL", number: 2 }],
          },
        },
      },
    ],
  },
];
