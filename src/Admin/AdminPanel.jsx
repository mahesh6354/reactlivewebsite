import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/codigologo.png';
import '../Admin/main.css';

const AdminPanel = () => {
  return (
    <>
      <div className="rte">
        <nav className="navbar navbar-expand-lg navbar-light opop">
            <Link className="navbar-brand log" to="/adminpanel" style={{color : "black"}}>
              Codigo
            </Link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{  
              flexDirection: 'row-reverse'}}>
              <ul className="navbar-nav ">
                <li className="nav-item color">
                  <Link className="nav-link active" to="/AdminPanel">
                    <span className="ml-2">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admincate">
                    <span className="ml-2">Category</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/viewpost">
                    <span className="ml-2">Posts</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    <span className="ml-2">Logout</span>
                  </Link>
                </li>
                {/* Add more sidebar items */}
              </ul>
            </div>
      
        </nav>

        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h1 className="tara">
                Hello{' '}
                <marquee className="asas" width="20%" direction="up" height="81px">
                  Admin
                </marquee>{' '}
                <br />
                Welcome To Admin Panel 😃
              </h1>
              {/* Add your admin panel content here */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { AdminPanel };
