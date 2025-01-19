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
      <div className="flex items-center px-[15px] md:px-[50px] lg:px-[100px] justify-between mt-5">
        <h3 className='text-xl sm:text-2xl'>👋Welcome, User!</h3>
        <div className="flex items-center">
          <button onClick={() => { setIsCreateModelShow(true) }} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600">Create Project</button>
        </div>
      </div>

      <div className="projects px-[15px] sm:px-[50px] md:px-[100px] mt-5 pb-10">
        {
          projects && projects.length > 0 ? projects.map((project) => {
            return (
              <div key={project._id} className="project w-full p-[15px] flex items-center justify-between bg-[#0f0e0e] mb-4 sm:mb-6">
                <div onClick={() => { navigate("/editior/" + project._id) }} className='flex w-full items-center gap-[15px]'>
                  {
                    project.projLanguage === "python" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={python} alt="Python" /> :
                    project.projLanguage === "javascript" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={js} alt="JavaScript" /> :
                    project.projLanguage === "cpp" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={cpp} alt="C++" /> :
                    project.projLanguage === "c" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={c} alt="C" /> :
                    project.projLanguage === "java" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={javac} alt="Java" /> :
                    project.projLanguage === "c#" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={cSharp} alt="C#" /> :
                    project.projLanguage === "php" ? 
                      <img className='w-[100px] sm:w-[130px] h-[70px] sm:h-[100px] object-cover' src={phpIcon} alt="PHP" /> : ""
                  }
                  <div>
                    <h3 className='text-lg sm:text-xl'>{project.name}</h3>
                    <p className='text-[12px] sm:text-[14px] text-[gray] mt-1'>
                      <span className="text-sm sm:text-lg font-semibold text-indigo-500">
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
                <div className="flex items-center gap-[10px] sm:gap-[15px]">
                  <button className="btnNormal bg-blue-500 transition-all hover:bg-blue-600" onClick={() => {
                    setIsEditModelShow(true);
                    setEditProjId(project._id);
                    setName(project.name);
                  }}>Edit</button>
                  <button onClick={() => { deleteProject(project._id) }} className="btnNormal bg-red-500 transition-all hover:bg-red-600">Delete</button>
                </div>
              </div>
            );
          }) : "No Project Found!"
        }
      </div>

      {isCreateModelShow &&
        <div onClick={(e) => {
          if (e.target.classList.contains("modelCon")) {
            setIsCreateModelShow(false);
            setName("");
          }
        }} className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'>
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[80vw] sm:w-[25vw] bg-[#0F0E0E]">
            <h3 className='text-xl sm:text-2xl font-bold text-center'>Create Project</h3>
            <div className="inputBox w-full mb-4">
              <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Enter your project name' className="w-full p-2 text-black rounded-md" />
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
                <p className="text-[14px] text-green-500 mt-2">
                  Selected Language: {selectedLanguage.label}
                </p>
                <button onClick={createProj} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2">Create</button>
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
        }} className='modelCon flex flex-col items-center justify-center w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.5)]'>
          <div className="modelBox flex flex-col items-start rounded-xl p-[20px] w-[80vw] sm:w-[25vw] bg-[#0F0E0E]">
            <h3 className='text-xl sm:text-2xl font-bold text-center'>Edit Project</h3>
            <div className="inputBox w-full mb-4">
              <input onChange={(e) => { setName(e.target.value) }} value={name} type="text" placeholder='Enter new project name' className="w-full p-2 text-black rounded-md" />
            </div>
            <button onClick={updateProj} className="btnNormal bg-blue-500 transition-all hover:bg-blue-600 mt-2">Update</button>
          </div>
        </div>
      }
    </>
  );
}

export default Home;
