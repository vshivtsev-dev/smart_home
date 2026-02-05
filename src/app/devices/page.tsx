import {prisma} from "@/utils/db/prisma/prisma";

export default async function Devices() {
  const data = await prisma.device.findMany({
    include: { sensors: true },
  });
  data.sort((a, b) => a.id - b.id);
  return (
    <div>
      <main>
        <button type={"button"}>devices</button>
        <div>
          <h4>Devices</h4>
          <table border={1}>
            <tbody>
              {data.map((device) => (
                <tr key={device.id}>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{device.ip}</td>
                  <td>
                    {device.sensors.map((sensor, index) => (
                      <span key={sensor.id}>
                        {sensor.name}
                        {index !== device.sensors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
