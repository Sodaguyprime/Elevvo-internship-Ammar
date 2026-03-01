import { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);

const mockData = {
  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
  values: [1, 2, 2, 3, 4, 4],
};

const totalClients  = mockData.values[mockData.values.length - 1];
const previousMonth = mockData.values[mockData.values.length - 2];
const growth        = totalClients - previousMonth;

export default function Growth() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    if (chartRef.current) chartRef.current.destroy();

    // Orange gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(249, 115, 22, 0.18)");
    gradient.addColorStop(1, "rgba(249, 115, 22, 0)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: mockData.labels,
        datasets: [
          {
            data:            mockData.values,
            fill:            true,
            backgroundColor: gradient,
            borderColor:     "#f97316",
            borderWidth:     2.5,
            pointBackgroundColor: "#f97316",
            pointBorderColor:     "#fff",
            pointBorderWidth:     2,
            pointRadius:          5,
            pointHoverRadius:     7,
            tension:          0.45,
          },
        ],
      },
      options: {
        responsive:          true,
        maintainAspectRatio: true,
        plugins: {
          legend:  { display: false },
          tooltip: {
            backgroundColor: "#111827",
            titleColor:      "#9ca3af",
            bodyColor:       "#f9fafb",
            padding:         10,
            cornerRadius:    10,
            callbacks: {
              title: (items) => items[0].label,
              label: (item)  => ` ${item.parsed.y} client${item.parsed.y !== 1 ? "s" : ""}`,
            },
          },
        },
        scales: {
          x: {
            grid:  { display: false },
            border:{ display: false },
            ticks: {
              color:    "#9ca3af",
              font:     { size: 11, weight: "500" },
              padding:  8,
            },
          },
          y: {
            min:        0,
            max:        6,
            ticks: {
              stepSize:  1,
              color:    "#9ca3af",
              font:     { size: 11 },
              padding:  10,
            },
            grid: {
              color:       "rgba(0,0,0,0.04)",
              drawTicks:   false,
            },
            border: { display: false, dash: [4, 4] },
          },
        },
        animation: {
          duration: 900,
          easing:   "easeOutQuart",
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
            Client Growth
          </h2>
          <p className="text-[11px] text-gray-400">Last 6 months</p>
        </div>

        {/* Summary pill */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-2xl font-bold text-gray-900 leading-none">
            {totalClients}
          </span>
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${
              growth > 0
                ? "bg-green-50 text-green-500"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {growth > 0 ? `+${growth}` : growth} this month
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
        <canvas ref={canvasRef} height={160} />
      </div>

      {/* Footer: month labels context */}
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-orange-400 flex-shrink-0" />
        <span className="text-xs text-gray-400 font-medium">
          Total active clients per month
        </span>
      </div>
    </div>
  );
}