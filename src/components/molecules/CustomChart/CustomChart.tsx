import { Area, AreaChart, Tooltip } from "recharts";

interface ChartDataItem {
  temperature?: { temperature: number };
}

interface Props {
  chartData: ChartDataItem[];
  startDateTime: string | number | Date;
}

export function CustomChart({ chartData, startDateTime }: Props) {
  const formattedData = chartData.map((item, index) => {
    const start = new Date(startDateTime);
    const t = new Date(start.getTime() + index * 60 * 60 * 1000);
    const time = t.toTimeString().slice(0, 5);

    return {
      time,
      value: item ?? 0,
    };
  });

  const chartWidth = chartData.length * 40;

  return (
    <div className="w-full h-full overflow-hidden">
      <div style={{ width: "100%", height: "148px" }}>
        <AreaChart
          data={formattedData}
          width={chartWidth}
          height={140}
          margin={{ top: 0, right: 10, left: 30, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B55ED" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#5B55ED" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillTemp)"
            stroke="#5B55ED"
            strokeWidth={2}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            label={null}
            labelFormatter={() => ""}
            formatter={(value) => [`${value}°C`, "دما"]}
          />
        </AreaChart>
      </div>
    </div>
  );
}
