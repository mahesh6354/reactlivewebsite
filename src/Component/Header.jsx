import React, { useEffect, useState } from 'react';
import img1 from '../img/codigologo.png'
import axios from 'axios';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import backendurl from '../Backend';

const Header = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(backendurl + '/getactivecategory');
      setCategory(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  
  const handleButtonClick = (id) => {
    const Cateid = id;
    console.log('category id is the', Cateid);
    navigate(`/Category/${Cateid}`);
  };

  

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <div className='sticky-top' style={{backgroundColor: 'whitesmoke'}}>
    <nav className="container navbar navbar-expand-lg navbar-light" >
        <a className="codigo navbar-brand" href="/" style={{color : "black"}}>Codigo
        </a>
      <button
        style={{
          backgroundColor: '#d2d1d1',
          marginRight: '8px'
        }}
        className="navbar-toggler custom-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown" style={{ flexDirection: 'column' }}>
        <ul className="navbar-nav shriti">
       
          {category.map((elem) => (
            <li className="nav-item dropdown" key={elem.id}>
              <button
                style={{ color: "black", fontWeight: '900' }}
                className="btn nav-link dropdown-toggle"
                type="button"
                id={`dropdown-${elem.id}`}
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => handleButtonClick(elem.id)}
              >
                {elem.name}
              </button>
              <div className="dropdown-menu" aria-labelledby={`dropdown-${elem.id}`}>
                {elem.subcategorylist.map((subElem) => (
                  <button
                    key={subElem.id}
                    style={{ color: "black", fontWeight: '900' }}
                    className="dropdown-item hover"
                    onClick={() => handleButtonClick(subElem.id)}
                  >
                    {subElem.name}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </div>
  
    );
    
  };


export { Header };
