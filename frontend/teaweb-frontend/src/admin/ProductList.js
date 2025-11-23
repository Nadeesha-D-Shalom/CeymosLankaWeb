import React, { useEffect, useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import API_BASE from "../api";
import "./admin.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Add form
  const [addForm, setAddForm] = useState({
    title: "",
    tasting_notes: "",
    ingredients: "",
    tea_grade: "",
    caffeine_level: "",
    net_weight: ""
  });
  const [addImageFile, setAddImageFile] = useState(null);
  const [addImagePreview, setAddImagePreview] = useState(null);

  // Edit form
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    tasting_notes: "",
    ingredients: "",
    tea_grade: "",
    caffeine_level: "",
    net_weight: "",
    image: ""
  });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/get_tea_products.php`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load tea products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Filter by search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle add product submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!addForm.title.trim()) {
      alert("Title is required");
      return;
    }

    const fd = new FormData();
    fd.append("title", addForm.title.trim());
    fd.append("tasting_notes", addForm.tasting_notes.trim());
    fd.append("ingredients", addForm.ingredients.trim());
    fd.append("tea_grade", addForm.tea_grade.trim());
    fd.append("caffeine_level", addForm.caffeine_level.trim());
    fd.append("net_weight", addForm.net_weight.trim());

    if (addImageFile) {
      fd.append("image", addImageFile);
    }

    try {
      const res = await fetch(`${API_BASE}/add_tea_product.php`, {
        method: "POST",
        body: fd
      });

      const data = await res.json();

      if (data.success) {
        setShowAddModal(false);
        setAddForm({
          title: "",
          tasting_notes: "",
          ingredients: "",
          tea_grade: "",
          caffeine_level: "",
          net_weight: ""
        });
        setAddImageFile(null);
        setAddImagePreview(null);
        await loadProducts();
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (err) {
      alert("Network error while adding product");
    }
  };

  // Handle edit button click
  const openEditModal = (p) => {
    setEditForm({
      id: p.id,
      title: p.title || "",
      tasting_notes: p.tasting_notes || "",
      ingredients: p.ingredients || "",
      tea_grade: p.tea_grade || "",
      caffeine_level: p.caffeine_level || "",
      net_weight: p.net_weight || "",
      image: p.image || ""
    });
    setEditImageFile(null);
    setEditImagePreview(
      p.image
        ? `http://localhost/TeaWeb/backend/uploads/${p.image}`
        : null
    );
    setShowEditModal(true);
  };

  // Handle edit submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!editForm.title.trim()) {
      alert("Title is required");
      return;
    }

    const fd = new FormData();
    fd.append("id", editForm.id);
    fd.append("title", editForm.title.trim());
    fd.append("tasting_notes", editForm.tasting_notes.trim());
    fd.append("ingredients", editForm.ingredients.trim());
    fd.append("tea_grade", editForm.tea_grade.trim());
    fd.append("caffeine_level", editForm.caffeine_level.trim());
    fd.append("net_weight", editForm.net_weight.trim());

    if (editImageFile) {
      fd.append("image", editImageFile);
    }

    try {
      const res = await fetch(`${API_BASE}/update_tea_product.php`, {
        method: "POST",
        body: fd
      });

      const data = await res.json();

      if (data.success) {
        setShowEditModal(false);
        setEditImageFile(null);
        setEditImagePreview(null);
        await loadProducts();
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (err) {
      alert("Network error while updating product");
    }
  };

  // Handle delete
  const confirmDeleteProduct = async () => {
    if (!deleteId) return;

    try {
      const res = await fetch(`${API_BASE}/delete_tea_product.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteId })
      });

      const data = await res.json();

      if (data.success) {
        setDeleteId(null);
        await loadProducts();
      } else {
        alert(data.message || "Delete failed");
      }
    } catch (err) {
      alert("Network error while deleting product");
    }
  };

  // Image handlers
  const handleAddImageChange = (e) => {
    const file = e.target.files[0];
    setAddImageFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAddImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setAddImagePreview(null);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setEditImageFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setEditImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setEditImagePreview(
        editForm.image
          ? `http://localhost/TeaWeb/backend/uploads/${editForm.image}`
          : null
      );
    }
  };

  return (
    <AdminLayout>
      <h1 className="page-title">Tea Product Manager</h1>

      <div className="tea-manager-header">
        <div className="tea-header-left">
          <p className="tea-subtitle">
            Manage CEYMOS LANKA tea collection – add new blends, update tasting notes,
            and control the catalog shown to customers.
          </p>
        </div>

        <div className="tea-header-right">
          <input
            type="text"
            className="tea-search-input"
            placeholder="Search tea by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="tea-add-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Tea
          </button>
        </div>
      </div>

      {loading && <p>Loading tea products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && filteredProducts.length === 0 && (
        <div className="tea-empty-state">
          <h3>No tea products found</h3>
          <p>Click “Add New Tea” to create your first product.</p>
        </div>
      )}

      <div className="tea-card-grid">
        {filteredProducts.map((p) => (
          <div className="tea-card" key={p.id}>
            <div className="tea-card-image-wrap">
              {p.image ? (
                <img
                  src={`http://localhost/TeaWeb/backend/uploads/${p.image}`}
                  alt={p.title}
                  className="tea-card-image"
                />
              ) : (
                <div className="tea-card-image-placeholder">
                  No Image
                </div>
              )}
            </div>

            <div className="tea-card-body">
              <h3 className="tea-card-title">{p.title}</h3>

              <div className="tea-meta-row">
                {p.tea_grade && (
                  <span className="tea-meta-chip">
                    Grade: {p.tea_grade}
                  </span>
                )}
                {p.caffeine_level && (
                  <span className="tea-meta-chip">
                    Caffeine: {p.caffeine_level}
                  </span>
                )}
                {p.net_weight && (
                  <span className="tea-meta-chip">
                    Net Weight: {p.net_weight}
                  </span>
                )}
              </div>

              {p.tasting_notes && (
                <p className="tea-card-tasting">
                  {p.tasting_notes.length > 150
                    ? p.tasting_notes.slice(0, 150) + "..."
                    : p.tasting_notes}
                </p>
              )}

              <div className="tea-card-actions">
                <button
                  className="tea-edit-btn"
                  onClick={() => openEditModal(p)}
                >
                  Edit
                </button>
                <button
                  className="tea-delete-btn"
                  onClick={() => setDeleteId(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="modal-container-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Add New Tea Product</h2>

            <form onSubmit={handleAddSubmit}>
              <div className="tea-modal-grid">
                <div className="tea-modal-left">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      className="modal-input"
                      value={addForm.title}
                      onChange={(e) =>
                        setAddForm({ ...addForm, title: e.target.value })
                      }
                      placeholder="Exceptional Rose with French Vanilla Ceylon Black Tea-20 Luxury Leaf Tea Bags"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tasting Note & Distinctive Features</label>
                    <textarea
                      className="modal-textarea"
                      value={addForm.tasting_notes}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          tasting_notes: e.target.value
                        })
                      }
                      placeholder="Write the tasting note similar to Dilmah product description..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Ingredients</label>
                    <textarea
                      className="modal-textarea"
                      value={addForm.ingredients}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          ingredients: e.target.value
                        })
                      }
                      placeholder="Ceylon black tea with vanilla 4% and rose 0.5% flavours"
                    />
                  </div>
                </div>

                <div className="tea-modal-right">
                  <div className="form-group">
                    <label>Tea Grade</label>
                    <input
                      className="modal-input"
                      value={addForm.tea_grade}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          tea_grade: e.target.value
                        })
                      }
                      placeholder="Pekoe"
                    />
                  </div>

                  <div className="form-group">
                    <label>Caffeine Level</label>
                    <input
                      className="modal-input"
                      value={addForm.caffeine_level}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          caffeine_level: e.target.value
                        })
                      }
                      placeholder="Medium"
                    />
                  </div>

                  <div className="form-group">
                    <label>Net Weight</label>
                    <input
                      className="modal-input"
                      value={addForm.net_weight}
                      onChange={(e) =>
                        setAddForm({
                          ...addForm,
                          net_weight: e.target.value
                        })
                      }
                      placeholder="40g"
                    />
                  </div>

                  <div className="form-group">
                    <label>Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="modal-input"
                      onChange={handleAddImageChange}
                    />
                  </div>

                  {addImagePreview && (
                    <div className="tea-image-preview">
                      <img src={addImagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  Save Product
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="modal-container-wide"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Edit Tea Product</h2>

            <form onSubmit={handleEditSubmit}>
              <div className="tea-modal-grid">
                <div className="tea-modal-left">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      className="modal-input"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm({ ...editForm, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Tasting Note & Distinctive Features</label>
                    <textarea
                      className="modal-textarea"
                      value={editForm.tasting_notes}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          tasting_notes: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Ingredients</label>
                    <textarea
                      className="modal-textarea"
                      value={editForm.ingredients}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          ingredients: e.target.value
                        })
                      }
                    />
                  </div>
                </div>

                <div className="tea-modal-right">
                  <div className="form-group">
                    <label>Tea Grade</label>
                    <input
                      className="modal-input"
                      value={editForm.tea_grade}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          tea_grade: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Caffeine Level</label>
                    <input
                      className="modal-input"
                      value={editForm.caffeine_level}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          caffeine_level: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Net Weight</label>
                    <input
                      className="modal-input"
                      value={editForm.net_weight}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          net_weight: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Change Image (optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="modal-input"
                      onChange={handleEditImageChange}
                    />
                  </div>

                  {editImagePreview && (
                    <div className="tea-image-preview">
                      <img src={editImagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
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

      {/* DELETE CONFIRM MODAL */}
      {deleteId && (
        <div
          className="modal-overlay"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="modal-container-small"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Delete Product</h2>
            <p className="modal-text">
              Are you sure you want to delete this tea product?
            </p>

            <div className="modal-actions">
              <button
                className="btn-danger"
                onClick={confirmDeleteProduct}
              >
                Delete
              </button>
              <button
                className="btn-cancel"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default ProductList;
