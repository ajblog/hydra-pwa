import { Area, AreaChart } from "recharts";
import { TimeUnitEnum } from "../../../types";
import { useStationUnits } from "../../../services";
import { tempColorRanges } from "../../../constants";
import { useMemo } from "react";

interface Props {
  chartData: number[];
  startDateTime: string | number | Date;
}

export function CustomChart({ chartData, startDateTime }: Props) {
  const { timeUnit } = useStationUnits("timeUnit");
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

  const chartWidth = chartData.length * 43.1;

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
          margin={
            timeUnit === TimeUnitEnum.LOCAL
              ? { top: 0, right: 35, left: 0, bottom: 0 }
              : { top: 0, right: 5, left: 30, bottom: 0 }
          }
        >
          <defs>
            <linearGradient id="fillTemp" x1="0" y1="0" x2="1" y2="0">
              {generateTempGradientStops()}
            </linearGradient>

            {/* Vertical opacity mask */}
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

          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillTemp)"
            strokeWidth={0}
            fillOpacity={1}
            mask="url(#fadeMask)"
          />
        </AreaChart>
      </div>
    </div>
  );
}
