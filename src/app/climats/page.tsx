import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import {Recharts} from "@/components/recharts/Recharts";
import {prisma} from "@/utils/db/prisma/prisma";

export const dynamic = "force-dynamic";

export default async function () {
  const sensors = await prisma.sensor.findMany({
    where: { type: "CLIMATE" },
    include: {
      climates: {
        orderBy: { createdAt: "desc" },
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
            <Recharts
              data={sensor.climates.reverse().map((climat) => {
                return {
                  createdAt: climat.createdAt,
                  temperature: climat.temperature,
                  humidity: climat.humidity,
                };
              })}
            />
          </Card>
        ))}
      </CardList>
    </div>
  );
}
