import { useRef, useEffect } from "react";
import { Chart, ArcElement, Tooltip, DoughnutController } from "chart.js";

Chart.register(DoughnutController, ArcElement, Tooltip);

const EARNINGS    = 24650;
const GOAL        = 30000;
const PERCENTAGE  = Math.min(Math.round((EARNINGS / GOAL) * 100), 100);
const REMAINING   = GOAL - EARNINGS;

export default function EarningsGoalChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Destroy previous instance on re-render
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [EARNINGS, REMAINING],
            backgroundColor: ["#f97316", "#f3f4f6"],
            borderColor:     ["#f97316", "#f3f4f6"],
            borderWidth: 0,
            borderRadius: 6,
            spacing: 2,
          },
        ],
      },
      options: {
        // Half-doughnut (gauge) — only render top 180°
        circumference: 180,
        rotation: -90,
        cutout: "78%",
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const label = ctx.dataIndex === 0 ? "Earned" : "Remaining";
                return ` ${label}: $${ctx.parsed.toLocaleString()}`;
              },
            },
          },
          legend: { display: false },
        },
        animation: {
          animateRotate: true,
          duration: 900,
          easing: "easeOutQuart",
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center"
      style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 320 }}
    >
      {/* Title */}
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest">
          Monthly Goal
        </h2>
        <span className="text-xs font-medium text-gray-400">
          {new Date().toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>
      </div>

      {/* Gauge */}
      <div className="relative w-full" style={{ maxWidth: 240 }}>
        <canvas ref={canvasRef} />

        {/* Center label — sits in the open half of the gauge */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-1">
          <span className="text-3xl font-bold text-gray-900 leading-none">
            {PERCENTAGE}%
          </span>
          <span className="text-xs text-gray-400 mt-1">of goal reached</span>
        </div>
      </div>

      {/* Earnings vs Goal row */}
      <div className="w-full flex justify-between mt-5 px-1">
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" />
            Earned
          </span>
          <span className="text-base font-bold text-gray-900">
            ${EARNINGS.toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col items-end gap-1">
          <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block" />
            Goal
          </span>
          <span className="text-base font-bold text-gray-900">
            ${GOAL.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Remaining pill */}
      <div className="mt-4 w-full bg-orange-50 rounded-xl px-4 py-2.5 flex items-center justify-between">
        <span className="text-xs text-orange-500 font-medium">Remaining</span>
        <span className="text-sm font-bold text-orange-500">
          ${REMAINING.toLocaleString()}
        </span>
      </div>
    </div>
  );
}