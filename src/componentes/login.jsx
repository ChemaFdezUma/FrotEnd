import React, { useState } from 'react';
import Login from './loginlogin';
import Register from './register';
const GraffitiLogin = () => {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
}

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/solyluna.jpeg)`,
        backgroundSize: '60%', // Adjust the size as desired
      }}
    >
      {currentForm == 'login' ? (<Login onFormSwitch = {toggleForm}/>) : (<Register onFormSwitch = {toggleForm}/>)}
     </div>
  );
};

export default GraffitiLogin;
