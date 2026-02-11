import {prisma} from "@/utils/db/prisma/prisma";

export default async function () {
  const devices = await prisma.device.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      sensors: true,
    },
  });

  return (
    <div>
      <button type={"button"}>devices</button>
      <div>
        <h1>Devices</h1>
        <table border={1}>
          <tbody>
            {devices.map((device) => (
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
    </div>
  );
}
