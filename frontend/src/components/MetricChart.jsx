import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
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
    <div className="metric-card">

      <div className="section-heading compact">

        <div>
          <p className="eyebrow">
            INFRASTRUCTURE
          </p>

          <h3>
            Resource Utilization
          </h3>
        </div>

        <div className="chart-legend">
          <span>
            <i className="legend-cpu" />
            CPU
          </span>

          <span>
            <i className="legend-memory" />
            Memory
          </span>
        </div>

      </div>

      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="cpuGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopOpacity={0.3}
                />

                <stop
                  offset="100%"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="memoryGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopOpacity={0.2}
                />

                <stop
                  offset="100%"
                  stopOpacity={0}
                />
              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#202832"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke="#596473"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#596473"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              unit="%"
            />

            <Tooltip
              contentStyle={{
                background: "#10151c",
                border: "1px solid #2a3440",
                color: "#fff",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="cpu"
              stroke="#38bdf8"
              fill="url(#cpuGradient)"
              strokeWidth={2}
            />

            <Area
              type="monotone"
              dataKey="memory"
              stroke="#a78bfa"
              fill="url(#memoryGradient)"
              strokeWidth={2}
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

      <div className="demo-indicator">
        DEMO METRICS · Prometheus integration coming later
      </div>

    </div>
  );
}

export default MetricChart;