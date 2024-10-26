import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";

import apiInstance from "../../utils/axios";
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";

function Index() {
  // STATES
  const [trendPosts, setTrendPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchPosts = async () => {
    try {
      const response_trend_posts = await apiInstance.get(
        "post/trend-posts-list/"
      );
      const response_latest_posts = await apiInstance.get("post/list/");
      const response_category = await apiInstance.get("post/category/list/");
      setTrendPosts(response_trend_posts.data);
      setCategory(response_category.data);
      setLatestPosts(response_latest_posts.data);
    } catch (error) {
      console.log("Hata Oluştu !");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const postItems = trendPosts?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(trendPosts?.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <Header />
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col">
              <a href="#" className="d-block card-img-flash">
                <img src="assets/images/adv-3.png" alt="" />
              </a>
              <h2 className="text-start d-block mt-1">Trending Posts 🔥</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-0">
        <div className="container">
          <div className="row">
            {postItems.map((post) => (
              <div className="col-sm-6 col-lg-3" key={post?.id}>
                <div className="card mb-4 h-80">
                  <div className="card-fold position-relative">
                    <img
                      className="card-img img-fluid"
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "contain",
                      }}
                      src={post?.image}
                      alt="Card image"
                    />
                  </div>
                  <div className="card-body px-3 pt-3">
                    <h4 className="card-title">
                      <Link
                        to={post?.slug}
                        className="btn-link text-reset stretched-link fw-bold text-decoration-none"
                      >
                        {post?.title.length > 20
                          ? post?.title.slice(0, 20) + "..."
                          : post?.title}
                      </Link>
                    </h4>
                    <button style={{ border: "none", background: "none" }}>
                      <i className="fas fa-bookmark text-danger"></i>
                    </button>
                    <button style={{ border: "none", background: "none" }}>
                      <i className="fas fa-thumbs-up text-primary"></i>
                    </button>

                    <ul
                      className="mt-3 list-style-none"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="text-dark text-decoration-none">
                          <i className="fas fa-user"></i>{" "}
                          {post?.profile?.full_name}
                        </a>
                      </li>
                      <li className="mt-2">
                        <i className="fas fa-calendar"></i> {Moment(post?.date)}
                      </li>
                      <li className="mt-2">
                        <i className="fas fa-eye"></i> {post?.view} Views
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav className="d-flex mt-2">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link text-dark fw-bold me-1 rounded"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="fas fa-arrow-left me-2" />
                  Previous
                </button>
              </li>
            </ul>
            <ul className="pagination">
              {pageNumbers?.map((number) => (
                <li
                  key={1}
                  className={`page-item ${currentPage === number ? "active" : ""}`}
                >
                  <button
                    className="page-link text-dark fw-bold rounded"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link text-dark fw-bold ms-1 rounded"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                  <i className="fas fa-arrow-right ms-3 " />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="bg-light pt-5 pb-5 mb-3 mt-3">
        <div className="container">
          <div className="row g-0">
            <div className="col-12 ">
              <div className="mb-4">
                <h2>Categories</h2>
              </div>
              <div className="d-flex flex-wrap gap-5">
                {category?.map((cat) => (
                  <div className="mt-2">
                    <div className="card bg-transparent">
                      <img
                        className="card-img"
                        src={cat?.image}
                        style={{
                          width: "150px",
                          height: "80px",
                          objectFit: "contain",
                        }}
                        alt="card image"
                      />
                      <div className="d-flex flex-column align-items-center mt-3 pb-2">
                        <h5 className="mb-0">{cat?.title}</h5>
                        <small>{cat?.post_count || 0} Articles</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col">
              <a href="#" className="d-block card-img-flash">
                <img src="assets/images/adv-3.png" alt="" />
              </a>
              <h2 className="text-start d-block mt-1">Latest Posts 🕒</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-0">
        <div className="container">
          <div className="row">
            {latestPosts &&
              latestPosts?.map((post, index) => (
                <div className="col-sm-6 col-lg-3">
                  <div className="card mb-4">
                    <div className="card-fold position-relative">
                      <img
                        className="card-img image-fluid"
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "contain",
                        }}
                        src={post?.image}
                        alt="Card image"
                      />
                    </div>
                    <div className="card-body px-3 pt-3">
                      <h4 className="card-title">
                        <Link to={`/${post?.slug}`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                          {post?.title.length > 20
                            ? post?.title.slice(0, 20) + "..."
                            : post?.title}
                        </Link>
                      </h4>
                      <ul
                        className="mt-3 list-style-none"
                        style={{ listStyle: "none" }}
                      >
                        <li>
                          <Link className="text-dark text-decoration-none">
                            <i className="fas fa-user"></i>{" "}
                            {post?.profile?.full_name}
                          </Link>
                        </li>
                        <li className="mt-2">
                          <i className="fas fa-calendar"></i>{" "}
                          {Moment(post?.date)}
                        </li>
                        <li className="mt-2">
                          <i className="fas fa-eye"></i> {post?.view}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <nav className="d-flex mt-2">
            <ul className="pagination">
              <li className="">
                <button className="page-link text-dark fw-bold me-1 rounded">
                  <i className="fas fa-arrow-left me-2" />
                  Previous
                </button>
              </li>
            </ul>
            <ul className="pagination">
              <li key={1} className="active">
                <button className="page-link text-dark fw-bold rounded">
                  1
                </button>
              </li>
              <li key={2} className="ms-1">
                <button className="page-link text-dark fw-bold rounded">
                  2
                </button>
              </li>
            </ul>
            <ul className="pagination">
              <li className={`totalPages`}>
                <button className="page-link text-dark fw-bold ms-1 rounded">
                  Next
                  <i className="fas fa-arrow-right ms-3 " />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Index;
