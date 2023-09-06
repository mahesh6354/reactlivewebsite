import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from './Navbar';
import { Footer } from "../Component/Footer"
import "./categorypage.css"
import moment from 'moment';
import { ErrorPage } from './ErrorPage';
import './home.css'
import backendurl from '../Backend';

const SubcategoryPage = () => {
    const [category, setCategory] = useState([]);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const navigator = useNavigate()
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
            const res = await axios.get(backendurl + `/subcategoryPage/${id}`);
            if (res.status === 200) {
            setPosts(res.data);
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
    

      useEffect(() => {
        fetchAllCategories();
        fetchSpecificPosts();
      }, [id]);

      const handleSubClick = (id) => {
        const subcategoryId = id;
        console.log("subcategory id is", subcategoryId);
        // Do whatever you need with the subcategory ID
    
        navigator(`/subcategoryPage/${subcategoryId}`);
      };

      if (error) {
        return (
          <div>
          <ErrorPage />
           
          </div>
        );
      }
      
      
  return (
    <>
      <Navbar />
      <div style={{ marginTop: '40px' }}>
        <div style={{ backgroundColor: '#9f9c9c;' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
               
                <div>
                  <ul className="nav" style={{ gap: '9px' }}>
                    <li className="nav-item _61361b4c">
                      <Link to="/">Home</Link>
                    </li>
                    {category.map((elem) => (
                      <li className="nav-item _61361b4c" key={elem.id}>
                        {elem.subcategorylist.length > 0 ? (
                          <div className="dropdown a6e85973">
                            <button
                              className="btn main-tag a6e85973"
                              type="button"
                              id={`dropdown-${elem.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              {elem.name}
                            </button>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`dropdown-${elem.id}`}
                            >
                              {elem.subcategorylist.map((item) => (
                                <li key={item.id}>
                                  <button
                                    className="dropdown-item .dropdown-item1"
                                   onClick={() => handleSubClick(item.id)}
                                    >
                                    {item.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div>
                            
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
        <div>
        <div className="container">
         <div className="row">
          <div className="col-12">
          <h1 className='title4  '>All Post</h1>
          </div>
         </div>
        </div>
        {posts.length > 0 ? (
            posts.map((el, i) => (
              
              <div className="container" key={el.id}>
                 <div className="row">
                 <div className="col-3"></div>
                 <div className="col-6">
              
              <br />
             
                <div className="row">{/* Place any content for the row here */}
                <h1 className='  '> {el.title}</h1>
               
                <br />
                <div className="img">
                  <img className="img" src={ backendurl + `/uploads/${el.image}`} alt="mahesh" />
                </div>
                <br />
                <div className="sat">
                <p className='shortdesc'> {el.shortdesc}</p>
              </div>
              <br />
              </div>
               </div>
               <div className="col-3"></div>
              </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
          
        </div>
      </div>
        </div>
      </div>
      <Footer />
    </>
    )
}

export  {SubcategoryPage};
