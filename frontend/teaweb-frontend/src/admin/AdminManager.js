import React, { useEffect, useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import "./admin.css";
import TeaLoader from "../components/TeaLoader";

function AdminManager() {
  const [admins, setAdmins] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteAdminId, setDeleteAdminId] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [loadingAnim, setLoadingAnim] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    address: "",
    role: "Admin"
  });

  const [editForm, setEditForm] = useState({
    id: "",
    emp_id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    role: "Admin"
  });

  const isSuperAdmin = localStorage.getItem("admin_role") === "Super Admin";

  // Date rules
  const today = new Date();
  const maxDobDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );
  const maxDob = maxDobDate.toISOString().split("T")[0];
  const minDob = "1950-01-01";

  const loadAdmins = async () => {
    try {
      const res = await fetch("http://localhost/TeaWeb/backend/api/get_admins.php");
      const data = await res.json();
      setAdmins(data);
    } catch (err) {
      console.error("Failed to load admins", err);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  useEffect(() => {
    if (!isSuperAdmin) {
      setForm(prev => ({ ...prev, role: "Admin" }));
    }
  }, [isSuperAdmin]);

  const validateDob = (dob) => {
    if (!dob) {
      alert("Please select Date of Birth");
      return false;
    }
    const dobDate = new Date(dob);
    if (dobDate > today) {
      alert("Future dates are not allowed");
      return false;
    }
    if (dobDate > maxDobDate) {
      alert("Admin must be at least 18 years old");
      return false;
    }
    return true;
  };

  const showTeaAnimation = () => {
    setLoadingAnim(true);
    setTimeout(() => {
      window.location.reload();
    }, 1800);
  };

  // ADD ADMIN
  const handleAddAdmin = async () => {
    if (!validateDob(form.dob)) return;

    try {
      const res = await fetch("http://localhost/TeaWeb/backend/api/add_admin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setShowAddForm(false);
        setForm({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          dob: "",
          address: "",
          role: "Admin"
        });
        showTeaAnimation();
      } else {
        alert(data.message || "Failed to add admin");
      }
    } catch (err) {
      alert("Network error while adding admin");
    }
  };

  // EDIT ADMIN
  const handleEditAdmin = async () => {
    if (!validateDob(editForm.dob)) return;

    try {
      const res = await fetch("http://localhost/TeaWeb/backend/api/update_admin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });

      const data = await res.json();

      if (data.success) {
        setShowEditForm(false);
        showTeaAnimation();
      } else {
        alert(data.message || "Failed to update admin");
      }
    } catch (err) {
      alert("Network error while updating admin");
    }
  };

  // DELETE CLICK HANDLER WITH PERMISSION CHECK
  const handleDeleteClick = (adminData) => {
    const loggedRole = localStorage.getItem("admin_role");

    if (loggedRole !== "Super Admin" && adminData.role === "Super Admin") {
      setPopupMessage("You cannot delete Super Admin accounts.");
      setShowAlert(true);
      return;
    }

    setDeleteAdminId(adminData.id);
  };

  const confirmDelete = async () => {
    const loggedAdminId = localStorage.getItem("admin_id");

    try {
      const res = await fetch("http://localhost/TeaWeb/backend/api/delete_admin.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delete_id: deleteAdminId,
          admin_id: loggedAdminId,
          password: deletePassword
        })
      });

      const data = await res.json();

      if (data.success) {
        setDeleteAdminId(null);
        setDeletePassword("");
        showTeaAnimation();
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Network error while deleting admin");
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    handleAddAdmin();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditAdmin();
  };

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    confirmDelete();
  };

  return (
    <AdminLayout>
      {loadingAnim && <TeaLoader />}

      {/* ALERT POPUP */}
      {showAlert && (
        <div className="modal-overlay" onClick={() => setShowAlert(false)}>
          <div
            className="modal-container-small"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Access Denied</h2>
            <p className="modal-text">{popupMessage}</p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowAlert(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="page-title">Admin Manager</h1>

      <div className="admin-top-actions">
        <button className="add-admin-btn" onClick={() => setShowAddForm(true)}>
          Add Admin
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>EMP ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {admins.map((a) => (
            <tr key={a.id}>
              <td>{a.emp_id}</td>
              <td>{a.username}</td>
              <td>{a.first_name} {a.last_name}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{a.role}</td>
              <td className="actions-cell">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditForm({
                      id: a.id,
                      emp_id: a.emp_id,
                      first_name: a.first_name,
                      last_name: a.last_name,
                      username: a.username,
                      email: a.email,
                      phone: a.phone,
                      dob: a.dob,
                      address: a.address,
                      role: a.role
                    });
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(a)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD ADMIN */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Add New Admin</h2>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-grid">
                <input className="modal-input" placeholder="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                <input className="modal-input" placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                <input className="modal-input" placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input className="modal-input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="modal-input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className="modal-input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <input className="modal-input" type="date" value={form.dob} min={minDob} max={maxDob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                <input className="modal-input" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />

                {isSuperAdmin ? (
                  <select className="modal-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                ) : (
                  <input className="modal-input" value="Admin" readOnly />
                )}
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">Add Admin</button>
                <button type="button" className="btn-cancel" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ADMIN */}
      {showEditForm && (
        <div className="modal-overlay" onClick={() => setShowEditForm(false)}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Edit Admin</h2>

            <form onSubmit={handleEditSubmit}>
              <div className="modal-grid">
                <input className="modal-input" value={editForm.emp_id} readOnly placeholder="Employee ID" />
                <input className="modal-input" value={editForm.id} readOnly placeholder="Admin ID" />
                <input className="modal-input" value={editForm.first_name} onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })} />
                <input className="modal-input" value={editForm.last_name} onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })} />
                <input className="modal-input" value={editForm.username} readOnly />
                <input className="modal-input" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                <input className="modal-input" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />
                <input className="modal-input" type="date" value={editForm.dob} min={minDob} max={maxDob} onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })} />
                <input className="modal-input" value={editForm.address} onChange={(e) => setEditForm({ ...editForm, address: e.target.value })} />

                {isSuperAdmin ? (
                  <select className="modal-select" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}>
                    <option>Admin</option>
                    <option>Super Admin</option>
                  </select>
                ) : (
                  <input className="modal-input" value={editForm.role} readOnly />
                )}
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">Save Changes</button>
                <button type="button" className="btn-cancel" onClick={() => setShowEditForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {deleteAdminId && (
        <div className="modal-overlay" onClick={() => setDeleteAdminId(null)}>
          <div
            className="modal-container-small"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Confirm Delete</h2>
            <p className="modal-text">Enter your password to delete this admin.</p>

            <form onSubmit={handleDeleteSubmit}>
              <input
                type="password"
                className="modal-input"
                placeholder="Your Password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
              />

              <div className="modal-actions">
                <button type="submit" className="btn-danger">Delete</button>
                <button type="button" className="btn-cancel" onClick={() => setDeleteAdminId(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}

export default AdminManager;
