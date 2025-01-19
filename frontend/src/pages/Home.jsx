import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import Select from 'react-select';
import { api_base_url } from '../helper';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import python from '../images/python.png';
import js from '../images/js.png';
import cSharp from '../images/c_sharp.png';
import cpp from '../images/cPlus.png';
import javac from '../images/javac.png';
import c from '../images/c.png';
import phpIcon from '../images/php.png';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [isEditModelShow, setIsEditModelShow] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [projects, setProjects] = useState([]);
  const [editProjId, setEditProjId] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1f1f1f',
      borderColor: '#4f4f4f',
      color: '#fff',
      padding: '5px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#121212',
      color: '#fff',
      borderRadius: '10px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#121212',
      color: '#fff',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#aaa',
    }),
  };

  const getRunTimes = async () => {
    try {
      let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
      let data = await res.json();
      const filteredLanguages = ["python", "javascript", "c", "c++", "java", "csharp", "php"];

      const options = data
        .filter(runtime => filteredLanguages.includes(runtime.language))
        .map(runtime => ({
          label: `${runtime.language.toUpperCase()} (${runtime.version})`,
          value: runtime.language === "c++" ? "cpp" : runtime.language === "csharp" ? "c#" : runtime.language,
          version: runtime.version,
        }));

      setLanguageOptions(options);
    } catch (error) {
      toast.error("Failed to fetch runtimes.");
    }
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const getProjects = async () => {
    try {
      const res = await fetch(api_base_url + "/getProjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      });
      const data = await res.json();
      if (data.success) {
        setProjects(data.projects);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    getProjects();
    getRunTimes();
  }, []);

  const createProj = async () => {
    try {
      const res = await fetch(api_base_url + "/createProj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          projLanguage: selectedLanguage.value,
          token: localStorage.getItem("token"),
          version: selectedLanguage.version
        })
      });
      const data = await res.json();

      if (data.success) {
        setName("");
        setIsCreateModelShow(false);
        navigate("/editor/" + data.projectId);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to create project.");
    }
  };

  const deleteProject = async (id) => {
    const conf = window.confirm("Are you sure you want to delete this project?");
    if (conf) {
      try {
        const res = await fetch(api_base_url + "/deleteProject", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            projectId: id,
            token: localStorage.getItem("token")
          })
        });
        const data = await res.json();

        if (data.success) {
          getProjects();
        } else {
          toast.error(data.msg);
        }
      } catch (error) {
        toast.error("Failed to delete project.");
      }
    }
  };

  const updateProj = async () => {
    try {
      const res = await fetch(api_base_url + "/editProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          projectId: editProjId,
          token: localStorage.getItem("token"),
          name: name,
        })
      });
      const data = await res.json();

      if (data.success) {
        setIsEditModelShow(false);
        setName("");
        setEditProjId("");
        getProjects();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("Failed to update project.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-200">👋 Welcome, User!</h3>
          <button
            onClick={() => setIsCreateModelShow(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow-lg transition-all">
            Create Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project._id}
                className="bg-gray-800 text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition-transform">
                <div
                  onClick={() => navigate("/editor/" + project._id)}
                  className="cursor-pointer">
                  <img
                    src={
                      project.projLanguage === "python"
                        ? python
                        : project.projLanguage === "javascript"
                        ? js
                        : project.projLanguage === "cpp"
                        ? cpp
                        : project.projLanguage === "c"
                        ? c
                        : project.projLanguage === "java"
                        ? javac
                        : project.projLanguage === "c#"
                        ? cSharp
                        : phpIcon
                    }
                    alt="language"
                    className="w-20 h-20 object-contain mx-auto mb-4"
                  />
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => {
                      setIsEditModelShow(true);
                      setEditProjId(project._id);
                      setName(project.name);
                    }}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No Projects Found!</p>
          )}
        </div>
      </div>

      {isCreateModelShow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsCreateModelShow(false);
              setName("");
            }
          }}>
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-center mb-4">Create Project</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your project name"
              className="w-full p-2 mb-4 text-black rounded"
            />
            <Select
              placeholder="Select a Language"
              options={languageOptions}
              styles={customStyles}
              onChange={handleLanguageChange}
              className="mb-4"
            />
            {selectedLanguage && (
              <p className="text-sm text-green-400 mb-2">
                Selected Language: {selectedLanguage.label}
              </p>
            )}
            <button
              onClick={createProj}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow">
              Create
            </button>
          </div>
        </div>
      )}

      {isEditModelShow && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target.classList.contains("modelCon")) {
              setIsEditModelShow(false);
              setName("");
            }
          }}>
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-bold text-center mb-4">Edit Project</h3>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter new project name"
              className="w-full p-2 mb-4 text-black rounded"
            />
            <button
              onClick={updateProj}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow">
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
