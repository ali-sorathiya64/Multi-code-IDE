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
import phpIcon from'../images/php.png';

const Home = () => {
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [isEditModelShow, setIsEditModelShow] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      borderColor: '#555',
      color: '#fff',
      padding: '5px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#000',
      color: '#fff',
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#333' : '#000',
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

  // Fetch supported runtimes for project creation
  const getRunTimes = async () => {
    try {
      let res = await fetch("https://emkc.org/api/v2/piston/runtimes");
      let data = await res.json();

      console.log("Backend response (runtimes):", data); // Debugging

      const filteredLanguages = [
        "python",
        "javascript",
        "c",
        "c++",
        "java",
        "csharp",
        "php",
      ];

      const options = data
        .filter(runtime => filteredLanguages.includes(runtime.language))
        .map(runtime => ({
          label: `${runtime.language} (${runtime.version})`,
          value: runtime.language === "c++" ? "cpp" : runtime.language === "csharp" ? "c#" : runtime.language === "php" ? "php" : runtime.language,
          version: runtime.version,
        }));

      console.log("Filtered language options:", options); // Debugging
      setLanguageOptions(options);
    } catch (error) {
      console.error("Error fetching runtimes:", error);
      toast.error("Failed to fetch runtimes.");
    }
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    console.log("Selected language:", selectedOption); // Debugging
  };

  const [projects, setProjects] = useState([]);

  // Fetch projects associated with the user
  const getProjects = async () => {
    try {
      const res = await fetch(api_base_url + "/getProjects", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: localStorage.getItem("token")
        })
      });
      const data = await res.json();

      console.log("Projects data:", data); // Debugging
      if (data.success) {
        setProjects(data.projects);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
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
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          projLanguage: selectedLanguage.value,
          token: localStorage.getItem("token"),
          version: selectedLanguage.version
        })
      });
      const data = await res.json();

      if (data.success) {
        setName("");
        navigate("/editior/" + data.projectId);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project.");
    }
  };

  const deleteProject = async (id) => {
    const conf = window.confirm("Are you sure you want to delete this project?");
    if (conf) {
      try {
        const res = await fetch(api_base_url + "/deleteProject", {
          mode: "cors",
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
        console.error("Error deleting project:", error);
        toast.error("Failed to delete project.");
      }
    }
  };

  const [editProjId, setEditProjId] = useState("");

  const updateProj = async () => {
    try {
      const res = await fetch(api_base_url + "/editProject", {
        mode: "cors",
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
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    }

  };



  
  

 
    return (
      <>
        <Navbar />
        <div className="container mx-auto mt-8 px-4 md:px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <h3 className='text-3xl font-extrabold text-cyan-600'>👋Welcome, User!</h3>
            <button onClick={() => { setIsCreateModelShow(true) }} className="btn bg-gradient-to-r from-cyan-500 to-teal-400 text-white hover:from-cyan-600 hover:to-teal-500 transition-all rounded-lg py-2 px-6 shadow-lg">Create Project</button>
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {projects && projects.length > 0 ? projects.map((project) => (
              <div key={project._id} className="project p-5 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all">
                <div onClick={() => { navigate("/editior/" + project._id) }} className='flex items-center gap-4 cursor-pointer'>
                  <img className='w-20 h-20 object-cover rounded-lg' src={project.projLanguage === "python" ? python : project.projLanguage === "javascript" ? js : project.projLanguage === "cpp" ? cpp : project.projLanguage === "c" ? c : project.projLanguage === "java" ? javac : project.projLanguage === "c#" ? cSharp : project.projLanguage === "php" ? phpIcon : ''} alt={project.projLanguage} />
                  <div>
                    <h3 className='text-xl font-semibold text-gray-800'>{project.name}</h3>
                    <p className='text-sm text-gray-500 mt-1'>
                      <span className="font-semibold text-cyan-500">
                        {new Date(project.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="btn bg-cyan-500 text-white hover:bg-cyan-600 transition-all rounded-full py-2 px-4 shadow-lg" onClick={() => {
                    setIsEditModelShow(true);
                    setEditProjId(project._id);
                    setName(project.name);
                  }}>Edit</button>
                  <button onClick={() => { deleteProject(project._id) }} className="btn bg-red-500 text-white hover:bg-red-600 transition-all rounded-full py-2 px-4 shadow-lg">Delete</button>
                </div>
              </div>
            )) : <p className="text-center text-gray-500">No Project Found!</p>}
          </div>
  
          {isCreateModelShow &&
            <div onClick={(e) => {
              if (e.target.classList.contains("modelCon")) {
                setIsCreateModelShow(false);
                setName("");
              }
            }} className='modelCon flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60'>
              <div className="modelBox p-8 bg-white rounded-2xl shadow-2xl text-black w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
                <h3 className='text-3xl font-bold text-center mb-4'>Create Project</h3>
                <div className="inputBox w-full mb-4">
                  <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Enter your project name' className="w-full p-3 text-black rounded-md border-2 border-cyan-500" />
                </div>
                <Select
                  placeholder="Select a Language"
                  options={languageOptions}
                  styles={customStyles}
                  onChange={handleLanguageChange}
                  className="w-full mb-4"
                />
                {selectedLanguage && (
                  <>
                    <p className="text-[14px] text-cyan-500 mt-2">
                      Selected Language: {selectedLanguage.label}
                    </p>
                    <button onClick={createProj} className="btn bg-gradient-to-r from-cyan-500 to-teal-400 text-white hover:from-cyan-600 hover:to-teal-500 transition-all rounded-lg py-2 px-4 mt-2 shadow-lg">Create</button>
                  </>
                )}
              </div>
            </div>
          }
  
          {isEditModelShow &&
            <div onClick={(e) => {
              if (e.target.classList.contains("modelCon")) {
                setIsEditModelShow(false);
                setName("");
              }
            }} className='modelCon flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60'>
              <div className="modelBox p-8 bg-white rounded-2xl shadow-2xl text-black w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
                <h3 className='text-3xl font-bold text-center mb-4'>Edit Project</h3>
                <div className="inputBox w-full mb-4">
                  <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Enter new project name' className="w-full p-3 text-black rounded-md border-2 border-cyan-500" />
                </div>
                <button onClick={updateProj} className="btn bg-gradient-to-r from-cyan-500 to-teal-400 text-white hover:from-cyan-600 hover:to-teal-500 transition-all rounded-lg py-2 px-4 mt-2 shadow-lg">Update</button>
              </div>
            </div>
          }
        </div>
      </>
    );
  }
  
  export default Home;
  