import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backendurl from '../Backend';
import './admin.css'

const Admin = () => {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setAdmin((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendurl + '/admin', admin); 
      navigate('/AdminPanel');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
    <div className="container ola">
     <div className="row opop">
     <div className="col-lg-12 col-md-12 col-sm-12 text-center  ">
      
     <h1 className=''>Admin Login</h1>
     </div>
      <div className="col-lg-12 col-md-12 col-sm-12 text-center ol2">
      <div className="mb-3">
        <label>Email :</label>
        <input
          type="email"
          name="email"
          onChange={handleInput}
          value={admin.email} // Add 'value' prop to sync the input with state
          required
        />
      </div>
      <div className="mb-3">
        <label>Password :</label>
        <input
          type="password"
          name="password"
          onChange={handleInput}
          value={admin.password} // Add 'value' prop to sync the input with state
          required
        />
      </div> 
      <button type="submit" onClick={handleClick} className="btn btn-primary">
        Submit
      </button>
      </div>
     </div>
    
    </div>
     
      
    </div>
  );
};

export { Admin };
