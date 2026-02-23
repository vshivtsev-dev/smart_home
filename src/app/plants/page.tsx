import {cacheTag} from "next/cache";
import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import {Recharts} from "@/components/recharts/Recharts";
import {prisma} from "@/utils/db/prisma/prisma";

async function getSensorsWithSoils() {
  "use cache";
  cacheTag("soil");
  return prisma.sensor.findMany({
    where: { type: "SOIL" },
    include: {
      soils: {
        orderBy: { createdAt: "desc" },
        take: 24,
      },
    },
  });
}

export default async function () {
  const sensors = await getSensorsWithSoils();
  return (
    <div>
      <h1>Plants</h1>
      <CardList>
        {sensors.map((sensor) => (
          <Card key={sensor.id}>
            {sensor.name}:{sensor.target}
            <Recharts
              data={sensor.soils.reverse().map((soil) => {
                return {
                  createdAt: soil.createdAt,
                  moisture: soil.moisture,
                };
              })}
              config={{
                lines: [
                  {
                    key: "moisture",
                    name: "Moisture %",
                    color: "var(--blue)",
                  },
                ],
              }}
            />
          </Card>
        ))}
      </CardList>
    </div>
  );
}
