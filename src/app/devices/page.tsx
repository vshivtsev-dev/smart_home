import {DeviceRepository} from "@/repositories/device.repository";
import {SensorRepository} from "@/repositories/sensor.repository";

export default async function () {
  const devices = await DeviceRepository.getDevices();
  return (
    <div>
      <button type={"button"}>devices</button>
      <div>
        <h1>Devices</h1>
        <table border={1}>
          <tbody>
            {devices.map(async (device) => {
              const sensors = await SensorRepository.getSensorsByDeviceId(
                device.id,
              );
              return (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.ip}</td>
                  <td>
                    {sensors.map((sensor, index) => (
                      <span key={sensor.id}>
                        {sensor.name}
                        {index !== sensors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
