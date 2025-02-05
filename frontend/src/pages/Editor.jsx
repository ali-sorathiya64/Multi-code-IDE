import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SunIcon, MoonIcon, DownloadIcon, TrashIcon } from "@heroicons/react/solid";
import Editor2 from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";

const Editor = () => {
  const [code, setCode] = useState(""); // Code being edited
  const { id } = useParams(); // Project ID from URL params
  const [output, setOutput] = useState(""); // Execution output
  const [error, setError] = useState(false); // Error state
  const [data, setData] = useState(null); // Project details
  const [input, setInput] = useState(""); // Input for stdin
  const [showOutput, setShowOutput] = useState(true); // Toggle output visibility
  const [theme, setTheme] = useState("vs-dark"); // Editor theme state
  const [fontSize, setFontSize] = useState(14); // Font size state

  // Fetch project data
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCode(data.project.code); // Populate editor with code
          setData(data.project);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        toast.error("Failed to load project.");
      });
  }, [id]);

  // Save project
  const saveProject = () => {
    const trimmedCode = code?.toString().trim();

    fetch(`${api_base_url}/saveProject`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        projectId: id,
        code: trimmedCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        toast.error("Failed to save the project.");
      });
  };

  // Run project
  const runProject = () => {
    const fileExtension =
      data.projLanguage === "python"
        ? ".py"
        : data.projLanguage === "java"
        ? ".java"
        : data.projLanguage === "javascript"
        ? ".js"
        : data.projLanguage === "c"
        ? ".c"
        : data.projLanguage === "cpp"
        ? ".cpp"
        : "";

    fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: data.projLanguage,
        version: data.version,
        files: [
          {
            filename: data.name + fileExtension,
            content: code,
          },
        ],
        stdin: input, // Provide input
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.run) {
          setOutput(data.run.output); // Show output
          setError(data.run.code !== 0); // Mark as error if code !== 0
        } else {
          setOutput("Error: Invalid API Response");
          setError(true);
        }
      })
      .catch((err) => {
        console.error("Error executing project:", err);
        setOutput("Error: Failed to execute code.");
        setError(true);
      });
  };

  // Export code as a file
  const exportCode = () => {
    const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${data?.name || "code"}.txt`;
    link.click();
  };

  // Clear output
  const clearOutput = () => {
    setOutput("");
    toast.info("Output cleared.");
  };

  // Handle Ctrl+S shortcut
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveProject();
      }
    };

    window.addEventListener("keydown", handleSaveShortcut);
    return () => {
      window.removeEventListener("keydown", handleSaveShortcut);
    };
  }, [code]);

  return (
    <>
      <Navbar />

      <div
        className="flex flex-col md:flex-row items-center justify-between w-full"
        style={{ height: "calc(100vh - 90px)" }}
      >
        {/* Code Editor */}
        <div className="flex-1 w-full h-[50vh] md:h-full bg-gray-800">
          <Editor2
            value={code}
            language={data ? data.projLanguage : "java"}
            theme={theme}
            options={{
              fontSize,
              formatOnType: true,
              formatOnPaste: true,
              automaticLayout: true,
              minimap: {
                enabled: window.innerWidth >= 768, // Disable minimap for mobile devices
              },
            }}
            onChange={(newCode) => setCode(newCode || "")}
            onValidate={(markers) => {
              const hasErrors = markers.some((marker) => marker.severity === 8); // 8 = Error level severity in Monaco
              setError(hasErrors);
            }}
          />
        </div>

        {/* Output and Input */}
        <div
          className={`flex-1 w-full md:w-[50%] h-[50vh] md:h-full bg-[#27272a] ${showOutput ? "" : "hidden md:block"}`}
        >
          <div className="flex items-center justify-between px-[10px] md:px-[30px] pb-3 border-b-[1px] border-b-[#1e1e1f]">
            <div className="flex items-center space-x-2">
              <p className="p-0 m-0 text-sm md:text-base text-white">Output</p>
              <button
                onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
                className="text-white bg-black p-2 rounded-full transition-all hover:bg-gray-800"
                title={`Switch to ${theme === "vs-dark" ? "light" : "dark"} theme`}
              >
                {theme === "vs-dark" ? (
                  <SunIcon className="h-4 w-4" />
                ) : (
                  <MoonIcon className="h-4 w-4" />
                )}
              </button>
              <select
                className="text-black rounded p-1"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              >
                {[12, 14, 16, 18, 20, 24].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="btnNormal !w-fit !px-[8px] !py-[6px] text-sm md:!px-[20px] bg-green-500 transition-all hover:bg-green-600"
                onClick={exportCode}
              >
                <DownloadIcon className="h-4 w-4" />
              </button>
              <button
                className="btnNormal !w-fit !px-[8px] !py-[6px] text-sm md:!px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
                onClick={runProject}
              >
                Run
              </button>
              <button
                className="btnNormal !w-fit !px-[8px] !py-[6px] text-sm md:!px-[20px] bg-red-500 transition-all hover:bg-red-600"
                onClick={clearOutput}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <textarea
            placeholder="Enter input for your program"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full h-[15%] p-2 mb-2 bg-[#1e1e1f] text-white"
            style={{ resize: "none" }}
          ></textarea>
          <pre
            className={`w-full h-[80%] overflow-auto ${error ? "text-red-500" : "text-white"}`}
          >
            {output}
          </pre>
        </div>
      </div>

      {/* Toggle Output Button for Mobile View */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 md:hidden">
        <button
          className="p-2 bg-blue-500 text-white rounded-full shadow-md text-sm"
          onClick={() => setShowOutput(!showOutput)}
        >
          {showOutput ? "Hide Output" : "Show Output"}
        </button>
        <button
          className="p-2 bg-green-500 text-white rounded-full shadow-md text-sm"
          onClick={saveProject}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default Editor;
