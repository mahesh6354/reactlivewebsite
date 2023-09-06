import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import '../App.css';
import moment from 'moment';
import { ErrorPage } from './ErrorPage';
import './FirstCate.css'
import './home.css';
import { Header2 } from './Header2';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import backendurl from '../Backend';
import frontendurl from '../Frontend';

const FirstCate = () => {

  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const [latestblog, setLatestBlog] = useState([]);
  const [deal, setDeal] = useState([]);

  const navigate = useNavigate()
  const [error, setError] = useState(null) 


  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(backendurl + '/getactivecategory');
      setCategory(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const fetchPost = async () => {
    
    try {
      const res = await axios.get(backendurl + `/selectpost/${id}`);
      console.log("res is the", res);
      if (res.status === 200) {
        setPost([res.data]);
        }
        else if (res.status === 401) {
          throw new Error('Data not found');
        } else {
          throw new Error('Request failed');
        }
      } catch (error) {
        setError(error.message);
      }
  };

  console.log("post array is the",post)
  
  
  console.log("postid is the",id)

  const fetchLatestBlog = async () => {
    try {
      const res = await axios.get( backendurl + `/latestblog/${id}`);
      console.log("res is the", res);
      setLatestBlog(res.data);
      console.log("latestblog is the", latestblog);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("latestblog is the",latestblog);

  const fetchDeals = async () => {
    try{
      const res = await axios.get(backendurl + '/deals');
      console.log("data is the deal",res.data)
      setDeal(res.data.data)
    }catch(err) {
      console.log(err)
    }
  }
 console.log('deals is the',deal)

  useEffect(() => {
    fetchAllBooks();
    fetchPost();
    fetchLatestBlog(); 
    fetchDeals();  
  }, [id]);
  // button click 
    const handleShowFullBlog = async (blogId) => {
    const postid = blogId;
    console.log("post id is the", postid);
    navigate(`/post/${postid}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if(error) {
    return (
      <div>
      <ErrorPage />
       
      </div>
    );
  }

 
   return (
    <>
    <div>
   
    {post.length > 0 && (
      <Helmet>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {post[0].metatitle ? (
        <title>{post[0].metatitle}</title>
      ) : (
        <title>{post[0].title}</title>  
      )}
      <meta name="categoryName" content={post[0].category} />
      <meta name="image" content={post[0].image} />
      {post[0].metaDescription ? (
        <meta name="description" content={post[0].metaDescription} />
      ) : (
        <meta name="description" content={post[0].shortdesc} />
      )}
      <meta property="title" content={post[0].title} />
      <meta property="og:url" content={`${frontendurl}/selectpost/${post[0]?.id}`} />
    </Helmet> 
    )}
    <div className="sticky-top"> 
    <Header2/> 
  </div>
  <div className="_2e65b25b">
    <div className="col-lg-12 col-md-12 col-sm-12 mt-3 ">
    <p className="ii text-center mt-4 font-weight-bold">
    We independently review everything we recommend. When you buy through our links, we may earn a commission.
    <Link to="/policy" style={{ color: 'red' }}>Learn More</Link>
  </p>
    </div>
  </div>
  <div>
    <div>
      <div className="_2e65b25b">
        <div className="row">
          <div className="col-lg-10 col-sm-12" style={{ lineHeight: '2.875rem' }}>
            {post.length > 0 ? (
              post.map((el, i) => (
                <div key={el.id}>
                  <h1 className='fd'>{el.title}</h1>
                  <h1 className='dc1'>By {el.author} UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')} &nbsp; <span className='sm '> <FaFacebook /> &nbsp; <FaInstagram /> &nbsp; <FaWhatsapp /> </span> </h1>
                 
                  <div className="img sdsd">
                    <img
                      style={{ width: '100%' }}
                      src={backendurl + `/uploads/${el.image}`}
                      alt="mahesh"
                    />
                  </div>
                 
                  <div className='sdsd1'>
                    <p className='shortdesc1'>{el.shortdesc}</p>
                  </div>
                 
                  <div className="foote">
                    <div className="foote" dangerouslySetInnerHTML={{ __html: el.desc }}></div>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
           
          </div>
          <div className="col-lg-2 col-sm-12">
            <h1 className='title_12'>Daily Deals </h1>
            {deal.map((el) => (
              <div key={el.id}>
                <img className='w-h' src={backendurl + `/uploads/${el.image}`} alt="mahesh" onClick={() => handleShowFullBlog(el.id)} />
                <h1 className='tit hover tit2 titfs' onClick={() => handleShowFullBlog(el.id)}>{el.title}</h1>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>

<div className="_2e65b25b">
  <div className="row">
    <div className="col-lg-12 col-sm-12">
      <h1 className="headingfs">Stories That Matter's</h1>
      <p className='aq1'>Your guests will never want to leave. Sorry.</p>
    </div>
  </div>
  <div className="row">
    {latestblog.length > 0 ? (
      latestblog.map((el, i) => (
        <div className="col-md-4 marbot" key={el.id}>
          <div className="">
            <img
              className="card-img-top"
              src={backendurl + `/uploads/${el.image}`}
              alt={el.title}
              style={{ width: '371px', height: '292px' }}
              onClick={() => handleShowFullBlog(el.id)}
            />
            <div className="card-body">
              <h5
                className="card-title hover xs text tit catemargin"
                onClick={() => handleShowFullBlog(el.id)}
              >
                {el.title}
              </h5>
              <h1 className="authorfs">By {el.author}</h1>
            </div>
          </div>
        </div>
      ))
    ) : null}
  </div>
</div>

     
      <Footer />
      </div>
      </>
  );
};

export { FirstCate };


