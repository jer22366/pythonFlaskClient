'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter();

    useEffect(() => {
        const handleLogout = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                await fetch('/api/user/logout', {
                    method: "POST",  // 或你的後端 logout method
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
            }

            localStorage.removeItem("token");
            router.push('/pages/login');  // 前端手動導向登入頁
        }

        handleLogout();
    }, [router]);

    return null;
}
