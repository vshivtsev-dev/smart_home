import {auth} from "@/utils/auth/auth";
import {prisma} from "@/utils/db/prisma/prisma";

async function esp32_1() {
  const esp32_1 = await prisma.device.create({
    data: {
      id: 1,
      name: "esp32_1",
      ip: "192.168.0.201",
    },
  });
  const bme280 = await prisma.sensor.create({
    data: {
      id: 1,
      name: "BME_280",
      sensorType: "CLIMATE",
      target: "living_room_1",
    },
  });
  await prisma.device.update({
    where: { id: esp32_1.id },
    data: {
      sensors: {
        connect: [{ id: bme280.id }],
      },
    },
  });
  console.log(esp32_1.name, bme280.name);
}

esp32_1();

async function esp32_2() {
  const esp32_2 = await prisma.device.create({
    data: {
      id: 2,
      name: "esp32_2",
      ip: "192.168.0.202",
    },
  });
  const bme280 = await prisma.sensor.create({
    data: {
      id: 2,
      name: "BME_280",
      sensorType: "CLIMATE",
      target: "bedroom_1",
    },
  });
  await prisma.device.update({
    where: { id: esp32_2.id },
    data: {
      sensors: {
        connect: [{ id: bme280.id }],
      },
    },
  });
  console.log(esp32_2.name, bme280.name);
}

esp32_2();

async function uno_r4_wifi_1() {
  const uno_r4_wifi_1 = await prisma.device.create({
    data: {
      id: 3,
      name: "uno_r4_wifi_1",
      ip: "192.168.0.203",
    },
  });
  const dht11Sensor = await prisma.sensor.create({
    data: {
      id: 3,
      name: "DHT_11",
      sensorType: "CLIMATE",
      target: "plant_1",
    },
  });
  const soilSensor = await prisma.sensor.create({
    data: {
      id: 4,
      name: "SOIL",
      sensorType: "SOIL",
      target: "plant_1",
    },
  });
  const pumpConfig = await prisma.functionConfig.create({
    data: {
      duration: 100,
      minMoisture: 20,
    },
  });
  const pumpFunction = await prisma.deviceFunction.create({
    data: {
      id: 1,
      name: "pump_1",
      functionType: "PUMP",
      target: "plant_1",
      config: { connect: [{ id: pumpConfig.id }] },
    },
  });

  await prisma.device.update({
    where: { id: uno_r4_wifi_1.id },
    data: {
      sensors: {
        connect: [{ id: soilSensor.id }, { id: dht11Sensor.id }],
      },
      deviceFunctions: {
        connect: [{ id: pumpFunction.id }],
      },
    },
  });
  console.log(uno_r4_wifi_1.name);
}

uno_r4_wifi_1();

async function testUser() {
  const newUser = await auth.api.signUpEmail({
    body: {
      email: "test@email.com",
      password: "12345678",
      name: "testName",
    },
  });
  console.log(newUser.user.email);
}

testUser();
