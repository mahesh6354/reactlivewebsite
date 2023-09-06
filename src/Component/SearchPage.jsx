import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './home.css';
import { Navbar2 } from './Navbar2';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Footer } from '../Component/Footer';
import { ErrorPage } from './ErrorPage';
import backendurl from '../Backend';

const SearchPage = () => {
  const [category, setCategory] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm1 = searchParams.get('q');
  const [error, setError] = useState(null);
  // Pagination of the search
  const [relatedblog, setRelatedBLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigator = useNavigate();

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(backendurl + '/getactivecategory');
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async () => {
    console.log('Search term:', searchTerm1);
    try {
      const res = await axios.get( backendurl + `/searchpage?q=${encodeURIComponent(searchTerm1)}`, {
        params: {
          page: currentPage,
          pageSize: 3, // Update pageSize to 4
        },
      });

      if (res.data.results.length === 0) {
        setError('No related blog posts found'); // Set error message if there are no related posts
      } else {
        setRelatedBLog(res.data.results);
        setTotalPages(res.data.totalPages);
        setError(null); // Clear error if there are related posts
      }
    } catch (err) {
      console.log(err);
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

  const handleButtonClick = (id) => {
    const Cateid = id;
    console.log('category id is the', Cateid);

    navigator(`/categoryPage/${Cateid}`);
  };

  
  const handleShowFullBlog = async(blogId) => {
    const postid = blogId ; 
    console.log("post id is the", postid)
    navigator(`/selectpost/${postid}`)
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  
  useEffect(() => {
    fetchAllCategories();
    handleSearch();
  }, [currentPage, searchTerm1]);

  if (error) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }


  return (
    <>
      <Navbar2 />
      <div>
      <div style={{backgroundColor: "#9f9c9c;"}}>
          <div className="">
            <div className="row">
            <div className="col-1"></div>
              <div className="col-10">
           
                <div>
                  {/* Render the categories in the header */}
                  <ul className="nav" style={{ gap: "9px" , justifyContent : "center" }}>
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
        <br />
        <div className="container">
        <div className="text-center font-size">
          We independently review everything we recommend. When you buy through our links, we may earn a commission.
          <Link to="/policy">Learn More</Link>
        </div>
      </div>
        <br />
      
        <div>
        <div className="container">
          <div className="row">
          
            <div className="col-12">
              <h1 className='title4'>Results For "{searchTerm1}"</h1>
            </div>
  
          </div>
          <div className="row ">
          {relatedblog.length > 0 ? (
            relatedblog.map((el, i) => (
              <div className="col-md-4 marbot" key={el.id}>
                <div className="">
                  <img className="card-img-top" src={backendurl + `/uploads/${el.image}`} alt={el.title} style={{ width: '413px', height: '292px' }} onClick={() => handleShowFullBlog(el.id)} />
                  <div className="card-body">
                  <h5 className="card-title hover text tit catemargin">{el.title}</h5>
                  <h1 className='cateMishort date'>UPDATED {moment(el.date?.toString()).format('DD-MM-YYYY')}</h1>
                  <h1 className=' authorfs'>By {el.author}</h1>
                 
                  <p className='shortdesc xz'>{el.shortdesc}</p>
                    </div>
                </div>
              </div>
            ))
          ) : null}
          
          </div>

          <br />
       <div className="container">
          <div className="row">
          <div className="col-lg-12 col-sm-12 pp justify-content-center align-items-center gap-3">
          <button className="btn btn-lg btn-light" disabled={currentPage <= 1} onClick={handleFirstPage}>
            First
          </button>
          <button className="btn btn-lg btn-light" disabled={currentPage <= 1} onClick={handlePreviousPage}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              className={`btn btn-lg btn-light ${pageNumber === currentPage ? 'active' : ''}`}
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button className="btn btn-lg btn-light" disabled={currentPage >= totalPages} onClick={handleNextPage}>
            Next
          </button>
          <button className="btn btn-lg btn-light" disabled={currentPage >= totalPages} onClick={handleLastPage}>
            Last
          </button>
        </div>
        </div>
        </div>
        </div> 
       </div>
      </div>
      <div style={{ marginTop: '43px' }}>
        <Footer />
      </div>
    </>
  );
};

export { SearchPage };
