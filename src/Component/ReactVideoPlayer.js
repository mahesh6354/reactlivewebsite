import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import '../App.css';
import moment from 'moment';
import { ErrorPage } from './ErrorPage';
import './FirstCate.css'
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Para } from '../StaticComponent/Para'
import ReactPlayer from 'react-player'


const FirstCate = () => {
``
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  const { id } = useParams();
  const [latestblog, setLatestBlog] = useState([]);
  const [deal, setDeal] = useState([]);

 
  const navigator = useNavigate()
  const navigate = useNavigate()
  const [error, setError] = useState(null) 

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get('http://localhost:8000/getactivecategory');
      setCategory(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  
  const fetchPost = async () => {
    
    try {
      const res = await axios.get(`http://localhost:8000/selectpost/${id}`);
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
      const res = await axios.get(`http://localhost:8000/latestblog/${id}`);
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
      const res = await axios.get('http://localhost:8000/deals');
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
  navigate(`/selectpost/${postid}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


  if(error) {
    return (
      <div>
      <ErrorPage />
       
      </div>
    );
  }

  
  
  const handleButtonClick = (id) => { 
    const Cateid = id;
    console.log("category id is the", Cateid)

   
    navigator(`/categoryPage/${Cateid}`);

  }
 
   return (
    <>
      <Navbar className = "my-5" /> {/* Pass the 'category' state to the Navbar component */}
      <div style={{ marginTop: '40px', marginBottom: '90px' }}>
        <div style={{backgroundColor: "#9f9c9c;"}}>
          <div className="container">
            <div className="row">
            <div className="col-1"></div>
              <div className="col-10">
           
                <div>
                  {/* Render the categories in the header */}
                  <ul className="nav" style={{ gap: "9px" }}>
                  <li className="nav-item _61361b4c">
                      <Link to="/">Home</Link>
                    </li>
                    {category.map((elem) => (
                      <li className="nav-item _61361b4c" key={elem.id}>
                        <div className="dropdown a6e85973">
                          <button
                            style={{
                              fontFamily: 'sans-serif',
                              fontWeight: 'bolder'
                            }}
                            className="btn main-tag a6e85973"
                            type="button"
                            id={`dropdown-${elem.id}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={() => handleButtonClick(elem.id)}
                          >
                            {elem.name}
                          </button>
                          <ul className="dropdown-menu" aria-labelledby={`dropdown-${elem.id}`}>
                            {elem.subcategorylist.map((elem) => (
                              <li key={elem.id}>
                              <button className="dropdown-item .dropdown-item1 hover" onClick={() => handleButtonClick(elem.id)}>
                                  {elem.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                </ul>
                
                </div>
              </div>
              <div className="col-1"></div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="col-12">
            <p className="text-center my-5 font-size">
              We independently review everything we recommend. When you buy
              through our links, we may earn a commission.
              <a href="/policy">Learn More</a>
            </p>
          </div>
        </div>
        <div>
          <div>
          <div className="container">
            <div className="row">
            <div className="col-lg-10 col-sm-12" style={{lineHeight : "2.875.rem"}}>
            {post.length > 0 ? (
              post.map((el, i) => (
                <div key={el.id}>
            
                  <h1 className='fd'>{el.title}</h1>
                  <h1 className='dc1 '>By {el.author} UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')} </h1>
                  <br />
                  <div className="img">
                    <img style={{width: '100%'}}
                    
                      src={`http://localhost:8000/uploads/${el.image}`}
                      alt="mahesh"
                    />
                  </div>
                  <br />
                  <div>
                  <p className='xz'>{el.shortdesc}</p>
                  </div>
                  <br />
                 <div className="desc">
                 <div dangerouslySetInnerHTML={{ __html: el.desc }}></div>
                 </div>
                 <div className='mahesh'>
                 <ReactPlayer url='https://youtu.be/lpdRqn6xwiM' />
                 </div>
                 
                </div>
              ))
            ) : (
              <div></div>
            )}
            <br />
          </div>
          <div className="col-lg-2 col-sm-12">
          <h1 className='title'>Daily Deals </h1>
          {deal.map((el) => {
            return (
              <div key={el.id}>
                <img className='w-h' src={`http://localhost:8000/uploads/${el.image}`} alt="mahesh" onClick={() => handleShowFullBlog(el.id)} />
                <h1 className='tit hover titfs'>{el.title}</h1>
                <p className='authorfs'>{el.author}</p>
              </div>
            );
          })}
        </div>
        

          </div>
          </div>
          </div>
        </div>
      </div>
      <div className="container">
       <div className="row ">
       <div className="col-lg-12 col-sm-12">
        <h1 className="title">Stories That Matter's</h1>
        <p className='aq'>Your guests will never want to leave. Sorry.</p>
       </div>
       </div>
       <div className="row">
       {latestblog.length > 0 ? (
        latestblog.map((el, i) => (
          <div className="col-md-4 marbot" key={el.id}>
                    <div className="">
                      <img
                        className="card-img-top"
                        src={`http://localhost:8000/uploads/${el.image}`}
                        alt={el.title}
                        style={{ width: '371px', height: '292px' }}
                        onClick={() => handleShowFullBlog(el.id)}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title hover text tit catemargin"
                          onClick={() => handleShowFullBlog(el.id)}
                        >
                          {el.title}
                        </h5>
                        <h1 className="cateMishort date">UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')}</h1>
                        <h1 className="authorfs">By {el.author}</h1>
                      
                      </div>
                    </div>
                  </div>
        ))
      ) : null}
      </div>
      
      </div>
      <br />
      <Footer />
    </>
  );
};

export { FirstCate };


