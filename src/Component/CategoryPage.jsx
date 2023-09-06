import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Footer } from '../Component/Footer';
import './home.css';
import { ErrorPage } from './ErrorPage';
import moment from 'moment';
import { Header2 } from './Header2';
import backendurl from '../Backend';

const CategoryPage = () => {
  
  const { id } = useParams();
  
  const [category, setCategory] = useState([]);
  
  const [relatedblog, setRelatedBLog] = useState([]);
  const [error, setError] = useState(null);
  const [subcategoryrelatedpost, setSubcategoryRelatedPost] = useState([]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(backendurl + '/getactivecategory');
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSpecificPosts = async () => {
    try {
      const res = await axios.get(backendurl + `/categoryPage/${id}`, {
        params: {
          page: currentPage, // Use 'page' instead of 'pageNumber'
          pageSize: 3, // Fixed the page size to 3 per page
        },
      });
  
      if (res.data.results.length === 0) {
        setError('No related blog posts found');
      } else {
        setRelatedBLog(res.data.results);
        setTotalPages(res.data.totalPages);
        setError(null);
      }
    } catch (err) {
      console.log(err);
      setError('Error loading posts');
    }
  };

  const fetchCategoryRelatedSubcategory = async () => {
    try {
      const response = await axios.get(backendurl + `/categoryRelatedSubcategoryPost/${id}`);
      if (response.data) {
        setSubcategoryRelatedPost(response.data);
      } else {
        setSubcategoryRelatedPost([]); // Clear the subcategory related posts
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(1);
    
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPage(currentPage - 1);
    }
    
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentPage(currentPage + 1);
    }
    
  };
  
  const handleLastPage = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(totalPages);
   
  };

  const handleShowFullBlog = async (blogId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const postid = blogId;
    navigate(`/post/${postid}`);

  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSubcategoryRelatedPost([]);
    fetchAllCategories();
    fetchSpecificPosts();
    fetchCategoryRelatedSubcategory();
  }, [id, currentPage]);

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <>
    <div className="sticky-top">
    <Header2 className="my-5 " categories={category} /> {/* Pass the 'category' state to the Navbar component */}
  </div>
      <div className="_2e65b25b">
      <div className="col-lg-12 col-md-12 col-sm-12 mt-3 ">
      <p className="ii text-center mt-4 font-weight-bold">
      We independently review everything we recommend. When you buy through our links, we may earn a commission.
      <Link to="/policy" style={{ color: 'red' }}>Learn More</Link>
    </p>
      </div>
    </div>


        <div className="_2e65b25b ">
          <div className="row">
          <h1 className="tcolor headingfs eew">All Post</h1>
            {
              relatedblog.length > 0 ? (
              relatedblog.map((el, i) => (
                <div className="col-lg-4 col-md-4 col-sm-12 marbot" key={el.id}>
                  <div className="">
                    <img
                      className="card-img-top"
                      src={backendurl + `/uploads/${el.image}`}
                      alt={el.title}
                      style={{ height: '292px' }}
                      onClick={() => handleShowFullBlog(el.id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title1 text hover qq catemargin"  onClick={() => handleShowFullBlog(el.id)}>{el.title}</h5>
                      <h1 className="cateMishort date">UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')}</h1>
                      <h1 className="authorfs">By {el.author}</h1>
                      <p className="cateMishort ">{el.shortdesc}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>

          <div className="_2e65b25b-wrapper">
          </div>
         
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
        
        <br />
        <div>
          <div className="_2e65b25b ">
            <div className="row">
              <div className="col-lg-12">
                <h1 className="title4 color">Related Post</h1>
              </div>
            </div>
            <div className="row">
              {subcategoryrelatedpost.length > 0 ? (
                subcategoryrelatedpost.map((el, i) => (
                  <div className="col-lg-4 col-md-4  col-sm-6 marbot" key={el.id}>
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
                          className="mt-3 card-title1 text hover qq catemargins"
                          onClick={() => handleShowFullBlog(el.id)}
                        >
                          {el.title}
                        </h5>
                        <h1 className="cateMishort date">UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')}</h1>
                        <h1 className='authorfs'> by {el.author}</h1>
                        
                        
                      </div>
                    </div>
                  </div>
                ))
              ) : null}
            </div>
          </div>
        </div>
   
      <div><Footer /></div>
      
    </>
  );
};

export { CategoryPage };
