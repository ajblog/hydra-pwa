/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../atoms";
import { useEffect, useRef } from "react";

type ChartType = "wave" | "wind" | "temperature";

interface Props {
  chartData: any[];
  type: ChartType;
}

export function CustomChart({ chartData, type }: Props) {
  const chartConfig = {
    desktop: {
      label: type, // can change dynamically
      color: "#4b10c9",
    },
  } satisfies ChartConfig;

  const scrollContainerRef = useRef<HTMLDivElement>(null); // <-- add ref

  useEffect(() => {
    const handleScrollToStart = () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      }
    };

    handleScrollToStart();
  }, [chartData]);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = -1000; // Scroll to the start of the chart
    }
  }, [chartData]);
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

  const min = Math.floor(Math.min(...formattedData.map((d) => d.desktop)) - 1);
  const max = Math.ceil(Math.max(...formattedData.map((d) => d.desktop)) + 1);
  const interval = 1;

  const ticks = Array.from(
    { length: Math.floor((max - min) / interval) + 1 },
    (_, i) => min + i * interval
  );

  return (
    <ChartContainer config={chartConfig}>
      <div className="flex">
        {/* Scrollable Chart Column */}
        <div
          ref={scrollContainerRef}
          style={{ overflowX: "auto", width: "100%" }}
        >
          <div style={{ width: chartWidth }}>
            <AreaChart data={formattedData} width={chartWidth} height={200}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={true}
                tickMargin={10}
                axisLine={true}
                interval={0}
                padding={{ left: 15, right: 15 }}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              {/* ✨ Hidden YAxis just to align the grid lines */}
              <YAxis domain={[min, max]} ticks={ticks} hide={true} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="desktop"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                fillOpacity={1}
              />
            </AreaChart>
          </div>
        </div>

        {/* Sticky YAxis Column */}
        <div
          style={{
            width: yAxisWidth,
            position: "sticky",
            left: 0,
            backgroundColor: "white",
            zIndex: 1,
            color: "black",
          }}
        >
          <AreaChart data={formattedData} width={55} height={170}>
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
              domain={[formattedData[0]?.desktop || min, max]}
              ticks={ticks}
              dataKey={"desktop"}
              axisLine={true}
              tickLine={true}
              tickMargin={28}
              width={yAxisWidth}
              tickFormatter={(value) => value.toString().slice(0, 4)}
            />
          </AreaChart>
        </div>
      </div>
    </ChartContainer>
  );
}
