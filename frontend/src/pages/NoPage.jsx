import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const NotFound = () => {
  const [showTranslation, setShowTranslation] = useState(false);

  const handleTranslationClick = () => {
    setShowTranslation(true);
  };

  return (
    <div className="container mx-auto h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-4 md:space-y-8">
        <FaExclamationTriangle className="text-5xl md:text-10xl" />
        <h1 className="text-3xl md:text-6xl">404</h1>
        <h3 className="text-xl sm:text-2xl md:text-3xl truncate">
          {showTranslation ? "Not Found" : "pneumonoultramicroscopicsilicovolcanoconiosis"}
        </h3>
        
        <p
          className="cursor-pointer underline text-primary hover:text-primary-dark"
          onClick={handleTranslationClick}
        >
          See Translation
        </p>
        <RouterLink
          to="/"
          className="underline text-secondary hover:text-secondary-dark"
        >
          Go back to home
        </RouterLink>
      </div>
    </div>
  );
};

export default NotFound;
