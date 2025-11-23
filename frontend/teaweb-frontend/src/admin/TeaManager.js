import React, { useState, useEffect } from "react";
import AdminLayout from "./layout/AdminLayout";
import API_BASE from "../api";
import "./productmanager.css";

function TeaManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const [form, setForm] = useState({
    title: "",
    tasting_notes: "",
    ingredients: "",
    tea_grade: "",
    net_weight: "",
    image: null
  });

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/tea_manager/get_tea_products.php`);
      const data = await res.json();

      setProducts(data);
    } catch (err) {
      console.error("Error loading tea products:", err);
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
      tasting_notes: "",
      ingredients: "",
      tea_grade: "",
      net_weight: "",
      image: null
    });
    setPreviewImg(null);
  };

  const addProduct = async () => {
    const fd = new FormData();

    fd.append("title", form.title);
    fd.append("tasting_notes", form.tasting_notes);
    fd.append("ingredients", form.ingredients);
    fd.append("tea_grade", form.tea_grade);
    fd.append("net_weight", form.net_weight);

    if (form.image) fd.append("image", form.image);

    await fetch(`${API_BASE}/tea_manager/add_tea_product.php`, {
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
      tasting_notes: p.tasting_notes,
      ingredients: p.ingredients,
      tea_grade: p.tea_grade,
      net_weight: p.net_weight,
      image: null
    });

    if (p.image) {
      setPreviewImg(
        `http://localhost/TeaWeb/backend/uploads/tea_products/${p.image}`
      );
    }

    setShowEditModal(true);
  };

  const updateProduct = async () => {
    const fd = new FormData();

    fd.append("id", selectedProduct.id);
    fd.append("title", form.title);
    fd.append("tasting_notes", form.tasting_notes);
    fd.append("ingredients", form.ingredients);
    fd.append("tea_grade", form.tea_grade);
    fd.append("net_weight", form.net_weight);

    if (form.image) fd.append("image", form.image);

    await fetch(`${API_BASE}/tea_manager/update_tea_product.php`, {
      method: "POST",
      body: fd
    });

    setShowEditModal(false);
    resetForm();
    loadProducts();
  };

  const deleteProduct = async () => {
    await fetch(`${API_BASE}/tea_manager/delete_tea_product.php`, {
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
        <h1 className="page-title">Tea Product Manager</h1>
        <button className="pm-add-btn" onClick={() => setShowAddModal(true)}>
          <i className="fas fa-plus"></i> Add Tea Product
        </button>
      </div>

      <div className="pm-grid">
        {loading ? (
          <div className="loader"></div>
        ) : (
          products.map((p) => (
            <div className="pm-card" key={p.id}>
              <img
                src={`http://localhost/TeaWeb/backend/uploads/tea_products/${p.image}`}
                className="pm-img"
                alt={p.title || "Tea product"}
              />

              <h3 className="pm-name">{p.title}</h3>
              <p className="pm-sub">Grade: {p.tea_grade}</p>
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
            <h2>Add Tea Product</h2>

            <div className="pm-form-horizontal">
              <div className="pm-left">
                <input name="title" placeholder="Title" className="pm-input" onChange={handleFormChange} />
                <textarea name="tasting_notes" placeholder="Tasting Notes" className="pm-textarea" onChange={handleFormChange} />
                <textarea name="ingredients" placeholder="Ingredients" className="pm-textarea" onChange={handleFormChange} />
                <input name="tea_grade" placeholder="Tea Grade" className="pm-input" onChange={handleFormChange} />
                <input name="net_weight" placeholder="Net Weight" className="pm-input" onChange={handleFormChange} />
              </div>

              <div className="pm-right">
                <label className="pm-file-label">
                  <i className="fas fa-image"></i> Upload Image
                  <input type="file" onChange={handleImage} />
                </label>

                {previewImg && <img src={previewImg} className="pm-preview-horizontal" alt="preview" />}
              </div>
            </div>

            <button className="pm-save" onClick={addProduct}>Save</button>
            <button className="pm-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="pm-modal-overlay">
          <div className="pm-modal">
            <h2>Edit Tea Product</h2>

            <div className="pm-form-horizontal">
              <div className="pm-left">
                <input name="title" value={form.title} className="pm-input" onChange={handleFormChange} />
                <textarea name="tasting_notes" value={form.tasting_notes} className="pm-textarea" onChange={handleFormChange} />
                <textarea name="ingredients" value={form.ingredients} className="pm-textarea" onChange={handleFormChange} />
                <input name="tea_grade" value={form.tea_grade} className="pm-input" onChange={handleFormChange} />
                <input name="net_weight" value={form.net_weight} className="pm-input" onChange={handleFormChange} />
              </div>

              <div className="pm-right">
                <label className="pm-file-label">
                  <i className="fas fa-image"></i> Change Image
                  <input type="file" onChange={handleImage} />
                </label>

                {previewImg && <img src={previewImg} className="pm-preview-horizontal" alt="preview" />}
              </div>
            </div>

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

            <button className="pm-delete-confirm" onClick={deleteProduct}>Delete</button>
            <button className="pm-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default TeaManager;
