import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";
import useUserData from "../../plugin/useUserData";

function Detail() {
  const param = useParams();
  const userId = useUserData()?.user_id;

  // STATES
  const [post, setPost] = useState([]);
  const [tags, setTags] = useState([]);
  const [createComment, setCreateComment] = useState({
    full_name: "",
    email: "",
    comment: "",
  });

  const fetchPost = async () => {
    const response = await apiInstance.get(`/post/detail/${param.slug}/`);
    setPost(response.data);

    const tagArray = response?.data?.tags?.split(",");
    setTags(tagArray);
  };

  const handleCreateComment = async (e) => {
    setCreateComment({
      ...createComment,
      [e.target.name]: e.target.value,
    });
    console.log(createComment);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const json = {
      post_id: post?.id,
      name: createComment.full_name,
      email: createComment.email,
      comment: createComment.comment,
    };

    const response = await apiInstance.post("post/comment-post/", json);
    console.log(response);
    Toast("success", "Commented Successfully");
    fetchPost();

    setCreateComment({
      full_name: "",
      email: "",
      comment: "",
    });
  };

  const handleLikePost = async () => {
    const json = {
      user_id: userId,
      post_id: post?.id,
    };

    console.log(json);

    const response = await apiInstance.post("post/like-post/", json);
    console.log(response.data);
    Toast("success", response.data.message);
    fetchPost();
  };

  const handleBookmarkPost = async () => {
    const json = {
      user_id: userId,
      post_id: post?.id,
    };

    const response = await apiInstance.post("post/bookmark-post/", json);
    console.log(response.data);
    Toast("success", response.data.message);
    fetchPost();
  };

  useLayoutEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <Header />
      <section className="my-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Link to={"/category/"} className="badge bg-danger mb-2 text-decoration-none">
                <i className="large fw-bold text-light">{post?.category?.title}</i>                
              </Link>
              <h1 className="text-center">{post.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-0">
        <div className="container position-relative" data-sticky-container="">
          <div className="row">
            <div className="col-lg-2">
              <div
                className="text-start text-lg-center mb-5"
                data-sticky=""
                data-margin-top={80}
                data-sticky-for={991}
              >
                <div className="position-relative">
                  <div className="avatar avatar-xl">
                    <img
                      className="avatar-img"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                      src={post?.profile?.image}
                      alt="avatar"
                    />
                  </div>
                  <a
                    href="#"
                    className="h5 fw-bold text-dark text-decoration-none mt-2 mb-0 d-block"
                  >
                    {post?.profile?.full_name}
                  </a>
                  <p>{post?.profile?.bio || " "}</p>
                </div>

                <hr className="d-none d-lg-block " />

                <ul className="list-inline list-unstyled">
                  <li className="list-inline-item d-lg-block my-lg-2 text-start">
                    <i className="fas fa-calendar"></i> {Moment(post?.date)}
                  </li>
                  {/* <li className="list-inline-item d-lg-block my-lg-2 text-start">
                    <i className="fas fa-clock"></i> 5 min read
                  </li> */}
                  <li className="list-inline-item d-lg-block my-lg-2 text-start">
                    <a href="#" className="text-body">
                      <i className="fas fa-heart me-1" />
                    </a>
                    {post?.likes?.length || 0} Likes
                  </li>
                  <li className="list-inline-item d-lg-block my-lg-2 text-start">
                    <i className="fas fa-eye" />
                    {post?.view} Views
                  </li>
                </ul>
                {/* Tags */}
                <ul className="list-inline text-primary-hover mt-0 mt-lg-3 text-start">
                  {tags?.map((tag, index) => (
                    <li className="list-inline-item" key={index}>
                      <a
                        className="text-body text-decoration-none fw-bold"
                        href="#"
                      >
                        #{tag}
                      </a>
                    </li>
                  ))}
                </ul>

                <button onClick={handleLikePost} className="btn btn-success">
                  <i className="fas fa-thumbs-up me-2"></i>
                  {post?.likes?.length}
                </button>

                <button onClick={handleBookmarkPost} className="btn btn-primary ms-2">
                  <i className="fas fa-bookmark"></i>
                </button>
              </div>
            </div>
            {/* Left sidebar END */}
            {/* Main Content START */}
            <div className="col-lg-10 mb-5">
              <p>{post?.description}</p>

              <hr />

              <div className="mt-5">
                <h3>
                  {post?.comments?.length == 1
                    ? "1 comment"
                    : `${post?.comments?.length} comments`}
                </h3>

                {post?.comments?.map((comment, index) => (
                  <div className="my-4 d-flex bg-light p-3 mb-3 rounded">
                    {/* <img
                    className="avatar avatar-md rounded-circle float-start me-3"
                    src="https://img.freepik.com/free-photo/front-portrait-woman-with-beauty-face_186202-6146.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710979200&semt=ais"
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    alt="avatar"
                  /> */}
                    <div>
                      <div className="mb-2">
                        <h5 className="m-0">{comment?.name}</h5>
                        <span className="me-3 small">
                          {Moment(comment?.date)}.
                        </span>
                      </div>
                      <p className="fw-bold">{comment?.comment}. </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Comments END */}
              {/* Reply START */}
              <div className="bg-light p-3 rounded">
                <h3 className="fw-bold">Leave a reply</h3>
                <small>
                  Your email address will not be published. Required fields are
                  marked *
                </small>
                <form className="row g-3 mt-2" onSubmit={handleCommentSubmit}>
                  <div className="col-md-6">
                    <label className="form-label">Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Full Name"
                      onChange={handleCreateComment}
                      value={createComment.full_name}
                      name="full_name"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={createComment.email}
                      aria-label="Email"
                      name="email"
                      onChange={handleCreateComment}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Write Comment *</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      aria-label="Write Comment"
                      value={createComment.comment}
                      name="comment"
                      onChange={handleCreateComment}
                    />
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      Post comment <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Detail;
