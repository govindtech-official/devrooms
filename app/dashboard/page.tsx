"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const publicRooms = [
    { id: "java", name: "Java Room", users: 23 },
    { id: "python", name: "Python Room", users: 31 },
    { id: "cpp", name: "C++ Room", users: 15 },
    { id: "web", name: "Web Dev Room", users: 42 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden text-white">

      {/* 🔥 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1220] via-[#111827] to-[#1e293b]" />

      {/* 💜 Glow Orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-sky-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Main Content */}
      <div className="relative z-10 flex">

        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 p-6">

          <h1 className="text-2xl font-bold mb-10 tracking-wide">
            DevRooms
          </h1>

          <div className="space-y-6 text-gray-300">

            <div className="hover:text-white transition cursor-pointer">
              Dashboard
            </div>

            <div className="hover:text-purple-400 transition cursor-pointer">
              Public Rooms
            </div>

            <div className="hover:text-purple-400 transition cursor-pointer">
              Private Rooms
            </div>

            <div className="hover:text-purple-400 transition cursor-pointer">
              AI Analytics
            </div>

            <div className="hover:text-purple-400 transition cursor-pointer">
              Settings
            </div>

          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 px-12 py-10">

          {/* Header */}
          <h2 className="text-4xl font-bold tracking-tight mb-2">
            Welcome back, Govind 👋
          </h2>
          <p className="text-gray-400 mb-10">
            Collaborate. Code. Build. Ship.
          </p>

          {/* Search + Profile */}
          <div className="flex justify-between items-center mb-12">

            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-80 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
              G
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 mb-14">
            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
              <h3 className="text-gray-400 text-sm">Total Rooms</h3>
              <p className="text-2xl font-bold mt-2">12</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
              <h3 className="text-gray-400 text-sm">Active Users</h3>
              <p className="text-2xl font-bold mt-2">284</p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
              <h3 className="text-gray-400 text-sm">AI Requests Today</h3>
              <p className="text-2xl font-bold mt-2">1,245</p>
            </div>
          </div>

          {/* Public Rooms */}
          <h3 className="text-2xl font-semibold mb-8">
            Public Rooms
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {publicRooms
              .filter((room) =>
                room.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((room) => (
                <div
                  key={room.id}
                  onClick={() => router.push(`/room/${room.id}`)}
                  className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition" />

                  <h4 className="text-xl font-semibold mb-2">
                    {room.name}
                  </h4>

                  <p className="text-gray-400 text-sm">
                    {room.users} active developers
                  </p>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-purple-400 text-sm">
                      Join Room →
                    </span>

                    <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
                      Live
                    </span>
                  </div>
                </div>
              ))}

          </div>

        </div>
      </div>
    </div>
  );
}