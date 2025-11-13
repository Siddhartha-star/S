"use client";

import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";

import "@/lib/charts";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const chartData = {
  labels,
  datasets: [
    {
      label: "Tasks completed",
      data: [6, 9, 7, 11, 8, 13, 16],
      tension: 0.5,
      fill: true,
      borderWidth: 3,
      borderColor: "rgba(0, 145, 255, 0.85)",
      backgroundColor: "rgba(0, 145, 255, 0.15)",
      pointRadius: 0
    },
    {
      label: "AI suggestions applied",
      data: [2, 4, 3, 5, 6, 7, 9],
      tension: 0.5,
      fill: false,
      borderWidth: 3,
      borderDash: [8, 6],
      borderColor: "rgba(255, 0, 183, 0.75)",
      pointRadius: 0
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: "rgba(255,255,255,0.75)",
        font: {
          family: "Inter, sans-serif",
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: "rgba(8, 11, 24, 0.9)",
      titleColor: "#fff",
      bodyColor: "rgba(255,255,255,0.85)",
      padding: 12,
      borderColor: "rgba(255,255,255,0.12)",
      borderWidth: 1,
      displayColors: false
    }
  },
  scales: {
    x: {
      ticks: {
        color: "rgba(255,255,255,0.6)"
      },
      grid: {
        color: "rgba(255,255,255,0.06)"
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "rgba(255,255,255,0.6)"
      },
      grid: {
        color: "rgba(255,255,255,0.06)"
      }
    }
  }
};

export const PerformanceChart = () => (
  <motion.div
    className="glass-panel h-[320px] rounded-3xl border border-white/10 p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
  >
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">Productivity Pulse</h3>
        <p className="text-sm text-white/60">Weekly momentum across key engagement signals.</p>
      </div>
    </div>
    <div className="h-[240px]">
      <Line data={chartData} options={chartOptions} />
    </div>
  </motion.div>
);




