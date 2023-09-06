import React from 'react'
import './footer.css'
import './home.css'
import { Link } from 'react-router-dom'
import { BsFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer'>
    <footer className='_9c0ddc6d' style={{}}>
      <div className="_2e65b25b">
        <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
        
        <h1 className='title_1' style={{color:'white'}}>Codigo</h1>
        </div>
         <div className="col-lg-6 col- mt-3 col-sm-12">
          <p className='_51f6fc5b'>Codigo is the product recommendation service from The New York Times. Our journalists combine independent research with (occasionally) over-the-top testing so you can make quick and confident buying decisions. Whether it’s finding great products or discovering helpful advice, we’ll help you get it right (the first time).</p>
         </div>
         <div className="col-lg-3 col-sm-12">
         <br />
           <ul className='e9cc76f4' style={{display: 'flex'
           , flexFlow: 'column', textAlign: '-webkit-center'}}>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>About Codigo</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Our Team</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Staff demographics</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Jobs at Codigo</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Contact us</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>How to pitch</Link>
            </li>
           </ul>
         </div>
         <div className="col-lg-3 col-sm-12">
         <br />
           <ul className='e9cc76f4' style={{display: 'flex'
           , flexFlow: 'column' , textAlign: '-webkit-center'}}>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Deals</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Lists</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Blog</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Newsletter</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>Make A Plan:Moving</Link>
            </li>
            <li className='_58e84260'>
            <Link to="/" className='_9d9727a4'>About Us</Link>
            </li>
           
           </ul>
         </div>
        </div>
        <div className="row mt-3">
         <div className="col-lg-12 col-sm-12 letter curo" >
        <div className='icons'>
        <i class="fa-brands fa-facebook fa-lg" style={{color: '#ffffff'}}></i>&nbsp;
        <i class="fa-brands fa-twitter fa-lg" style={{color: '#ffffff'}}></i>&nbsp;
        <i class="fa-brands fa-instagram fa-lg" style={{color: '#ffffff'}}></i>&nbsp;
        <i class="fa-brands fa-google fa-lg" style={{color: '#ffffff'}}></i>&nbsp;
        </div>
         </div>
         <br />
         <br />
         
         <div className="row mt-3">
        <div className="col-lg-12 mb-3 col-sm-12 opi curo text-center fcc d-flex">     
                <Link className='linkok' to='https://codigo.co.in/'>@ 2023 Codigo, Inc., India </Link>
                <Link className='linkok' to='/policy'>Privacy Policy</Link>
                <Link className='linkok'>Terms of use</Link>
                <Link className='linkok'>Partnerships & Advertising</Link>
                <Link className='linkok'>Licensing & Reprints</Link>
                <Link className='linkok'>Cookie Policy</Link>
        </div>
         </div>
        </div>
      </div>
      </footer>
    </div>
  )
}

export { Footer }
