import type {DeviceBody, DeviceResponse} from "@/utils/device/model";

export async function postToDevice(
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
    console.error(error, `Failed to connect to device ${ip}`);
    throw new Error(`Failed to connect to device ${ip}`);
  }
}
