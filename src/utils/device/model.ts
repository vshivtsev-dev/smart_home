import type {PinName, SensorName} from "@/generated/prisma/enums";

export type PinRecord = Record<PinName, number>;
export type SensorsBody = {
  name: SensorName;
  id?: number;
  dry?: number;
  wet?: number;
  pins: PinRecord;
}[];

//todo functions?: {};
export type DeviceBody = {
  sensors?: SensorsBody;
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
