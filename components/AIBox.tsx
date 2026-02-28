"use client";
import { useState } from "react";

export default function AIBox() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");

  const handleAI = async (action: string) => {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: code, action }),
    });

    const data = await res.json();
    setResponse(data.result);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl text-white">
      <textarea
        className="w-full p-3 bg-black border border-gray-700 rounded"
        rows={8}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <div className="flex gap-3 mt-4 flex-wrap">
        <button onClick={() => handleAI("explain")} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
          Explain
        </button>
        <button onClick={() => handleAI("debug")} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
          Debug
        </button>
        <button onClick={() => handleAI("optimize")} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
          Optimize
        </button>
        <button onClick={() => handleAI("comment")} className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500">
          Add Comments
        </button>
      </div>

      <div className="mt-6 p-4 bg-black border border-gray-700 rounded whitespace-pre-wrap">
        {response}
      </div>
    </div>
  );
}