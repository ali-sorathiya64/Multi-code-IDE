y// import React, { useEffect, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import { toast } from 'react-toastify';

// const Output = () => {
//   const location = useLocation();
//   const { id } = useParams();
//   const [output, setOutput] = useState('');
//   const [error, setError] = useState(false);
//   const { code, data } = location.state;

//   const runProject = async (retryCount = 0) => {
//     const fileExtension = data.projLanguage === 'python' ? '.py' :
//                           data.projLanguage === 'java' ? '.java' :
//                           data.projLanguage === 'javascript' ? '.js' :
//                           data.projLanguage === 'c' ? '.c' :
//                           data.projLanguage === 'cpp' ? '.cpp' : '';

//     try {
//       const res = await fetch("https://emkc.org/api/v2/piston/execute", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           language: data.projLanguage,
//           version: data.version,
//           files: [
//             {
//               filename: data.name + fileExtension,
//               content: code,
//             },
//           ],
//         }),
//       });

//       if (res.status === 429 && retryCount < 5) {
//         const retryAfter = res.headers.get("Retry-After") || 1;
//         console.log(`Retrying in ${retryAfter} seconds...`);
//         setTimeout(() => runProject(retryCount + 1), retryAfter * 1000);
//       } else if (!res.ok) {
//         throw new Error(`Request failed with status ${res.status}`);
//       } else {
//         const data = await res.json();
//         if (data.run) {
//           setOutput(data.run.output); // Show output
//           setError(data.run.code !== 0); // Mark as error if code !== 0
//         } else {
//           setOutput("Error: Invalid API Response");
//           setError(true);
//         }
//       }
//     } catch (err) {
//       console.error('Error executing project:', err);
//       setOutput("Error: Failed to execute code.");
//       setError(true);
//     }
//   };

//   useEffect(() => {
//     runProject();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center w-full h-full bg-gray-800">
//         <div className="w-full md:w-[70%] p-5">
//           <div className="flex flex-col">
//             <h2 className="text-white text-lg mb-2">Output</h2>
//             <pre className={`p-3 bg-black text-white overflow-auto ${error ? 'text-red-500' : ''}`}>
//               {output}
//             </pre>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Output;
