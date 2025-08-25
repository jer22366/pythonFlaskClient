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
  const charts = [
    { title: "每月用戶成長", component: <Bar data={userGrowthData} /> },
    { title: "近幾日登入量", component: <Doughnut data={loginStatsData} /> },
    { title: "系統 CPU 使用率", component: <Line data={systemHealthData} /> },
    { title: "角色分布", component: <Pie data={roleDistribution} /> }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {charts.map((chart, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-4">
          <h3 className="font-bold mb-3">{chart.title}</h3>
          {chart.component}
        </div>
      ))}
    </div>
  );
}
