import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate } from "react-router-dom";

import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import Swal from "sweetalert2";

function AddPost() {
  // STATES
  const [post, setPost] = useState({
    image: "",
    title: "",
    description: "",
    category: parseInt(""),
    tags: "",
    status: "Active",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userId = useUserData()?.user_id;
  const navigate = useNavigate();

  const fetchCategory = async () => {
    try {
      const response = await apiInstance.get(`post/category/list/`);
      console.log(response.data);
      setCategoryList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const createPost = async (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    setPost({
      ...post,
      image: {
        file: event.target.files[0],
        preview: reader.result,
      },
    });
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };


  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (
        !post.image.file ||
        !post.title ||
        !post.description ||
        !post.category ||
        !post.tags
      ) {
        Toast("error", "All fields are required");
        setIsLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("image", post.image.file);
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("category", post.category);
      formData.append("tags", post.tags);
      formData.append("status", post.status);
      formData.append("user_id", userId);
      const response = await apiInstance.post(
        "author/dashboard/post-create/",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Post created successfully",
      });
      navigate("/posts/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row mt-0 mt-md-4">
            <div className="col-lg-12 col-md-8 col-12">
              <>
                <section className="py-4 py-lg-6 bg-primary rounded-3">
                  <div className="container">
                    <div className="row">
                      <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                        <div className="d-lg-flex align-items-center justify-content-between">
                          <div className="mb-4 mb-lg-0">
                            <h1 className="text-white mb-1">
                              Create Blog Post
                            </h1>
                            <p className="mb-0 text-white lead">
                              Use the article builder below to write your
                              article.
                            </p>
                          </div>
                          <div>
                            <Link
                              to="/posts/"
                              className="btn"
                              style={{ backgroundColor: "white" }}
                            >
                              {" "}
                              <i className="fas fa-arrow-left"></i> Back to
                              Posts
                            </Link>
                            <a
                              href="instructor-posts.html"
                              className="btn btn-dark ms-2"
                            >
                              Save Changes{" "}
                              <i className="fas fa-check-circle"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <form onSubmit={handlePostSubmit} className="pb-8 mt-5">
                  <div className="card mb-3">
                    {/* Basic Info Section */}
                    <div className="card-header border-bottom px-4 py-3">
                      <h4 className="mb-0">Basic Information</h4>
                    </div>
                    <div className="card-body">
                      <label htmlFor="postTHumbnail" className="form-label">
                        Preview
                      </label>
                      <img
                        style={{
                          width: "100%",
                          height: "330px",
                          objectFit: "contain",
                          borderRadius: "10px",
                        }}
                        className="mb-4"
                        src={
                          imagePreview ||
                          "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                        }
                        alt=""
                      />
                      <div className="mb-3">
                        <label htmlFor="postTHumbnail" className="form-label">
                          Thumbnail
                        </label>
                        <input
                          id="postTHumbnail"
                          className="form-control"
                          type="file"
                          name="file"
                          onChange={handleFileChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                          className="form-control"
                          type="text"
                          name="title"
                          placeholder="Title..."
                          onChange={createPost}
                        />
                        <small>Write a 60 character post title.</small>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Posts category</label>
                        <select
                          className="form-select"
                          onChange={createPost}
                          name="category"
                        >
                          <option value="">-------------</option>
                          {categoryList &&
                            categoryList.map((category, index) => (
                              <option key={index} value={category.id}>
                                {category.title}
                              </option>
                            ))}
                        </select>
                        <small>
                          Help people find your posts by choosing categories
                          that represent your post.
                        </small>
                      </div>

                      <div className="mb-3">
                        <label className="form-label">Post Description</label>
                        <textarea
                          name="description"
                          className="form-control"
                          id=""
                          cols="30"
                          rows="10"
                          onChange={createPost}
                        ></textarea>
                        <small>A brief summary of your posts.</small>
                      </div>
                      <div>
                        <label htmlFor="" className="form-label">
                          Status
                        </label>
                        <select
                          className="form-select"
                          onChange={createPost}
                          name="status"
                        >
                          <option value="Active">Active</option>
                          <option value="Draft">Draft</option>
                          <option value="Disabled">Disabled</option>
                        </select>
                        <small>
                          Choose if you want to publish this post or save it as
                          draft.
                        </small>
                      </div>
                      <label className="form-label">Tag</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="health, medicine, fitness"
                        name="tags"
                        onChange={createPost}
                      />
                    </div>
                  </div>

                  {isLoading ? (
                    <>
                      <button
                        disabled
                        className="btn btn-lg btn-secondary w-100 mt-2"
                        type="submit"
                      >
                        Creating Post <i className="fas fa-spinner fa-spin"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-lg btn-success w-100 mt-2"
                        type="submit"
                      >
                        Create Post <i className="fas fa-check-circle"></i>
                      </button>
                    </>
                  )}
                </form>
              </>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AddPost;
