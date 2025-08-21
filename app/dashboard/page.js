'use client'

import { Bar, Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Page() {
  const [userGrowthData, setUserGrowthData] = useState({
    labels: [],
    datasets: [{ label: "會員人數", data: [], backgroundColor: "rgba(59,130,246,0.7)" }]
  });

  const [stats] = useState({
    total_users: 1200,
    new_users_today: 15,
    revenue: 48000,
    pending_tasks: 7
  });

  const userSourceData = {
    labels: ["Facebook", "Google", "Other"],
    datasets: [
      { data: [50, 30, 20], backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }
    ]
  };

  useEffect(() => {
    fetch('/api/user/getUserChart')
      .then(res => res.json())
      .then(data => {
        setUserGrowthData({
          labels: data.labels,
          datasets: [{ label: "會員人數",labels:data.leabels, data: data.values, backgroundColor: "rgba(59,130,246,0.7)" }]
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 側邊欄 */}
      <aside className="w-64 bg-white shadow-lg">
        <h4 className="p-4 font-bold text-lg border-b">管理選單</h4>
        <nav className="flex flex-col p-2 space-y-2">
          <a href="/dashboard" className="hover:bg-gray-200 px-3 py-2 rounded">📊 儀表板</a>
          <a href="/users" className="hover:bg-gray-200 px-3 py-2 rounded">👥 使用者管理</a>
          <a href="/reports" className="hover:bg-gray-200 px-3 py-2 rounded">📑 報表分析</a>
          <a href="/settings" className="hover:bg-gray-200 px-3 py-2 rounded">⚙ 設定</a>
          <a href="/otherSystems" className="hover:bg-gray-200 px-3 py-2 rounded">🖥 其他系統</a>
          <a href="/logout" className="text-red-600 hover:bg-red-100 px-3 py-2 rounded">🚪 登出</a>
        </nav>
      </aside>

      {/* 主內容 */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome to the Dashboard</h1>

        {/* KPI 卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-500 text-white rounded-lg p-4 shadow text-center">
            <div className="text-3xl">👥</div>
            <div className="text-lg font-semibold">用戶數量</div>
            <div className="text-2xl">{stats.total_users}</div>
          </div>

          <div className="bg-green-500 text-white rounded-lg p-4 shadow text-center">
            <div className="text-3xl">➕</div>
            <div className="text-lg font-semibold">今日新增</div>
            <div className="text-2xl">{stats.new_users_today}</div>
          </div>

          <div className="bg-yellow-500 text-white rounded-lg p-4 shadow text-center">
            <div className="text-3xl">💰</div>
            <div className="text-lg font-semibold">營收 (NT$)</div>
            <div className="text-2xl">{stats.revenue}</div>
          </div>

          <div className="bg-red-500 text-white rounded-lg p-4 shadow text-center">
            <div className="text-3xl">📝</div>
            <div className="text-lg font-semibold">待辦事項</div>
            <div className="text-2xl">{stats.pending_tasks}</div>
          </div>
        </div>

        {/* 圖表區塊 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-3">每月用戶成長</h3>
            <Bar data={userGrowthData} />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-3">用戶來源比例</h3>
            <Doughnut data={userSourceData} />
          </div>
        </div>
      </main>
    </div>
  );
}
