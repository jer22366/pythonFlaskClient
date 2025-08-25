"use client";

import { useRouter } from "next/navigation";

export default function useAuthFetch() {
  const router = useRouter();

  // 取得 token
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 帶 token 的 fetch
  const authFetch = async (url, options = {}) => {
    const headers = options.headers || {};

    // ✅ 沒有 token 的情況，回傳一個假的 Response
    if (!token) {
      router.push("/pages/login");
      alert("未登入，導向登入頁");
      return new Response(
        JSON.stringify({ status: "error", message: "No token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        // token 過期或無效
        router.push("/pages/login");
        alert("Token 無效，導向登入頁");

        // ✅ 一樣回傳假的 Response，不丟錯誤
        return new Response(
          JSON.stringify({ status: "error", message: "Unauthorized" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }

      return res;
    } catch (err) {
      console.error("authFetch error:", err);

      // ✅ 發生網路錯誤時，回傳假的 Response
      return new Response(
        JSON.stringify({ status: "error", message: "Network error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  };

  return authFetch;
}
