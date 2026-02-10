import Card from "@/components/card/Card";
import {prisma} from "@/utils/db/prisma/prisma";

export const dynamic = "force-dynamic";

export default async function () {
  const sensors = await prisma.sensor.findMany({
    where: { sensorType: "CLIMATE" },
    include: {
      climates: {
        orderBy: { id: "desc" },
        take: 10,
      },
    },
  });
  return (
    <div>
      <h1>climat</h1>
      <ul>
        {sensors.map((sensor) => (
          <li key={sensor.id}>
            <Card>
              {sensor.name}:{sensor.target}
              <ul>
                {sensor.climates.map((climate) => (
                  <li key={climate.id}>
                    {climate.createdAt.toLocaleTimeString([], {
                      timeStyle: "short",
                      hourCycle: "h24",
                    })}
                    : {climate.temperature}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
