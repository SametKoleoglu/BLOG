import React, { useEffect, useState } from "react";
import { Header, Footer } from "../partials/";
import useUserData from "../../plugin/useUserData";
import apiInstance from "../../utils/axios";
import Moment from "../../plugin/Moment";
import Toast from "../../plugin/Toast";

function Profile() {
  const [profileData, setProfileData] = useState({
    image: null,
    full_name: "",
    bio: "",
    about: "",
    country: "",
  });

  const user_id = useUserData()?.user_id;
  const [imagePreview, setImagePreview] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await apiInstance.get(`user/profile/${user_id}/`);
      setProfileData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProfileData({
      ...profileData,
      [event.target.name]: file,
    });
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = async (event) => {
    const res = await apiInstance.get(`user/profile/${user_id}/`);
    const formdata = new FormData();

    if (profileData.image && profileData.image !== res.data.image) {
      formdata.append("image", profileData.image);
    }
    formdata.append("full_name", profileData.full_name);
    formdata.append("bio", profileData.bio);
    formdata.append("about", profileData.about);
    formdata.append("country", profileData.country);
    try {
      const response = await apiInstance.patch(
        `user/profile/${user_id}/`,
        formdata,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      Toast("success", "Profile updated successfully");
      console.log(response.data);
      fetchProfile();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  console.log(profileData?.full_name);

  return (
    <>
      <Header />
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row mt-0 mt-md-4">
            <div className="col-lg-12 col-md-8 col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="mb-0">Profile Details</h3>
                  <p className="mb-0">
                    You have full control to manage your own account setting.
                  </p>
                </div>
                <div className="card-body">
                  <div className="d-lg-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center mb-4 mb-lg-0">
                      <img
                        src={imagePreview || profileData.image}
                        id="img-uploaded"
                        className="avatar-xl rounded-circle"
                        alt="avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="ms-3">
                        <h4 className="mb-0">Your avatar</h4>
                        <p className="mb-0">
                          PNG or JPG no bigger than 800px wide and tall.
                        </p>
                        <input
                          type="file"
                          className="form-control mt-3"
                          name="image"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="my-5" />
                  <div>
                    <h4 className="mb-0 fw-bold">
                      <i className="fas fa-user-gear me-2"></i>Personal Details
                    </h4>
                    <p className="mb-4 mt-2">
                      Edit your personal information and address.
                    </p>
                    <div className="row gx-3">
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fname"
                          name="full_name"
                          className="form-control"
                          placeholder="What's your full name?"
                          required=""
                          value={profileData?.full_name || ""}
                          onChange={handleProfileChange}
                        />
                        <div className="invalid-feedback">
                          Please enter first name.
                        </div>
                      </div>
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="fname">
                          Bio
                        </label>
                        <input
                          type="text"
                          id="fname"
                          name="bio"
                          className="form-control"
                          placeholder="Write a catchy bio!"
                          required=""
                          value={profileData?.bio || ""}
                          onChange={handleProfileChange}
                        />
                        <div className="invalid-feedback">
                          Please enter first name.
                        </div>
                      </div>
                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="lname">
                          About Me
                        </label>
                        <textarea
                          placeholder="Tell us about yourself..."
                          name="about"
                          id=""
                          cols="30"
                          rows="5"
                          className="form-control"
                          value={profileData?.about || ""}
                          onChange={handleProfileChange}
                        ></textarea>
                        <div className="invalid-feedback">
                          Please enter last name.
                        </div>
                      </div>

                      <div className="mb-3 col-12 col-md-12">
                        <label className="form-label" htmlFor="editCountry">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          className="form-control"
                          placeholder="What country are you from?"
                          required=""
                          value={profileData?.country || ""}
                          onChange={handleProfileChange}
                        />
                        <div className="invalid-feedback">
                          Please choose country.
                        </div>
                      </div>
                      <div className="col-12 mt-4">
                        <button
                          onClick={handleFormSubmit}
                          className="btn btn-primary"
                          type="button"
                        >
                          Update Profile <i className="fas fa-check-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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

export default Profile;
