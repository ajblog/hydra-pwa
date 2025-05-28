import { Area, AreaChart, Tooltip } from "recharts";

interface ChartDataItem {
  temperature?: { temperature: number };
}

interface Props {
  chartData: ChartDataItem[];
  startDateTime: string | number | Date;
}

export function CustomChart({ chartData, startDateTime }: Props) {
  console.log("CustomChart data:", chartData);
  const formattedData = chartData.map((item, index) => {
    const start = new Date(startDateTime);
    const t = new Date(start.getTime() + index * 60 * 60 * 1000);
    const time = t.toTimeString().slice(0, 5);

    return {
      time,
      value: item ?? 0,
    };
  });

  const chartWidth = chartData.length * 38;

  return (
    <div className="w-full h-full overflow-hidden">
      <div style={{ width: "100%", height: "100%" }}>
        <AreaChart data={formattedData} width={chartWidth} height={150}>
          <defs>
            <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-temperature)"
                stopOpacity={0.5}
              />
              <stop
                offset="100%"
                stopColor="var(--color-temperature)"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            type="monotone"
            fill="url(#fillTemp)"
            stroke="var(--color-temperature)"
            width={35}
            strokeWidth={2}
          />

          {/* REMOVE axes */}
          {/* <XAxis dataKey="time" /> */}
          {/* <YAxis /> */}

          {/* You can still show tooltip if needed */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            labelFormatter={(label) => `Time: ${label}`}
            formatter={(value) => [`${value}°C`, "Temp"]}
          />
        </AreaChart>
      </div>
    </div>
  );
}
