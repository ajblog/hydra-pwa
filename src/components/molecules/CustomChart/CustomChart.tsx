import { useMemo } from "react";
import { Area, AreaChart } from "recharts";
import { tempColorRanges } from "../../../constants";

interface Props {
  chartData: number[];
  startDateTime: string | number | Date;
  hasShortLastDay?: boolean;
  color?: "colorful" | string; // optional color flag
}

export function CustomChart({
  chartData,
  startDateTime,
  hasShortLastDay,
  color = "colorful",
}: Props) {
  const formattedData = useMemo(() => {
    return chartData.map((temp, index) => {
      const start = new Date(startDateTime);
      const t = new Date(start.getTime() + index * 60 * 60 * 1000);
      const time = t.toTimeString().slice(0, 5);

      return {
        time,
        value: temp ?? 0,
      };
    });
  }, [chartData, startDateTime]);

  const chartWidth = hasShortLastDay
    ? (chartData.length + 1) * 43.1
    : chartData.length * 43.1;

  const chartMargin = hasShortLastDay
    ? { top: 0, right: 55, left: 30, bottom: 0 }
    : { top: 0, right: 5, left: 30, bottom: 0 };

  const generateTempGradientStops = () => {
    const total = chartData.length - 1;

    return chartData.map((temp, index) => {
      const colorEntry =
        tempColorRanges.find((range) => temp <= range.max) ??
        tempColorRanges[tempColorRanges.length - 1];

      const color = `rgb(${colorEntry.rgb.join(",")})`;
      const offset = (index / total) * 100;

      return (
        <stop
          key={index}
          offset={`${offset}%`}
          stopColor={color}
          stopOpacity={1}
        />
      );
    });
  };

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{ zIndex: 10, pointerEvents: "none" }}
    >
      <div
        style={{ width: "100%", height: "160px" }}
        className="z-10 absolute bottom-0"
      >
        <AreaChart
          data={formattedData}
          width={chartWidth}
          height={140}
          margin={chartMargin}
        >
          <defs>
            {color === "colorful" ? (
              <linearGradient id="fillTemp" x1="0" y1="0" x2="1" y2="0">
                {generateTempGradientStops()}
              </linearGradient>
            ) : (
              <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                <stop offset="100%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            )}

            {/* Vertical fade effect */}
            <linearGradient id="opacityMask" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <mask id="fadeMask">
              <rect
                x="0"
                y="0"
                width="100%"
                height="75%"
                fill="url(#opacityMask)"
              />
            </mask>
          </defs>

          {/* Fill area */}
          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillTemp)"
            strokeWidth={0}
            fillOpacity={1}
            mask="url(#fadeMask)"
          />

          {/* Add stroke line only if solid color is passed */}
          {color !== "colorful" && (
            <Area
              dataKey="value"
              type="monotone"
              stroke={color}
              strokeWidth={1}
              fill="none"
            />
          )}
        </AreaChart>
      </div>
    </div>
  );
}
