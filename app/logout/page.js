'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation"
export default function Page() {
    const router = useRouter()
    useEffect(() => {
        const handleLogout = async () => {
            await fetch('/logout'); // 仍然可以呼叫後端登出 API
            router.push('/login');  // 前端手動導向登入頁
        }
        handleLogout()
    }, [router])

    return null
}