import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backendurl from '../Backend';

const Edit = () => {
  const [category1, setCategory1] = useState({
    title : "",
    catecheck: false
  });

  const navigate = useNavigate();
  const location = useLocation();

  const cateId = location.pathname.split("/")[2]
  console.log(cateId);

  const handleInput = (e) => {
    setCategory1((preval) => ({
      ...preval,[e.target.name]: e.target.value}))
  }
  console.log(category1);

  const handleCheckboxChange = (e) => {
    setCategory1(prevState => ({
      ...prevState,
      catecheck: e.target.checked
    }));
  };


  const handleClick = async(e) => {
     e.preventDefault()
     try{
          await axios.put(backendurl + "/admincate/"+cateId,category1)
          navigate("/admincate")
     }catch(err){
      console.log(err)
     }
  }
  return(
    <>
      <div className="container">
      <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Enter the Update Name</label>
          <input type="text" name="title" onChange={handleInput} class="form-control" placeholder='Enter the Update Name'  required/>
        </div>

        <div className="form-check" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <input
          className="form-check-input"
          type="checkbox"
          id="exampleCheck"
          name="catecheck"
          checked={category1.catecheck}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="exampleCheck">
          If you checked this, then this post is visible on the UI side
        </label>
      </div>
  
    <button type="submit" class="btn btn-primary" onClick={handleClick}>Update</button></div>
    </>
  )
    
}
export { Edit }; 
