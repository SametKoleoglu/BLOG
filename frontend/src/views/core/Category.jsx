import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await apiInstance.get("/post/category/list/");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

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
              <h2 className="text-start d-block mt-1">
                <i className="bi bi-grid-fill"></i> LifeStyle (16 Articles)
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-0 mt-4">
        <div className="container">
          <div className="row">
            {loading && (
              <div className="col-sm-12 col-lg-12">
                <div className="card mb-4">
                  <div className="card-body d-flex justify-content-center align-items-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!loading &&
              categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <div className="col-sm-6 col-lg-3" key={index}>
                  <div className="card mb-4">
                    <div className="card-fold position-relative">
                      <img
                        className="card-img"
                        style={{
                          width: "100%",
                          height: "160px",
                          objectFit: "contain",
                        }}
                        src={category.image}
                        alt="Card image"
                      />
                    </div>
                    <div className="card-body px-3 pt-3">
                      <h4 className="card-title">
                        <a
                          href="post-single.html"
                          className="btn-link text-reset stretched-link fw-bold text-decoration-none"
                        >
                          {category.title}
                        </a>
                      </h4>
                      {/* CATEGORY DETAILS */}
                      <div className="mt-4">
                        <p className="card-text">Post Count : <b> {category.post_count}</b></p>
                        <p>Slug : <b>{category.slug}</b></p>
                      </div>
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

export default Category;
