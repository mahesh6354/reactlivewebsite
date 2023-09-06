import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Img from "../img/codigologo.png"
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Navbar2 = () => {
  const [search, setSearch] = useState("");
  const navigator = useNavigate();


  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigator(`/search?q=${encodeURIComponent(search)}`);
    setSearch("");
  };
 

  return (
    <>
    <nav className="navbar position-sticky navbar-expand-lg bd-dark bg-body-tertiary" style={{boxShadow: '0 2px 5px 0 hsla(0,0%,43.9%,.3'  }}>
        <div className="container-fluid" style={{ maxWidth: '91vw' }}>
        <a class="navbar-brand" href="/">
        <img  src={Img} alt="" style={{width : "5rem"}} class="ig d-inline-block align-text-top" />
    
      </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav gap-3">
              
              <li className="nav-item">
                <a className="nav-link" href="/" style={{fontSize: '27px'}}><FaFacebook /></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" style={{fontSize: '27px'}}><FaInstagram /></a>
              </li>
              <li className="nav-item">
              <a className="nav-link" href="/" style={{fontSize: '27px'}}><FaWhatsapp /></a>
            </li>

              <li className="nav-item" style={{marginTop: '12px'}}>
                <form onSubmit={handleSearchSubmit} style={{    display: 'flex'}}>
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchInputChange}
                  />
                 
                </form>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export { Navbar2 };
