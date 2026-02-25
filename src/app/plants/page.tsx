import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import {Recharts} from "@/components/recharts/Recharts";
import {SensorRepository} from "@/repositories/sensor.repository";
import {SoilRepository} from "@/repositories/soil.repository";

export default async function () {
  const sensors = await SensorRepository.getSensorsByType("SOIL");
  return (
    <div>
      <h1>Plants</h1>
      <CardList>
        {sensors.map(async (sensor) => {
          const soils = await SoilRepository.getSoilBySensorId(sensor.id);
          return (
            <Card key={sensor.id}>
              {sensor.name}:{sensor.target}
              <Recharts
                data={soils.map((soil) => {
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
          );
        })}
      </CardList>
    </div>
  );
}
