export type DeviceBody = {
  sensors?: (string | { SOIL: number })[];
  functions?: {};
};

export type SensorData = Record<string, unknown>;

export type DeviceResponse = {
  sensors: SensorData[];
  functions: {}[];
};
export type ClimateResponse = {
  temperature: number;
  humidity: number;
};

export type SoilResponse = Record<
  string,
  {
    moisture: number;
    sensorValue: number;
  }
>;
// export type Device = $DevicePayload;
