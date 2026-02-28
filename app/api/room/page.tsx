"use client";

import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export default function RoomPage() {
  const { code } = useParams();
  const editorRef = useRef<any>(null);

  const [chatOpen, setChatOpen] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState("Console ready...\n");

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
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

      {/* LEFT PANEL */}
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

      {/* CENTER */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="h-12 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-6">
          <div className="text-sm text-gray-300">DevRoom / {code}</div>

          <button
            onClick={runCode}
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
          >
            Run
          </button>
        </div>

        {/* EDITOR */}
        <div className="flex-1">
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

        {/* CONSOLE */}
        <div className="h-40 bg-black border-t border-gray-800 p-4 text-xs font-mono text-green-400 overflow-y-auto">
          {consoleOutput}
        </div>

      </div>
    </div>
  );
}