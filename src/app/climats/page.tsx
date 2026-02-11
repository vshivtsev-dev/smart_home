import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import {prisma} from "@/utils/db/prisma/prisma";

export const dynamic = "force-dynamic";

export default async function () {
  const sensors = await prisma.sensor.findMany({
    where: { sensorType: "CLIMATE" },
    include: {
      climates: {
        orderBy: { id: "desc" },
        take: 24,
      },
    },
  });
  return (
    <div>
      <h1>Climats</h1>
      <CardList>
        {sensors.map((sensor) => (
          <Card key={sensor.id}>
            {sensor.name}:{sensor.target}
            <div style={{ display: "flex", gap: "var(--gap-l)" }}>
              <ul style={{ listStyle: "none" }}>
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
              <ul style={{ listStyle: "none" }}>
                {sensor.climates.map((climate) => (
                  <li key={climate.id}>
                    {climate.createdAt.toLocaleTimeString([], {
                      timeStyle: "short",
                      hourCycle: "h24",
                    })}
                    : {climate.humidity}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </CardList>
    </div>
  );
}
