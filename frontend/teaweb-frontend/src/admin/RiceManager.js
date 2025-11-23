import React, { useState, useEffect } from "react";
import AdminLayout from "./layout/AdminLayout";
import API_BASE from "../api";
import "./productmanager.css";

function RiceManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  // FIXED — match rice_products table
  const [form, setForm] = useState({
    title: "",
    description: "",
    net_weight: "",
    image: null
  });

  const loadProducts = async () => {
    const res = await fetch(`${API_BASE}/rice_manager/get_rice_products.php`);
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      net_weight: "",
      image: null
    });
    setPreviewImg(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });

    if (file) setPreviewImg(URL.createObjectURL(file));
  };

  const addProduct = async () => {
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("net_weight", form.net_weight);
    if (form.image) fd.append("image", form.image);

    await fetch(`${API_BASE}/rice_manager/add_rice_product.php`, {
      method: "POST",
      body: fd
    });

    setShowAdd(false);
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

    setPreviewImg(`${API_BASE.replace("/api", "")}/uploads/rice_products/${p.image}`);
    setShowEdit(true);
  };

  const updateProduct = async () => {
    const fd = new FormData();

    fd.append("id", selectedProduct.id);
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("net_weight", form.net_weight);

    if (form.image) fd.append("image", form.image);

    await fetch(`${API_BASE}/rice_manager/update_rice_product.php`, {
      method: "POST",
      body: fd
    });

    setShowEdit(false);
    resetForm();
    loadProducts();
  };

  const deleteProduct = async () => {
    await fetch(`${API_BASE}/rice_manager/delete_rice_product.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedProduct.id })
    });

    setShowDelete(false);
    loadProducts();
  };


  return (
    <AdminLayout>
      <div className="pm-header">
        <h1 className="page-title">Rice Product Manager</h1>
        <button className="pm-add-btn" onClick={() => setShowAdd(true)}>
          <i className="fas fa-plus"></i> Add Rice Product
        </button>
      </div>

      <div className="pm-grid">
        {loading ? (
          <div className="loader"></div>
        ) : (
          products.map((p) => (
            <div className="pm-card" key={p.id}>
              <img
                src={`${API_BASE.replace("/api", "")}/uploads/rice_products/${p.image}`}
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
                    setShowDelete(true);
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ADD MODAL */}
      {showAdd && (
        <div className="pm-modal-overlay">
          <div className="pm-modal">
            <h2>Add Rice Product</h2>

            <input
              name="title"
              className="pm-input"
              placeholder="Title"
              onChange={handleChange}
            />

            <textarea
              name="description"
              className="pm-textarea"
              placeholder="Description"
              onChange={handleChange}
            />

            <input
              name="net_weight"
              className="pm-input"
              placeholder="Net Weight"
              onChange={handleChange}
            />

            <label className="pm-file-label">
              <i className="fas fa-image"></i> Choose Image
              <input type="file" onChange={handleImage} />
            </label>

            {previewImg && <img src={previewImg} className="pm-preview" alt="" />}

            <button className="pm-save" onClick={addProduct}>Save</button>
            <button className="pm-cancel" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="pm-modal-overlay">
          <div className="pm-modal">
            <h2>Edit Rice Product</h2>

            <input name="title" value={form.title} className="pm-input" onChange={handleChange} />

            <textarea name="description" value={form.description} className="pm-textarea" onChange={handleChange} />

            <input name="net_weight" value={form.net_weight} className="pm-input" onChange={handleChange} />

            <label className="pm-file-label">
              <i className="fas fa-image"></i> Change Image
              <input type="file" onChange={handleImage} />
            </label>

            {previewImg && <img src={previewImg} className="pm-preview" alt="" />}

            <button className="pm-save" onClick={updateProduct}>Update</button>
            <button className="pm-cancel" onClick={() => setShowEdit(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDelete && (
        <div className="pm-modal-overlay">
          <div className="pm-modal-small">
            <h2>Delete Product</h2>
            <p>Are you sure you want to delete "{selectedProduct.title}"?</p>

            <button className="pm-delete-confirm" onClick={deleteProduct}>Delete</button>
            <button className="pm-cancel" onClick={() => setShowDelete(false)}>Cancel</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default RiceManager;
