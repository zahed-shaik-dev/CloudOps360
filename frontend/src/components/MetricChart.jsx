import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "10:00", cpu: 31, memory: 48 },
  { time: "10:05", cpu: 38, memory: 51 },
  { time: "10:10", cpu: 35, memory: 49 },
  { time: "10:15", cpu: 44, memory: 55 },
  { time: "10:20", cpu: 41, memory: 57 },
  { time: "10:25", cpu: 49, memory: 61 },
  { time: "10:30", cpu: 45, memory: 59 },
];

function MetricChart() {
  return (
    <div className="metric-chart">

      {/* CHART LEGEND */}

      <div className="metric-chart-legend">

        <div className="metric-legend-item">
          <span className="metric-legend-dot cpu" />
          CPU
        </div>

        <div className="metric-legend-item">
          <span className="metric-legend-dot memory" />
          Memory
        </div>

      </div>


      {/* CHART */}

      <div className="metric-chart-container">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              stroke="rgba(148,163,184,0.12)"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#52627a",
                fontSize: 9,
              }}
            />

            <YAxis
              domain={[0, 80]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#52627a",
                fontSize: 9,
              }}
              tickFormatter={(value) =>
                `${value}%`
              }
            />

            <Tooltip
              contentStyle={{
                background: "#111722",
                border:
                  "1px solid rgba(148,163,184,0.18)",
                borderRadius: "8px",
                color: "#f4f7fb",
                fontSize: "10px",
              }}
              formatter={(value) =>
                `${value}%`
              }
            />

            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#25d0e8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="memory"
              stroke="#9b7cff"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* FOOTER */}

      <div className="metric-chart-footer">
        DEMO METRICS · Prometheus integration coming later
      </div>

    </div>
  );
}

export default MetricChart;