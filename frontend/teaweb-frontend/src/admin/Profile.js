import React from "react";
import AdminLayout from "./layout/AdminLayout";
import "./admin.css";

function Profile() {
  return (
    <AdminLayout>

      <h1 className="page-title">My Profile</h1>

      <div className="profile-wrapper">

        {/* LEFT MAIN CONTENT */}
        <div className="profile-main">

          {/* PROFILE HEADER CARD */}
          <div className="profile-header-card">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="admin"
              className="profile-avatar"
            />

            <div className="profile-header-info">
              <h2 className="profile-name">Natashia Khaleira</h2>
              <p className="profile-role">Admin</p>
              <p className="profile-location">Leeds, United Kingdom</p>
            </div>
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="profile-section">
            <h3 className="section-title">Personal Information</h3>

            <div className="two-col-row">
              <div className="info-item">
                <label>First Name</label>
                <p>Natashia</p>
              </div>

              <div className="info-item">
                <label>Last Name</label>
                <p>Khaleira</p>
              </div>
            </div>

            <div className="two-col-row">
              <div className="info-item">
                <label>Email Address</label>
                <p>info@binary-fusion.com</p>
              </div>

              <div className="info-item">
                <label>Phone Number</label>
                <p>(+62) 821-2554-5846</p>
              </div>
            </div>

            <div className="two-col-row">
              <div className="info-item">
                <label>Date of Birth</label>
                <p>12-10-1990</p>
              </div>

              <div className="info-item">
                <label>User Role</label>
                <p>Admin</p>
              </div>
            </div>
          </div>

          {/* ADDRESS INFO */}
          <div className="profile-section">
            <h3 className="section-title">Address</h3>

            <div className="two-col-row">
              <div className="info-item">
                <label>Country</label>
                <p>United Kingdom</p>
              </div>

              <div className="info-item">
                <label>City</label>
                <p>Leeds, East London</p>
              </div>
            </div>

            <div className="two-col-row">
              <div className="info-item">
                <label>Postal Code</label>
                <p>ERT 1254</p>
              </div>

              <div className="info-item">
                <label>---</label>
                <p></p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT-SIDE PANEL */}
        <div className="profile-side-panel-modern">
          <h3 className="side-email">admin@example.com</h3>
          <p className="side-sub">Last sign-in: 4 minutes ago</p>

          <div className="side-box">User ID: EMP001</div>

          <button className="side-btn primary">Change Password</button>
          <button className="side-btn dark">Edit Profile</button>
          <button className="side-btn danger">Delete Account</button>
        </div>

      </div>

    </AdminLayout>
  );
}

export default Profile;
