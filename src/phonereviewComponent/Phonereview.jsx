import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import phone1 from '../img/12.jpg'
import phone2 from '../img/13.jpg'
import phone3 from '../img/14.jpg'
import phone4 from '../img/15.jpg'
import phone5 from '../img/16.jpg'
import phone6 from '../img/17.jpg'
import img from '../img/img.jpg'
import "./review.css"

const Phonereview = () => {
  return (<>
   <section>
    <div className="table bc">
    <h1 className='section-heading'>Related Devices</h1>
    <ul className='clearfix'>
      <li>
         <a className='module-phones-link bc' href="">
         <img src={phone1} alt="" />
         <br />
       Iphone 14 pro max
         <br/>
         ₹1,00,000
         <br />
         ⭐⭐⭐⭐
         </a>
      </li>
      <li>
      <a className='module-phones-link bc' href=""  style={{backgroundColor : ""}}>
      <img src={phone2} alt="" />
      <br />
     Iphone 13 pro
      <br/>
         ₹1,00,000
         <br />
         ⭐⭐⭐
      </a>
    </li>
    <li>
    <a className='module-phones-link bc' href="">
    <img src={phone3} alt="" />
    <br />
    Realme C53
    <br/>
         ₹35,000
         <br />
         ⭐⭐
    </a>
  </li>
    </ul>
    <ul className='clearfix'>
      <li>
         <a className='module-phones-link bc' href="">
         <img src={phone4} alt="" />
         <br />
         Xiaomi Redmi 12
         <br/>
         ₹45,000
         <br />
         ⭐⭐⭐
         </a>
      </li>
      <li>
      <a className='module-phones-link bc' href="">
      <img src={phone5} alt="" />
      <br />
      Google pro
      <br/>
         ₹1,50,000
         <br />
         ⭐⭐⭐⭐
      </a>
    </li>
    <li>
    <a className='module-phones-link bc' to="/">
    <img src={phone6} alt="" />
    <br />
    Realme C53
    <br/>
         ₹32,000
         <br />
         ⭐⭐⭐
    </a>
  </li>
    </ul>
    <p className='more'>
    <a className='more-news-link' to="/">
    MORE RELATED DEVICES</a>
  </p>
    
    
    </div>
     
   
   </section>
   <br />
   <div>
   <img src={img} style={{width : "100%"}} alt="Advertisements" />
   </div>
   <section>
    <div className="table bc">
    <h1 className='section-heading'>POPULAR DEVICES</h1>
    <ul className='clearfix'>
      <li>
         <a className='module-phones-link bc' href="">
         <img src={phone1} alt="" />
         <br />
       Iphone 14 pro max
         <br/>
         ₹1,00,000
         <br />
         ⭐⭐⭐⭐
         </a>
      </li>
      <li>
      <a className='module-phones-link bc' href=""  style={{backgroundColor : ""}}>
      <img src={phone2} alt="" />
      <br />
     Iphone 13 pro
      <br/>
         ₹1,00,000
         <br />
         ⭐⭐⭐
      </a>
    </li>
    <li>
    <a className='module-phones-link bc' href="">
    <img src={phone3} alt="" />
    <br />
    Realme C53
    <br/>
         ₹35,000
         <br />
         ⭐⭐
    </a>
  </li>
    </ul>
    <ul className='clearfix'>
      <li>
         <a className='module-phones-link bc' href="">
         <img src={phone4} alt="" />
         <br />
         Xiaomi Redmi 12
         <br/>
         ₹45,000
         <br />
         ⭐⭐⭐
         </a>
      </li>
      <li>
      <a className='module-phones-link bc' href="">
      <img src={phone5} alt="" />
      <br />
      Google pro
      <br/>
         ₹1,50,000
         <br />
         ⭐⭐⭐⭐
      </a>
    </li>
    <li>
    <a className='module-phones-link bc' href="">
    <img src={phone6} alt="" />
    <br />
    Realme C53
    <br/>
         ₹32,000
         <br />
         ⭐⭐⭐
    </a>
  </li>
    </ul>
    
    <p className='more'>
    <a className='more-news-link' to="/">
    MORE POPULAR DEVICES</a>
  </p>
    </div>
     
   
   </section>
   <br />
 </>
  );
}


export { Phonereview } 
