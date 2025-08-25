"use client";

import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function ChartsSection({ userGrowthData, loginStatsData, systemHealthData, roleDistribution }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-3">每月用戶成長</h3>
        <Bar data={userGrowthData} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-3">近幾日登入量</h3>
        <Doughnut data={loginStatsData} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-3">系統 CPU 使用率</h3>
        <Line data={systemHealthData} />
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="font-bold mb-3">角色分布</h3>
        <Pie data={roleDistribution} />
      </div>
    </div>
  );
}
