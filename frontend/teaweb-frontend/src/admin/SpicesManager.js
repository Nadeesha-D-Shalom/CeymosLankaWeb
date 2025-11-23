import React, { useState, useEffect } from "react";
import AdminLayout from "./layout/AdminLayout";
import API_BASE from "../api";
import "./productmanager.css";

function SpicesManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    net_weight: "",
    image: null
  });

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/spices_manager/get_spices_products.php`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error loading spices:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      net_weight: "",
      image: null
    });
    setPreviewImg(null);
  };

  const addProduct = async () => {
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("net_weight", form.net_weight);
    if (form.image) fd.append("image", form.image);

    await fetch(`${API_BASE}/spices_manager/add_spices_product.php`, {
      method: "POST",
      body: fd
    });

    setShowAddModal(false);
    resetForm();
    loadProducts();
  };

  const openEdit = (p) => {
    setSelectedProduct(p);
    setForm({
      title: p.title,
      description: p.description,
      net_weight: p.net_weight,
      image: null
    });

    if (p.image) {
      setPreviewImg(`http://localhost/TeaWeb/backend/uploads/spices_products/${p.image}`);
    }

    setShowEditModal(true);
  };

  const updateProduct = async () => {
    const fd = new FormData();

    fd.append("id", selectedProduct.id);
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("net_weight", form.net_weight);
    if (form.image) fd.append("image", form.image);

    await fetch(`${API_BASE}/spices_manager/update_spices_product.php`, {
      method: "POST",
      body: fd
    });

    setShowEditModal(false);
    resetForm();
    loadProducts();
  };

  const deleteProduct = async () => {
    await fetch(`${API_BASE}/spices_manager/delete_spices_products.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedProduct.id })
    });


    setShowDeleteModal(false);
    loadProducts();
  };

  return (
    <AdminLayout>
      <div className="pm-header">
        <h1 className="page-title">Spices Product Manager</h1>
        <button className="pm-add-btn" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus"></i> Add Spice
        </button>
      </div>

      <div className="pm-grid">
        {loading ? (
          <div className="loader"></div>
        ) : (
          products.map((p) => (
            <div className="pm-card" key={p.id}>
              <img
                src={`http://localhost/TeaWeb/backend/uploads/spices_products/${p.image}`}
                className="pm-img"
                alt={p.title}
              />

              <h3 className="pm-name">{p.title}</h3>
              <p className="pm-sub">Description: {p.description}</p>
              <p className="pm-sub">Weight: {p.net_weight}</p>

              <div className="pm-actions">
                <button className="pm-edit" onClick={() => openEdit(p)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  className="pm-delete"
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowDeleteModal(true);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="pm-modal-overlay">
          <div className="pm-modal">
            <h2>Add Spice Product</h2>

            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              className="pm-input"
              placeholder="Title"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              className="pm-textarea"
              placeholder="Description"
            />

            <input
              name="net_weight"
              value={form.net_weight}
              onChange={handleFormChange}
              className="pm-input"
              placeholder="Net Weight"
            />

            <label className="pm-file-label">
              <i className="fas fa-image"></i> Upload Image
              <input type="file" onChange={handleImage} />
            </label>

            {previewImg && <img src={previewImg} className="pm-preview" alt="preview" />}

            <button className="pm-save" onClick={addProduct}>Save</button>
            <button className="pm-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="pm-modal-overlay">
          <div className="pm-modal">
            <h2>Edit Spice Product</h2>

            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              className="pm-input"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleFormChange}
              className="pm-textarea"
            />

            <input
              name="net_weight"
              value={form.net_weight}
              onChange={handleFormChange}
              className="pm-input"
            />

            <label className="pm-file-label">
              <i className="fas fa-image"></i> Change Image
              <input type="file" onChange={handleImage} />
            </label>

            {previewImg && <img src={previewImg} className="pm-preview" alt="preview" />}

            <button className="pm-save" onClick={updateProduct}>Update</button>
            <button className="pm-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="pm-modal-overlay">
          <div className="pm-modal-small">
            <h2>Delete Product</h2>
            <p>Are you sure you want to delete "{selectedProduct.title}"?</p>

            <button className="pm-delete-confirm" onClick={deleteProduct}>
              Delete
            </button>
            <button className="pm-cancel" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default SpicesManager;
