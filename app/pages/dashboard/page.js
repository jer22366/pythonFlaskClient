'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthFetch from "../hooks/useAuthFetch";

import Sidebar from "./components/Sidebar";
import KPISection from "./components/KPISection";
import ChartsSection from "./components/ChartsSection";
import TasksSection from "./components/TasksSection";

export default function Page() {
  const router = useRouter();
  const authFetch = useAuthFetch();
  const [hasToken, setHasToken] = useState(false);

  const [stats, setStats] = useState({});
  const [userGrowthData, setUserGrowthData] = useState({ labels: [], datasets: [{ label: "會員人數", data: [], backgroundColor: "rgba(59,130,246,0.7)" }] });
  const [loginStatsData, setLoginStatsData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF"] }] });
  const [systemHealthData, setSystemHealthData] = useState({ labels: ["09:00","10:00","11:00","12:00","13:00"], datasets: [{ label: "CPU 使用率 (%)", data: [30,45,55,60,50], borderColor: "#36A2EB", fill: false }] });
  const [tasks, setTasks] = useState([
    { id: 1, text: "審核 3 筆請假單", status: "待處理" },
    { id: 2, text: "確認本月薪資報表", status: "進行中" },
    { id: 3, text: "伺服器磁碟快滿", status: "警告" }
  ]);
  const [roleDistribution, setRoleDistribution] = useState({ labels: [], datasets: [{ data: [], backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF"] }] });

  // ✅ 抓 API
  useEffect(() => {
    const fetchAllData = async () => {
      const endpoints = [
        ["/api/user/getStats", setStats],
        ["/api/user/getUserChart", data => setUserGrowthData({ labels: data.labels, datasets: [{ label: "會員人數", data: data.values, backgroundColor: "rgba(59,130,246,0.7)" }] })],
        ["/api/user/getCircleChartStats", data => setLoginStatsData({ labels: data.labels, datasets: [{ data: data.values, backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF"] }] })],
        ["/api/user/getRoleDistribution", data => setRoleDistribution({ labels: data.labels, datasets: [{ data: data.values, backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF"] }] })],
      ];

      await Promise.all(endpoints.map(async ([url, setter]) => {
        const res = await authFetch(url);
        if(res.status === 200) setter(await res.json());
      }));

      setHasToken(true);
    };

    fetchAllData();
  }, [authFetch]);

  // ✅ 模擬自動更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.total_users ? {
        ...prev,
        total_users: prev.total_users + Math.floor(Math.random()*5),
        new_users_today: prev.new_users_today + Math.floor(Math.random()*3),
        revenue: prev.revenue + Math.floor(Math.random()*1000),
        pending_tasks: Math.max(0, prev.pending_tasks + (Math.random()>0.5?1:-1))
      } : prev);

      setSystemHealthData(prev => {
        const newLabels = [...prev.labels, new Date().toLocaleTimeString().slice(0,5)];
        const newData = [...prev.datasets[0].data, Math.floor(Math.random()*100)];
        return { labels: newLabels.slice(-6), datasets: [{ ...prev.datasets[0], data: newData.slice(-6) }] };
      });

      setTasks(prev => {
        let newTasks = [...prev];
        if(Math.random()>0.7) newTasks.push({ id: Date.now(), text: "自動產生的新任務", status: "待處理" });
        else if(newTasks.length && Math.random()>0.5) newTasks = newTasks.slice(1);
        return newTasks;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if(!hasToken) return <div>未登入，請先登入</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <KPISection stats={stats} />
        <ChartsSection
          userGrowthData={userGrowthData}
          loginStatsData={loginStatsData}
          systemHealthData={systemHealthData}
          roleDistribution={roleDistribution}
        />
        <TasksSection tasks={tasks} />
      </main>
    </div>
  );
}
