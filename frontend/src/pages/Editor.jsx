import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Editor2 from '@monaco-editor/react';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../helper';
import { toast } from 'react-toastify';

const Editor = () => {
  const [code, setCode] = useState(""); // Code being edited
  const { id } = useParams(); // Project ID from URL params
  const [output, setOutput] = useState(""); // Execution output
  const [error, setError] = useState(false); // Error state
  const [data, setData] = useState(null); // Project details
  const [input, setInput] = useState(""); // Input for stdin
  const [showOutput, setShowOutput] = useState(true); // Toggle output visibility

  // Fetch project data
  useEffect(() => {
    fetch(`${api_base_url}/getProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
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
        console.error('Error fetching project:', err);
        toast.error('Failed to load project.');
      });
  }, [id]);

  // Save project
  const saveProject = () => {
    const trimmedCode = code?.toString().trim();

    fetch(`${api_base_url}/saveProject`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
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
        console.error('Error saving project:', err);
        toast.error('Failed to save the project.');
      });
  };

  // Run project
  const runProject = () => {
    const fileExtension = data.projLanguage === 'python' ? '.py' :
                          data.projLanguage === 'java' ? '.java' :
                          data.projLanguage === 'javascript' ? '.js' :
                          data.projLanguage === 'c' ? '.c' :
                          data.projLanguage === 'cpp' ? '.cpp' : '';

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
        console.log(data);
        if (data.run) {
          setOutput(data.run.output); // Show output
          setError(data.run.code !== 0); // Mark as error if code !== 0
        } else {
          setOutput("Error: Invalid API Response");
          setError(true);
        }
      })
      .catch((err) => {
        console.error('Error executing project:', err);
        setOutput("Error: Failed to execute code.");
        setError(true);
      });
  };

  // Handle Ctrl+S shortcut
  useEffect(() => {
    const handleSaveShortcut = (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveProject();
      }
    };

    window.addEventListener('keydown', handleSaveShortcut);
    return () => {
      window.removeEventListener('keydown', handleSaveShortcut);
    };
  }, [code]);

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row items-center justify-between w-full" style={{ height: 'calc(100vh - 90px)' }}>
        {/* Code Editor */}
        <div className="flex-1 w-full h-[50vh] md:h-full bg-gray-800">
          <Editor2
            value={code}
            language={data ? data.projLanguage : 'java'}
            theme="vs-dark"
            options={{
              formatOnType: true,
              formatOnPaste: true,
              automaticLayout: true, // Adjust editor layout dynamically
            }}
            onChange={(newCode) => setCode(newCode || '')}
            onMount={(editor) => {
              editor.getAction('editor.action.formatDocument').run(); // Format code on load
            }}
          />
        </div>

        {/* Output and Input */}
        <div className={`flex-1 w-full md:w-[50%] h-[30vh] md:h-full bg-[#27272a] ${showOutput ? '' : 'hidden md:block'}`}>
          <div className="flex pb-3 border-b-[1px] border-b-[#1e1e1f] items-center justify-between px-[10px] md:px-[30px]">
            <p className="p-0 m-0 text-sm md:text-base text-white">Output</p>
            <button
              className="btnNormal !w-fit !px-[10px] md:!px-[20px] bg-blue-500 transition-all hover:bg-blue-600"
              onClick={runProject}
            >
              Run
            </button>
          </div>
          <textarea
            placeholder="Enter input for your program"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="w-full h-[20%] p-2 mb-2 bg-[#1e1e1f] text-white"
            style={{ resize: 'none' }}
          ></textarea>
          <pre
            className={`w-full h-[80%] overflow-auto ${
              error ? 'text-red-500' : 'text-white'
            }`}
          >
            {output}
          </pre>
        </div>
      </div>

      {/* Toggle Output Button for Mobile View */}
      <button
        className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-md md:hidden"
        onClick={() => setShowOutput(!showOutput)}
      >
        {showOutput ? 'Hide Output' : 'Show Output'}
      </button>
    </>
  );
};

export default Editor;
