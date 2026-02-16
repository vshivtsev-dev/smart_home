import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import {prisma} from "@/utils/db/prisma/prisma";

export const dynamic = "force-dynamic";

export default async function () {
  const plants = await prisma.sensor.findMany({
    where: { type: "SOIL" },
    include: {
      soils: {
        orderBy: { id: "desc" },
        take: 24,
      },
    },
  });
  return (
    <div>
      <h1>Plants</h1>
      <CardList>
        {plants.map((sensor) => (
          <Card key={sensor.id}>
            {sensor.name}:{sensor.target}
            <ul style={{ listStyle: "none" }}>
              {sensor.soils.map((soil) => (
                <li key={soil.id}>
                  {soil.createdAt.toLocaleTimeString([], {
                    timeStyle: "short",
                    hourCycle: "h24",
                  })}
                  : {soil.moisture}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </CardList>
    </div>
  );
}
