import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

export default function useAuthFetch() {
  const router = useRouter();
  const redirected = useRef(false); // 🚨 只允許一次重導

  const authFetch = useCallback(async (url, options = {}) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      if (!redirected.current) {
        redirected.current = true;
        alert("未登入，導向登入頁");
        router.push("/pages/login");
      }
      return new Response(JSON.stringify({ status: "error", message: "No token" }), { status: 401 });
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        if (!redirected.current) {
          redirected.current = true;
          alert("Token 無效，導向登入頁");
          router.push("/pages/login");
        }
        return new Response(JSON.stringify({ status: "error", message: "Unauthorized" }), { status: 401 });
      }

      return res;
    } catch (err) {
      console.error("authFetch error:", err);
      return new Response(JSON.stringify({ status: "error", message: "Network error" }), { status: 500 });
    }
  }, [router]);

  return authFetch;
}
