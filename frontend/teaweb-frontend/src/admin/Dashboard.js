// src/admin/Dashboard.js
import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "./layout/AdminLayout";
import "./admin.css";
import TeaLoader from "../components/TeaLoader";

function Dashboard() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Animation
  const [teaLoading, setTeaLoading] = useState(false);

  // Edit profile form
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    address: ""
  });

  // Change password form
  const [pwdForm, setPwdForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Delete account form
  const [deletePassword, setDeletePassword] = useState("");

  const loggedAdminId = localStorage.getItem("admin_id");

  const isSuperAdmin = admin?.role === "Super Admin";

  // DOB constraints
  const today = new Date();
  const maxDobDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDob = maxDobDate.toISOString().split("T")[0];
  const minDob = "1950-01-01";

  // Tea animation then reload / redirect
  const showTeaAnimationReload = () => {
    setTeaLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1800);
  };

  const showTeaAnimationLogout = () => {
    setTeaLoading(true);
    setTimeout(() => {
      localStorage.removeItem("admin_logged");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("admin_username");
      localStorage.removeItem("admin_role");
      localStorage.removeItem("adminUser");
      window.location.href = "/admin/login"; // Adjust route if different
    }, 1800);
  };

  // Validate DOB
  const validateDob = (dob) => {
    if (!dob) {
      alert("Please select Date of Birth");
      return false;
    }
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert("Future dates are not allowed for Date of Birth");
      return false;
    }
    if (dobDate > maxDobDate) {
      alert("Admin must be at least 18 years old");
      return false;
    }
    return true;
  };

  // Load admin details from DB
  const loadAdminDetails = useCallback(async () => {
    if (!loggedAdminId) {
      setErrMsg("Not logged in");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost/TeaWeb/backend/api/get_admin_by_id.php?id=${loggedAdminId}`
      );
      const data = await res.json();

      if (data.success) {
        setAdmin(data.admin);
        setProfileForm({
          first_name: data.admin.first_name || "",
          last_name: data.admin.last_name || "",
          email: data.admin.email || "",
          phone: data.admin.phone || "",
          dob: data.admin.dob || "",
          address: data.admin.address || ""
        });
      } else {
        setErrMsg(data.message || "Failed to load profile");
      }
    } catch (err) {
      setErrMsg("Network error while loading profile");
    } finally {
      setLoading(false);
    }
  }, [loggedAdminId]);

  useEffect(() => {
    loadAdminDetails();
  }, [loadAdminDetails]);

  // Submit: Edit profile
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return;

    if (!validateDob(profileForm.dob)) {
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/TeaWeb/backend/api/update_admin_profile.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: admin.id,
            ...profileForm
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        setShowEditModal(false);
        showTeaAnimationReload();
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      alert("Network error while updating profile");
    }
  };

  // Submit: Change password
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return;

    if (!pwdForm.currentPassword || !pwdForm.newPassword || !pwdForm.confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (pwdForm.newPassword.length < 6) {
      alert("New password must be at least 6 characters");
      return;
    }

    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/TeaWeb/backend/api/change_admin_password.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: admin.id,
            currentPassword: pwdForm.currentPassword,
            newPassword: pwdForm.newPassword
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        setShowPwdModal(false);
        setPwdForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        showTeaAnimationReload();
      } else {
        alert(data.message || "Failed to change password");
      }
    } catch (err) {
      alert("Network error while changing password");
    }
  };

  // Submit: Delete account (self)
  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!admin) return;

    if (isSuperAdmin) {
      alert("Super Admin accounts cannot be deleted.");
      return;
    }

    if (!deletePassword) {
      alert("Please enter your password");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost/TeaWeb/backend/api/delete_self_admin.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: admin.id,
            password: deletePassword
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        setShowDeleteModal(false);
        setDeletePassword("");
        showTeaAnimationLogout();
      } else {
        alert(data.message || "Failed to delete account");
      }
    } catch (err) {
      alert("Network error while deleting account");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <h1 className="page-title">My Profile</h1>
        <p>Loading profile...</p>
      </AdminLayout>
    );
  }

  if (errMsg) {
    return (
      <AdminLayout>
        <h1 className="page-title">My Profile</h1>
        <p style={{ color: "red" }}>{errMsg}</p>
      </AdminLayout>
    );
  }

  if (!admin) {
    return (
      <AdminLayout>
        <h1 className="page-title">My Profile</h1>
        <p>No admin data found.</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {teaLoading && <TeaLoader />}

      <h1 className="page-title">My Profile</h1>

      <div className="profile-wrapper">
        {/* LEFT SIDE */}
        <div className="profile-main">
          {/* HEADER CARD */}
          <div className="profile-header-card">
            <div>
              <h2 style={{ margin: 0 }}>
                {admin.first_name} {admin.last_name}
              </h2>
              <p className="profile-role">{admin.role}</p>
              <p className="profile-location">
                {admin.address || "Address not set"}
              </p>
            </div>
          </div>

          {/* PERSONAL INFORMATION */}
          <div className="profile-section">
            <h3 className="section-title">Personal Information</h3>

            <div className="two-col-row">
              <div className="info-item">
                <label>First Name</label>
                <p>{admin.first_name || "-"}</p>
              </div>

              <div className="info-item">
                <label>Last Name</label>
                <p>{admin.last_name || "-"}</p>
              </div>
            </div>

            <div className="two-col-row">
              <div className="info-item">
                <label>Email Address</label>
                <p>{admin.email || "-"}</p>
              </div>

              <div className="info-item">
                <label>Phone Number</label>
                <p>{admin.phone || "-"}</p>
              </div>
            </div>

            <div className="two-col-row">
              <div className="info-item">
                <label>Date of Birth</label>
                <p>{admin.dob || "-"}</p>
              </div>

              <div className="info-item">
                <label>User Role</label>
                <p>{admin.role}</p>
              </div>
            </div>
          </div>

          {/* ADDRESS BLOCK */}
          <div className="profile-section">
            <h3 className="section-title">Address</h3>

            <div className="two-col-row">
              <div className="info-item">
                <label>Address</label>
                <p>{admin.address || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="profile-side-panel-modern">
          <h3 className="side-email">{admin.email || "Not set"}</h3>
          <p className="side-sub">Role: {admin.role}</p>

          <div className="side-box">
            Employee ID: {admin.emp_id || "N/A"}
          </div>

          <button
            className="side-btn primary"
            onClick={() => setShowPwdModal(true)}
          >
            Change Password
          </button>
          <button
            className="side-btn dark"
            onClick={() => setShowEditModal(true)}
          >
            Edit Profile
          </button>
          <button
            className="side-btn danger"
            onClick={() => {
              if (isSuperAdmin) {
                alert("Super Admin accounts cannot be deleted.");
              } else {
                setShowDeleteModal(true);
              }
            }}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Edit Profile</h2>

            <form onSubmit={handleProfileSubmit}>
              <div className="modal-grid">
                <input
                  className="modal-input"
                  value={admin.emp_id || ""}
                  readOnly
                  placeholder="EMP ID"
                />
                <input
                  className="modal-input"
                  value={admin.username}
                  readOnly
                  placeholder="Username"
                />

                <input
                  className="modal-input"
                  placeholder="First Name"
                  value={profileForm.first_name}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      first_name: e.target.value
                    })
                  }
                />
                <input
                  className="modal-input"
                  placeholder="Last Name"
                  value={profileForm.last_name}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      last_name: e.target.value
                    })
                  }
                />

                <input
                  className="modal-input"
                  placeholder="Email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      email: e.target.value
                    })
                  }
                />
                <input
                  className="modal-input"
                  placeholder="Phone"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      phone: e.target.value
                    })
                  }
                />

                <input
                  className="modal-input"
                  type="date"
                  value={profileForm.dob}
                  min={minDob}
                  max={maxDob}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      dob: e.target.value
                    })
                  }
                />
                <input
                  className="modal-input"
                  placeholder="Address"
                  value={profileForm.address}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      address: e.target.value
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPwdModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowPwdModal(false)}
        >
          <div
            className="modal-container-small"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Change Password</h2>

            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                className="modal-input"
                placeholder="Current Password"
                value={pwdForm.currentPassword}
                onChange={(e) =>
                  setPwdForm({
                    ...pwdForm,
                    currentPassword: e.target.value
                  })
                }
              />
              <input
                type="password"
                className="modal-input"
                placeholder="New Password"
                value={pwdForm.newPassword}
                onChange={(e) =>
                  setPwdForm({
                    ...pwdForm,
                    newPassword: e.target.value
                  })
                }
              />
              <input
                type="password"
                className="modal-input"
                placeholder="Confirm New Password"
                value={pwdForm.confirmPassword}
                onChange={(e) =>
                  setPwdForm({
                    ...pwdForm,
                    confirmPassword: e.target.value
                  })
                }
              />

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  Change Password
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowPwdModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE ACCOUNT MODAL */}
      {showDeleteModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="modal-container-small"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Delete Account</h2>
            <p className="modal-text">
              This action will permanently delete your admin account. Enter your password to confirm.
            </p>

            <form onSubmit={handleDeleteSubmit}>
              <input
                type="password"
                className="modal-input"
                placeholder="Your Password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />

              <div className="modal-actions">
                <button type="submit" className="btn-danger">
                  Delete Account
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Dashboard;
