import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";

function Comments() {
  const user_id = useUserData()?.user_id;

  //   STATES
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");

  const fetchComments = async () => {
    await apiInstance
      .get(`author/dashboard/comment-list/${user_id}/`)
      .then((res) => {
        setComments(res?.data);
      });
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleReply = async (comment_id) => {
    try {
      const res = await apiInstance.post(`author/dashboard/reply-comment/`, {
        comment_id: comment_id,
        reply: reply,
      });
      console.log(res.data);
      fetchComments();
      Toast("success", "Reply Sent Successfully (:");
      setReply("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <section className="pt-5 pb-5" style={{ minHeight: "70vh" }}>
        <div className="container">
          <div className="row mt-0 mt-md-4">
            <div className="col-lg-12 col-md-8 col-12">
              {/* Card */}
              <div className="card mb-4">
                {/* Card header */}
                <div className="card-header d-lg-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Comments</h3>
                    <span>
                      You have full control to manage your own comments.
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div className="card-body">
                  {/* List group */}
                  <ul className="list-group list-group-flush">
                    {/* List group item */}
                    {comments && comments.length > 0 ? (
                      comments.map((comment, index) => (
                        <li className="list-group-item p-4 mb-4 shadow rounded-3">
                          <div className="d-flex">
                            <div className="ms-3 mt-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h4 className="mb-0">{comment?.name}</h4>
                                  <span>{Moment(comment?.date)}</span>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="mt-2">
                                  <span className="fw-bold me-2">
                                    Comment{" "}
                                    <i className="fas fa-arrow-right"></i>
                                  </span>
                                  {comment?.comment}
                                </p>
                                <p className="mt-2">
                                  <span className="fw-bold me-2">
                                    Response{" "}
                                    <i className="fas fa-arrow-right"></i>
                                  </span>
                                  {comment?.reply || "No Reply"}
                                </p>
                                <p>
                                  <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapseExample${comment?.id.toString()}`}
                                    aria-expanded="false"
                                    aria-controls={`collapseExample${comment?.id.toString()}`}
                                  >
                                    Send Response
                                  </button>
                                </p>
                                <div
                                  class="collapse"
                                  id={`collapseExample${comment?.id.toString()}`}
                                >
                                  <div class="card card-body">
                                    <div>
                                      <div class="mb-3">
                                        <label
                                          for="exampleInputEmail1"
                                          class="form-label"
                                        >
                                          Write Response
                                        </label>
                                        <textarea
                                          onChange={(e) =>
                                            setReply(e.target.value)
                                          }
                                          value={reply}
                                          name=""
                                          id=""
                                          cols="30"
                                          className="form-control"
                                          rows="4"
                                        ></textarea>
                                      </div>

                                      <button
                                        onClick={() => handleReply(comment?.id)}
                                        type="button"
                                        class="btn btn-primary"
                                      >
                                        Send Response{" "}
                                        <i className="fas fa-paper-plane"> </i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div>
                        <h3 className="text-center">No comments</h3>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Comments;
