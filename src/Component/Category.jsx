import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backendurl from '../Backend';

const Category = () => {
  const [category1, setCategory1] = useState({
    title: "",
    catecheck: false
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setCategory1(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e) => {
    setCategory1(prevState => ({
      ...prevState,
      catecheck: e.target.checked
    }));
  };

  console.log("category1 is the", category1)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendurl + "/admincate", category1);
      navigate("/admincate");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Add to Category</label>
          <input type="text" name="title" onChange={handleInput} className="form-control" placeholder="Enter the Category name" required />
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

        <div className="add1">
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button>
        </div>
      </div>
    </>
  );
}

export { Category };
