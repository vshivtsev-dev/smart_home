import type {SensorName} from "@/generated/prisma/enums";

export type DeviceBody = {
  sensors?: (SensorName | { [key in Extract<SensorName, "Soil">]?: number })[];
  functions?: {};
};

export type SensorResponse = Record<string, unknown>;

export type DeviceResponse = {
  sensors: SensorResponse[];
  functions: {}[];
};
export type ClimateResponse = {
  temperature: number;
  humidity: number;
};

export type SoilValue = {
  moisture: number;
  sensorValue: number;
};

export type SoilResponse = Record<string, SoilValue>;
// export type Device = $DevicePayload;
