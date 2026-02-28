"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export default function RoomPage() {
  const { code } = useParams();
  const editorRef = useRef<any>(null);

  const [messages, setMessages] = useState([
    { sender: "AI", text: "AI Assistant is ready." },
  ]);
  const [input, setInput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("Console ready...\n");

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  async function sendMessage() {
    if (!input) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { sender: "You", text: userMessage },
    ]);

    setInput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "AI", text: "AI encountered an error." },
      ]);
    }
  }

  function runCode() {
    const userCode = editorRef.current.getValue();
    let output = "";

    const originalLog = console.log;

    console.log = (...args) => {
      output += args.join(" ") + "\n";
    };

    try {
      new Function(userCode)();
      if (!output) output = "Code executed successfully.";
    } catch (error: any) {
      output = "Error: " + error.message;
    }

    console.log = originalLog;
    setConsoleOutput(output);
  }

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <div className="w-60 bg-[#111827] border-r border-gray-800 p-5 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-6">Room</h2>

          <div className="text-sm text-gray-400 mb-2">Room Code</div>
          <div className="bg-[#1f2937] p-2 rounded text-center font-mono">
            {code}
          </div>
        </div>

        <button className="bg-red-600 hover:bg-red-700 p-2 rounded text-sm">
          Leave Room
        </button>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <div className="h-12 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-6">
          <div className="text-sm text-gray-300">DevRoom / {code}</div>

          <button
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
          >
            Run
          </button>
        </div>

        {/* Editor + Chat */}
        <div className="flex flex-1">

          {/* Code Editor */}
          <div className="w-2/3">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              defaultValue={`function greet() {
  console.log("Hello DevRoom");
}

greet();`}
              theme="vs-dark"
              onMount={handleEditorDidMount}
            />
          </div>

          {/* Chat */}
          <div className="w-1/3 bg-[#0b1220] border-l border-gray-800 flex flex-col">

            <div className="p-4 border-b border-gray-800 text-sm text-gray-400">
              AI Assistant
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded ${
                    msg.sender === "You"
                      ? "bg-blue-600 ml-auto w-fit"
                      : "bg-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-gray-800 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI..."
                className="flex-1 bg-gray-800 p-2 rounded text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 px-4 rounded text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Console */}
        <div className="h-40 bg-black border-t border-gray-800 p-4 text-xs font-mono text-green-400 overflow-y-auto">
          {consoleOutput}
        </div>

      </div>
    </div>
  );
}