'use client'

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <title>Flask App</title>
      <h1>Welcome to My Flask App</h1>
      <p className="text-3xl font-bold underline">This is the home page. You can 
        <a href="/login" className="text-blue-400">login</a> or 
        <a href="/register" className="text-blue-400">register</a>.
      </p>
    </div>
  );
}
