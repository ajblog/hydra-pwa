import { Area, AreaChart } from "recharts";
import { TimeUnitEnum } from "../../../types";
import { useStationUnits } from "../../../services";

interface ChartDataItem {
  temperature?: { temperature: number };
}

interface Props {
  chartData: ChartDataItem[];
  startDateTime: string | number | Date;
}

export function CustomChart({ chartData, startDateTime }: Props) {
  const { timeUnit } = useStationUnits("timeUnit");
  const formattedData = chartData.map((item, index) => {
    const start = new Date(startDateTime);
    const t = new Date(start.getTime() + index * 60 * 60 * 1000);
    const time = t.toTimeString().slice(0, 5);

    return {
      time,
      value: item ?? 0,
    };
  });

  const chartWidth = chartData.length * 43.1;
  console.log(timeUnit);
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
            <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B55ED" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#5B55ED" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillTemp)"
            stroke="#5B55ED"
            strokeWidth={0}
            fillOpacity={0.3}
          />
        </AreaChart>
      </div>
    </div>
  );
}
