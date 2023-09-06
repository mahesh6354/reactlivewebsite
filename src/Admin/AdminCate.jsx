import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './main.css';
import moment from 'moment';
import backendurl from '../Backend';

const AdminCate = () => {
  const [allpost, setAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

 

  const fetchAllPost = async () => {
    try {
      const res = await axios.get(backendurl + '/admincate', {
        params: {
          page: currentPage,
          pageSize: 12,
        },
      });
      setAllPost(res.data.results);
      setTotalPages(res.data.totalPages);
    } catch (Err) {
      // console.log(Err);
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

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      await axios.delete(backendurl + `/admincate/${id}`);
      window.location.reload();
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, [currentPage]);

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
                    <h1 style={{ textAlign: '-webkit-center' }}>Welcome To Category Page</h1>
                    <br />
                    <br />
                    <div className="title">
                      <div
                        className="d-flex flex-wrap justify-content-between align-items-center"
                        style={{ marginTop: '10px' }}
                      >
                        <h1 className="dis">Category</h1>
                        <button className="btn btn-success">
                          <Link className="bt" to="/category">
                            <span className="plus-icon">➕</span>
                          </Link>
                        </button>
                      </div>
                    </div>                   
                  </div>
                  <div className="col-lg-12">
                  <table className="table">
                  <thead>
                    <tr>
                      <th className='font'>Category ID</th>
                      <th className='font'>Category Name</th>
                      <th className='font'>Category Parent ID</th>
                      <th className='font'>Home</th>
                      <th className='font'>Date</th>
                      <th className='font'>Operation</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {allpost.map((el, i) => (
                      <tr key={el.id}>
                        <td>{el.id}</td>
                        <td>{el.title}</td>
                        <td>{el.parentid}</td>
                        <td>{el.catecheck}</td>
                        <td>{moment(el.createdAt).format('YYYY-MM-DD')}</td>
                        <td className='font'>
                          <button className="font btn btn-secondary">
                            <Link className="bt" to={`/edit/${el.id}`}>
                              Update
                            </Link>
                          </button>
                          &nbsp; <button onClick={() => handleDelete(el.id)} className="font btn btn-primary">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                  
                  </div>
                </div>

                <div className="row">
                <div className="col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center mt-5">
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
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => {
                      // Calculate the range of pagination buttons to display
                      const displayRange = {
                        min: Math.max(1, currentPage - 2),
                        max: Math.min(totalPages, currentPage + 2)
                      };

                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= displayRange.min && pageNumber <= displayRange.max)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            className={`custom-pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
                            onClick={() => setCurrentPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === displayRange.min - 1 && currentPage - displayRange.min > 2) ||
                        (pageNumber === displayRange.max + 1 && displayRange.max - currentPage > 2)
                      ) {
                        return (
                          <span key={pageNumber}>...</span>
                        );
                      } else if (
                        (pageNumber === currentPage - 1 && currentPage - displayRange.min > 2) ||
                        (pageNumber === currentPage + 1 && displayRange.max - currentPage > 2)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            className="custom-pagination-button ellipsis"
                            disabled
                          >
                            ...
                          </button>
                        );
                      }
                      return null;
                    })}
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
    </>
  );
};

export { AdminCate };
