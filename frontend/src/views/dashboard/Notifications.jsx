import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const user_id = useUserData()?.user_id;

  const fetchNotifications = async () => {
    const res = await apiInstance.get(
      `author/dashboard/notification-list/${user_id}/`
    );
    setNotifications(res?.data);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markNotificationAsSeen = async (id) => {
    try {
      const res = await apiInstance.put(
        `author/dashboard/notification-mark-seen/`,
        {
          notification_id: id,
        }
      );
      if (res.status === 200) {
        fetchNotifications();
        Toast("success", "Notification Marked as seen");
      }
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
              <div className="card mb-4">
                <div className="card-header d-lg-flex align-items-center justify-content-between">
                  <div className="mb-3 mb-lg-0">
                    <h3 className="mb-0">Notifications</h3>
                    <span>Manage all your notifications from here</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    {notifications && notifications.length > 0 ? (
                      notifications?.map((notification) => (
                        <li className="list-group-item p-4 shadow rounded-3 mt-4">
                          <div className="d-flex">
                            <div className="ms-3 mt-2">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <p className="mb-0 fw-bold">
                                    {notification.type === "Like" && (
                                      <>
                                        <h4>
                                          <i className="fas fa-thumbs-up text-primary "></i>{" "}
                                          New Like
                                        </h4>
                                        <p className="mt-3">
                                          Someone just liked your post{" "}
                                          <b>{notification?.post?.title}</b>
                                        </p>
                                      </>
                                    )}

                                    {notification.type === "Comment" && (
                                      <>
                                        <h4>
                                          <i className="bi bi-chat-left-quote-fill text-success "></i>{" "}
                                          New Comment
                                        </h4>
                                        <p className="mt-3">
                                          Someone just commented your post{" "}
                                          <b>{notification?.post?.title}</b>
                                        </p>
                                      </>
                                    )}

                                    {notification.type === "Bookmark" && (
                                      <>
                                        <h4>
                                          <i className="fas fa-bookmark text-danger "></i>{" "}
                                          New Bookmark
                                        </h4>
                                        <p className="mt-3">
                                          Someone just bookmarked your post{" "}
                                          <b>{notification?.post?.title}</b>
                                        </p>
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="mt-1">
                                  <span className="me-2 fw-bold">
                                    Date:{" "}
                                    <span className="fw-light">
                                      {Moment(notification?.date)}
                                    </span>
                                  </span>
                                </p>
                                <p>
                                  <button
                                    onClick={() =>
                                      markNotificationAsSeen(notification?.id)
                                    }
                                    class="btn btn-outline-secondary"
                                    type="button"
                                  >
                                    Mark as Seen{" "}
                                    <i className="fas fa-check"></i>
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    ) : (
                      <div>
                        <h3 className="text-center">No Notifications</h3>
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

export default Notifications;
