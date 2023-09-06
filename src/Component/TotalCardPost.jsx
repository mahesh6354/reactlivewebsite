import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import './home.css';
import { ErrorPage } from './ErrorPage';
import moment from 'moment';
import { Header2 } from './Header2';
import backendurl from '../Backend';

const TotalCardPost = () => {
  
    const [category, setCategory] = useState([]);
    const [allpost, setAllPost] = useState([]);
    
  
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchAllCategories = async () => {
      try {
        const res = await axios.get( backendurl + '/getactivecategory');
        setCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchAllPost = async () => {
      try {
        const res = await axios.get(  backendurl + '/allpostcard', {
          params: {
            page: currentPage,
            pageSize: 12,
          },
        });
        setAllPost(res.data.results);
        setTotalPages(res.data.totalPages);
      } catch (Err) {
        console.log(Err);
      }
    };

    const handleFirstPage = () => {
      setCurrentPage(1);
    };
    const handleLastPage = () => {
      setCurrentPage(totalPages);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    const handleShowFullBlog = async (blogId) => {
      const postid = blogId;
      navigate(`/post/${postid}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
  
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchAllCategories();
      fetchAllPost();
    }, [currentPage]);
  
    
 

  return (
   <>
   <div className="sticky-top">
   <Header2 className=" " categories={category} /> {/* Pass the 'category' state to the Navbar component */}
 </div>
   
        
        <div className="_2e65b25b">
        <div className="text-center mt-4 ">
          We independently review everything we recommend. When you buy through our links, we may earn a commission.
          <Link to="/policy" style={{color : "red"}}>Learn More</Link>
        </div>
      </div>

      
      <div className="_2e65b25b">
        <div className="row">
          <div className="col-lg-12 col-sm-12 mt-3 title ms">All Deals</div>
        </div>
      </div>

      <div className="_2e65b25b">
        <div className="row" style={{ marginTop: '30px' }}>
       
          {allpost.length > 0 ? (
            allpost.map((el, i) => (
              <div className="col-md-4 col-lg-4 col-sm-12 marbot" key={el.id}>
               <div className='hugo'>   
              <img
                    className="card-img-top"
                    src={  backendurl + `/uploads/${el.image}`}
                    alt={el.title}
                    style={{ width: '413px', height: '292px' }}
                    onClick={() => handleShowFullBlog(el.id)}
                  />
                  <div className="card-body">
                    <h5 className="hover catemargin" onClick={() => handleShowFullBlog(el.id)}>{el.title}</h5>
                    <h1 className="cateMishort date khk">UPDATED {moment(el.date).format('DD-MM-YYYY')}</h1>
                    <p className="  cateMishort" >{el.shortdesc}</p>
                  </div>
                  </div> 
             
              </div>
            ))
          ) : null}

        <div className="_2e65b25b">
        <div className="row">
          <div className="col-12 d-flex justify-content-center mt-5">
            <button
              className="btn btn-light me-2"
              disabled={currentPage <= 1}
              onClick={handleFirstPage}
            >
              First
            </button>
            <button
              className="btn btn-light me-2"
              disabled={currentPage <= 1}
              onClick={handlePreviousPage}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                className={`btn btn-light me-2 ${pageNumber === currentPage ? 'active' : ''}`}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="btn btn-light me-2"
              disabled={currentPage >= totalPages}
              onClick={handleNextPage}
            >
              Next
            </button>
            <button
              className="btn btn-light me-2"
              disabled={currentPage >= totalPages}
              onClick={handleLastPage}
            >
              Last
            </button>
          </div>
        </div>
        
      </div>
       
        </div>
      </div>
   <div style={{ marginTop: '20px'}}>
         <Footer />
        </div>
   </>
  )
}

export  { TotalCardPost } ;
