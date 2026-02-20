"use client";

import {CartesianGrid, Legend, Line, LineChart, type LineProps, Tooltip, XAxis, YAxis,} from "recharts";
import type {ChartData} from "recharts/types/state/chartDataSlice";
import styles from "./recharts.module.scss";

export function Recharts({
  data,
  config,
}: {
  data: ChartData;
  config: {
    lines: LineProps[];
  };
}) {
  return (
    <LineChart
      style={{
        width: "100%",
        aspectRatio: 1.618,
        flexShrink: 0,
        maxHeight: "70vh",
      }}
      responsive
      data={data}
      className={styles.recharts}
    >
      <CartesianGrid strokeOpacity={0.1} />
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
      <Legend />
      <Tooltip
        contentStyle={{
          backgroundColor: "var(--primary-bg-color)",
          color: "var(--primary-text-color)",
          borderColor: "var(--border-color)",
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
      {config.lines.map((line) => (
        <Line
          key={line.key}
          type="monotone"
          dataKey={line.key as string}
          stroke={line.color}
          name={line.name}
        />
      ))}
    </LineChart>
  );
}
