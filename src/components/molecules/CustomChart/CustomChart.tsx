/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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

  // Limit XAxis to max 5 ticks

  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={formattedData}
        margin={{ left: 0, right: 18 }}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="time"
          allowDataOverflow={false} // default, but good to be explicit
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 5)}
        />

        <YAxis
          label={{
            value:
              type === "temperature" ? "°c" : type === "wave" ? "متر" : "m/s",
            angle: -90,
            position: "insideLeft",
          }}
          domain={["dataMin - 1", "dataMax + 1"]}
          axisLine={false}
          tickLine={false}
          tickMargin={8}
          width={40}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

        <defs>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="desktop"
          type="natural"
          fill="url(#fillDesktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
