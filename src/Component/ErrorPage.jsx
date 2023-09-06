import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ErrorPage.css'
import "./home.css"
import { NavLink } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Header2 } from './Header2';
const ErrorPage = () => {

  return (
    <>
    <Header2 />
    <div style={{ marginTop: '40px' }}>
  
      
    <div class="error"     style={{paddingTop: '101px'}}>
    <div class="container-floud">
        <div class="col-xs-12 ground-color text-center">
            <div class="errorPage">
                <div class="clip"><div class="shadow"><span class="digit numberThree">4</span></div></div>
                <div class="clip"><div class="shadow"><span class="digit numberTwo">0</span></div></div>
                <div class="clip"><div class="shadow"><span class="digit numberOne">4</span></div></div>
            </div>
            <h2>Sorry 😲 Page not found</h2>
        </div>
    </div>
    <div className='text-center' style={{marginBottom : "10px"}}>
     <a>
    <Link className='edd' to='/'>Go To Home</Link>
     </a>
    </div>
</div>

<div style={{marginTop : "130px"}}>
<Footer />
</div>
 </div>
    </>
    )
}

export { ErrorPage } 
