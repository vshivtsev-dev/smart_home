import Card from "@/components/card/Card";
import CardList from "@/components/cardList/CardList";
import {Recharts} from "@/components/recharts/Recharts";
import {ClimateRepository} from "@/repositories/climate.repository";
import {SensorRepository} from "@/repositories/sensor.repository";

export default async function () {
  const sensors = await SensorRepository.getSensorsByType("CLIMATE");
  return (
    <div>
      <h1>Climats</h1>
      <CardList>
        {sensors.map(async (sensor) => {
          const climates = await ClimateRepository.getClimateBySensorId(
            sensor.id,
          );
          return (
            <Card key={sensor.id}>
              {sensor.name}:{sensor.target}
              <Recharts
                data={climates.map((climat) => {
                  return {
                    createdAt: climat.createdAt,
                    temperature: climat.temperature,
                    humidity: climat.humidity,
                  };
                })}
                config={{
                  lines: [
                    {
                      key: "temperature",
                      name: "Temperature °C",
                      color: "var(--red)",
                    },
                    {
                      key: "humidity",
                      name: "Humidity %",
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
