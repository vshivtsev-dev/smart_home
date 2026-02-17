"use client";

import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis,} from "recharts";
import type {ChartData} from "recharts/types/state/chartDataSlice";

export function Recharts({ data }: { data: ChartData }) {
  return (
    <LineChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        flexShrink: 0,
        maxHeight: 300,
      }}
      responsive
      data={data}
      className="no-outline" // Применяем класс для отключения выделения
    >
      <CartesianGrid strokeDasharray="1 10" />
      <XAxis
        dataKey="createdAt"
        tickFormatter={(date) =>
          new Date(date).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <YAxis />
      <Legend wrapperStyle={{ bottom: 10, right: 30 }} />
      <Tooltip
        contentStyle={{
          backgroundColor: "var(--primary-bg-color)",
          color: "var(--primary-text-color)",
          border: "none",
          borderRadius: "var(--border-radius)",
          boxShadow: "var(--box-shadow)",
        }}
        labelStyle={{
          paddingBottom: "var(--gap-s)",
          // marginBottom: "var(--gap-s)",
          borderBottom: "1px solid var(--border-color)",
        }}
        labelFormatter={(label) =>
          new Date(label).toLocaleString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
      />
      <Line
        type="monotone"
        dataKey="temperature"
        stroke="var(--red)" // Красный
        name="Температура (°C)"
      />
      <Line
        type="monotone"
        dataKey="humidity"
        stroke="var(--blue)" // Синий
        name="Влажность (%)"
      />
    </LineChart>
  );
}
