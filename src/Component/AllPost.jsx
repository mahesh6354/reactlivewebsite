import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./alllpost.css";
import "./home.css";
import moment from "moment";
import { Footer } from "./Footer";
import { Header2 } from "./Header2";
import backendurl from "../Backend";

const AllPost = () => {
  const [allpost, setAllPost] = useState([]);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(backendurl + "/getactivecategory");
      setCategory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllPost = async () => {
    try {
      const res = await axios.get(backendurl + "/post", {
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

  const handleButtonClick = (id) => {
    navigate(`/Category/${id}`);
  };

  const handleShowFullBlog = (blogId) => {
    navigate(`/post/${blogId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchAllPost();
    fetchAllCategories();
  }, [currentPage]);

  return (
    <>
      <div className="sticky-top">
        <Header2 className="my-5 " categories={category} />{" "}
        {/* Pass the 'category' state to the Navbar component */}
      </div>

      <div className="_2e65b25b">
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <p className="ii text-center mt-4 font-weight-bold">
              We independently review everything we recommend. When you buy
              through our links, we may earn a commission.
              <Link to="/policy" style={{ color: "red" }}>
                Learn More
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="_2e65b25b">
        <div className="row">
          <div className="col-lg-12 col-sm-12 title">All blog posts</div>
        </div>
      </div>

      {allpost.map((el) => (
        <div className="_2e65b25b">
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <article className="_1b3715bf">
                <div className="_282e2639">
                  <img
                    className="width"
                    src={backendurl + `/uploads/${el.image}`}
                    alt=""
                    onClick={() => handleShowFullBlog(el.id)}
                  />
                </div>
              </article>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
              <div className="_8cee0047">
                <p
                  className="catemargin"
                  onClick={() => handleShowFullBlog(el.id)}
                >
                  {" "}
                  {el.title}
                </p>
                <p className="d5fb4b49">
                  <time className="_0b184eb5 ">
                    UPDATED {moment(el.date?.toString()).format("DD-MM-YYYY")}{" "}
                  </time>
                  <p className="authorfs"> by {el.author} </p>
                  <p
                    className="shortdesc1 fidae"
                    onClick={() => handleShowFullBlog(el.id)}
                  >
                    {el.shortdesc}
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`btn btn-light me-2 ${
                    pageNumber === currentPage ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}
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
      <div style={{ marginTop: "20px" }}>
        <Footer />
      </div>
    </>
  );
};

export { AllPost };
