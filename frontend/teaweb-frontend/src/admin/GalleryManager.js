import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "./layout/AdminLayout";
import "./admin.css";

const API = "https://ceymoslanka.com/backend/api/GalleryManager";
const BASE = "https://ceymoslanka.com/backend/";

function GalleryManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadQueue, setUploadQueue] = useState([]);

  const fileRef = useRef(null);

  /* -------------------------------- */
  /* LOAD IMAGES */
  /* -------------------------------- */
  const loadImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/get_images.php`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  /* -------------------------------- */
  /* HANDLE FILE SELECTION */
  /* -------------------------------- */
  const onFilesSelected = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const queue = files.map((f) => ({
      name: f.name,
      status: "uploading"
    }));

    setUploadQueue(queue);

    for (let i = 0; i < files.length; i++) {
      await uploadSingleFile(files[i], i);
    }

    fileRef.current.value = "";
    loadImages();
  };

  /* -------------------------------- */
  /* SINGLE FILE UPLOAD */
  /* -------------------------------- */
  const uploadSingleFile = async (file, index) => {
    const form = new FormData();
    form.append("images[]", file);

    try {
      const res = await fetch(`${API}/upload_image.php`, {
        method: "POST",
        body: form
      });

      const result = await res.json();

      setUploadQueue((prev) =>
        prev.map((q, i) =>
          i === index
            ? { ...q, status: result.success ? "done" : "error" }
            : q
        )
      );
    } catch {
      setUploadQueue((prev) =>
        prev.map((q, i) =>
          i === index ? { ...q, status: "error" } : q
        )
      );
    }
  };

  /* -------------------------------- */
  /* DELETE */
  /* -------------------------------- */
  const onDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      const res = await fetch(`${API}/delete_image.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });

      const result = await res.json();
      if (result.success) {
        setItems((prev) => prev.filter((x) => x.id !== id));
      }
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <AdminLayout>
      <h1 className="page-title">Gallery Manager</h1>

      {/* ACTION BAR */}
      <div className="admin-top-actions flex items-center gap-4">
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={onFilesSelected}
        />

        <button
          onClick={() => fileRef.current.click()}
          className="px-5 py-2 rounded-lg bg-[#3A2F2A] text-white font-medium hover:bg-[#2c2420] transition"
        >
          Choose Images
        </button>

        <button
          onClick={loadImages}
          disabled={loading}
          className="px-5 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-4 text-red-700 font-semibold">
          {error}
        </div>
      )}

      {/* UPLOAD QUEUE */}
      {uploadQueue.length > 0 && (
        <div className="mt-6 space-y-3">
          {uploadQueue.map((u, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#3A2F2A] text-white"
            >
              <span className="text-sm truncate">{u.name}</span>
              <span className="text-sm">
                {u.status === "uploading" && "Uploading..."}
                {u.status === "done" && "Completed"}
                {u.status === "error" && "Failed"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* GALLERY GRID */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-xl overflow-hidden border border-black/10"
          >
            <div className="aspect-[4/3] bg-gray-100">
              <img
                src={`${BASE}${img.image_path}`}
                alt="Gallery"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-gray-500">
                ID: {img.id}
              </span>

              <button
                onClick={() => onDelete(img.id)}
                className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && items.length === 0 && (
        <div className="mt-8 text-gray-500">
          No images uploaded yet.
        </div>
      )}
    </AdminLayout>
  );
}

export default GalleryManager;
