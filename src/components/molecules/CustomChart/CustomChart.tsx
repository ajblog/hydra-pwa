/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../atoms";

type ChartType = "wave" | "wind" | "temperature";

interface Props {
  chartData: any[];
  type: ChartType;
}

export function CustomChart({ chartData, type }: Props) {
  const chartConfig = {
    desktop: {
      label: type, // can change dynamically
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  // Format the data based on the selected type
  const formattedData = chartData.map((item, index) => {
    const time = `${index.toString().padStart(2, "0")}:00`;

    switch (type) {
      case "wave":
        return { time, desktop: item.wave.hs };
      case "wind":
        return { time, desktop: item.wind.wind_speed };
      case "temperature":
        return { time, desktop: item.temperature.temperature };
      default:
        return { time, desktop: 0 };
    }
  });

  // Compute the full chart width based on data length
  const chartWidth = Math.max(330, formattedData.length * 45);

  // Define a fixed width for the YAxis column – it should match your YAxis width prop (45)
  const yAxisWidth = 50;

  return (
    <ChartContainer config={chartConfig}>
      <div className="flex">
        {/* Scrollable Chart Column */}
        <div style={{ overflowX: "auto", width: "100%" }}>
          <div style={{ width: chartWidth }}>
            <BarChart data={formattedData} width={chartWidth} height={200}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="#4b10c9" radius={4} barSize={15} />
            </BarChart>
          </div>
        </div>

        {/* Fixed YAxis Column */}
        <div
          style={{
            width: yAxisWidth,
            position: "relative",
            color: "black",
          }}
        >
          <svg
            width={yAxisWidth}
            height={170}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            {/* Draw a vertical line at the right edge of Y-axis container */}
            <line
              x1={yAxisWidth - 1}
              y1=""
              x2={yAxisWidth - 1}
              y2="220"
              stroke="#777"
              strokeWidth="1"
            />
          </svg>
          <BarChart width={yAxisWidth} height={200} data={formattedData}>
            <YAxis
              // Keep the label on the YAxis (if you want it visible)
              label={{
                value:
                  type === "temperature"
                    ? "°c"
                    : type === "wave"
                      ? "متر"
                      : "m/s",
                angle: -90,
                position: "insideLeft",
              }}
              domain={["dataMin - 1", "dataMax + 1"]}
              dataKey={"desktop"}
              axisLine={true}
              tickLine={true}
              tickMargin={28}
              width={yAxisWidth}
              tickFormatter={(value) => value.toString().slice(0, 4)}
            />
          </BarChart>
        </div>
      </div>
    </ChartContainer>
  );
}
