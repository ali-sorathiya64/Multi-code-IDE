import React from 'react'
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import Contact from './pages/Contact';
import Services from './pages/Services';
import About from './pages/About';


const App = () => {
  return (
    <>
    
      <BrowserRouter>
        <RouteHandler />
      </BrowserRouter>
    </>
  )
};

const RouteHandler = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to={"/login"}/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editior/:id" element={isLoggedIn ? <Editor /> : <Navigate to={"/login"}/>} />
        <Route path="*" element={<NoPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App