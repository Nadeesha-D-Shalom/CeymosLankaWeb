import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";
import API_BASE from "../../api";
const API = `${API_BASE}/GalleryManager`;
const BASE = API_BASE.replace('/api','') + '/';


export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadImages = async () => {
      try {
        setError("");
        const res = await fetch(`${API}/get_images.php`);
        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response");
        }

        setImages(data);
      } catch (e) {
        setError("Failed to load gallery images.");
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <UserLayout>
      <section className="w-full py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3A2F2A] mb-12 text-center">
            Our Gallery
          </h1>

          {loading && (
            <div className="text-center text-gray-500">
              Loading gallery...
            </div>
          )}

          {error && (
            <div className="text-center text-red-600 font-medium">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="overflow-hidden rounded-lg border border-black/5"
                >
                  <img
                    src={`${BASE}${img.image_path}`}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && images.length === 0 && (
            <div className="text-center text-gray-500">
              No images available.
            </div>
          )}
        </div>
      </section>
    </UserLayout>
  );
}
