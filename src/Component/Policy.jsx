import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';

import './policy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import photo from '../img/img.jpg';
import { Header2 } from './Header2';
import backendurl from '../Backend';


const Policy = () => {

  const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
  
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get( backendurl +'/getactivecategory');
        setCategory(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
  
    const fetchAllPostData = async () => {
      try {
        const res = await axios.get( backendurl + '/posted');
        setData(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
     
    useEffect(() => {  
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
      fetchAllBooks();
      fetchAllPostData();
    }, []);
  
    return (
      <>
        <Header2 /> 
        <div >

          <div className="_2e65b25b">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
              <p className="text-center">
                We independently review everything we recommend. When you buy
                through our links, we may earn a commission.
                <a href="/policy" style={{color:'red'}}>Learn More</a>
              </p>
            </div>
            </div>
          
          
         
          <div className='row'>
           <div className="col-lg-12 col-md-12 col-sm-12">
            <h1 className='title'>About Us!</h1>
            <p className='our mt-3' >Codigo mission is to recommend what really matters. Each year, we independently test and review thousands of products to help you find just what you need. Our goal is to save you time and eliminate the stress of shopping, whether you’re looking for everyday gear or gifts for loved ones.</p>
            <p className='our' >We strive to be the most trusted product recommendation service around, and we work with total editorial independence. We won’t post a recommendation unless our writers and editors have deemed something the best through rigorous reporting and testing.

            Codigo was founded in September 2011 and acquired by The New York Times Company in October 2016. We earn money through subscriptions and various affiliate marketing programs. That means we may get paid commissions on products purchased through our links to retailer sites. However, we recommend products based on our independent research, analysis, interviews, and testing. There’s no incentive for us to pick inferior products or to respond to pressure from manufacturers—in fact, it’s quite the opposite. If a reader returns their purchase because they’re dissatisfied or the recommendation is bad, 
           </p>
            <br />
            <p className='our' >
            we make no affiliate commission. We think that’s a pretty fair system that keeps us committed to serving our readers first.<br /> And of course, the decisions we make regarding the products we feature on our site are always driven by editorial and product testing standards, not by affiliate deals or advertising relationships.
           <br/>
            Our reviews take weeks or months of research and years of experience. In addition to relying on our own expertise, we gather interviews and data from the best sources around, including engineers, scientists, designers, and innumerable subject-matter experts, ranging from barbers to cat café staff (and residents) to cornhole champions. And we pore over customer reviews to find out what matters to real people who already own and use the things we’re assessing. In a world where overpriced, top-of-the-line models loaded with junk features are often seen as the gold standard, we aim to recommend high-quality things that warrant their price and don’t push extra features you’ll rarely use.
            
            </p>
            <div className='a9740e1f'>
            <img src={photo} alt="Description" style={{width: '100%'  
             , height: '100%'}} />
          </div>
          <div>
          <p className='our' >
          we make no affiliate commission. We think that’s a pretty fair system that keeps us committed to serving our readers first.<br /> And of course, the decisions we make regarding the products we feature on our site are always driven by editorial and product testing standards, not by affiliate deals or advertising relationships.
         <br/>
          Our reviews take weeks or months of research and years of experience. In addition to relying on our own expertise, we gather interviews and data from the best sources around, including engineers, scientists, designers, and innumerable subject-matter experts, ranging from barbers to cat café staff (and residents) to cornhole champions. And we pore over customer reviews to find out what matters to real people who already own and use the things we’re assessing. In a world where overpriced, top-of-the-line models loaded with junk features are often seen as the gold standard, we aim to recommend high-quality things that warrant their price and don’t push extra features you’ll rarely use.
          </p></div>
           </div>
           <div className="col-lg-12">
           <iframe className='mao' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9574862400186!2d72.86170001124374!3d21.233534380386118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f6dd5885acb%3A0x363cb19e36c3761f!2sCodigo%20IT%20solution!5e0!3m2!1sen!2sin!4v1692762853272!5m2!1sen!2sin"  style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
           </div>
       </div>
           
        
          
           </div>

        </div>
        
        <Footer />
      </>
    );
}

export { Policy } 
