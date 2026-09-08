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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/spices_manager/add_spices_product.php`, {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data && data.success === false) throw new Error(data.message || 'Add failed');
      setShowAddModal(false);
      resetForm();
      loadProducts();
    } catch (err) {
      console.error('Add spice error', err);
      alert('Failed to add spice: ' + (err.message || 'Unknown'));
    } finally {
      setIsSubmitting(false);
    }
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
      setPreviewImg(`${API_BASE.replace('/api','')}/uploads/spices_products/${p.image}`);
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

    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/spices_manager/update_spices_product.php`, {
        method: "POST",
        body: fd
      });
      const data = await res.json();
      if (data && data.success === false) throw new Error(data.message || 'Update failed');
      setShowEditModal(false);
      resetForm();
      loadProducts();
    } catch (err) {
      console.error('Update spice error', err);
      alert('Failed to update spice: ' + (err.message || 'Unknown'));
    } finally {
      setIsSubmitting(false);
    }
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
                src={`${API_BASE.replace("/api", "")}/uploads/spices_products/${p.image}`}
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
            <div className="pm-modal-header">
              <h2>Add Spice Product</h2>
              <button className="pm-modal-close" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>

            <div className="pm-form-horizontal">
              <div className="pm-left">
                <input name="title" value={form.title} onChange={handleFormChange} className="pm-input" placeholder="Title" />
                <textarea name="description" value={form.description} onChange={handleFormChange} className="pm-textarea" placeholder="Description" />
                <input name="net_weight" value={form.net_weight} onChange={handleFormChange} className="pm-input" placeholder="Net Weight" />
              </div>

              <div className="pm-right">
                <label className="pm-file-label">
                  <i className="fas fa-image"></i>
                  <span style={{marginLeft:8}}>Upload Image</span>
                  <input type="file" onChange={handleImage} />
                </label>

                {previewImg ? (
                  <img src={previewImg} className="pm-preview" alt="preview" />
                ) : (
                  <div style={{color:'#778ca3', textAlign:'center', paddingTop:20}}>No image selected</div>
                )}
              </div>
            </div>

            <button className="pm-save" onClick={addProduct} disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>
            <button className="pm-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="pm-modal-overlay">
          <div className="pm-modal">
            <div className="pm-modal-header">
              <h2>Edit Spice Product</h2>
              <button className="pm-modal-close" onClick={() => setShowEditModal(false)}>&times;</button>
            </div>

            <div className="pm-form-horizontal">
              <div className="pm-left">
                <input name="title" value={form.title} onChange={handleFormChange} className="pm-input" />
                <textarea name="description" value={form.description} onChange={handleFormChange} className="pm-textarea" />
                <input name="net_weight" value={form.net_weight} onChange={handleFormChange} className="pm-input" />
              </div>

              <div className="pm-right">
                <label className="pm-file-label">
                  <i className="fas fa-image"></i>
                  <span style={{marginLeft:8}}>Change Image</span>
                  <input type="file" onChange={handleImage} />
                </label>

                {previewImg ? (
                  <img src={previewImg} className="pm-preview" alt="preview" />
                ) : (
                  <div style={{color:'#778ca3', textAlign:'center', paddingTop:20}}>No image selected</div>
                )}
              </div>
            </div>

            <button className="pm-save" onClick={updateProduct} disabled={isSubmitting}>{isSubmitting ? 'Updating...' : 'Update'}</button>
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
