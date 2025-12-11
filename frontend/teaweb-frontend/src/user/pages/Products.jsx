import React, { useEffect, useState } from "react";
import UserLayout from "../layout/UserLayout";

const Products = () => {
  const [tea, setTea] = useState([]);
  const [coconut, setCoconut] = useState([]);
  const [spices, setSpices] = useState([]);
  const [rice, setRice] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = "https://ceymoslanka.com/backend/api";

  // Accept both array or object format
  const resolveData = (data) => {
    if (Array.isArray(data)) return data;

    if (data && typeof data === "object") {
      return (
        data.products ||
        data.data ||
        data.items ||
        data.list ||
        data.result ||
        data.rice ||
        data.spices ||
        data.tea ||
        data.coconut ||
        []
      );
    }

    return [];
  };

  useEffect(() => {
    Promise.all([
      fetch(`${API}/tea_manager/get_tea_products.php`).then((r) => r.json()),
      fetch(`${API}/coconut_manager/get_coconut_products.php`).then((r) => r.json()),
      fetch(`${API}/spices_manager/get_spices_products.php`).then((r) => r.json()),
      fetch(`${API}/rice_manager/get_rice_products.php`).then((r) => r.json()),
    ])
      .then(([teaData, coconutData, spicesData, riceData]) => {
        setTea(resolveData(teaData));
        setCoconut(resolveData(coconutData));
        setSpices(resolveData(spicesData));
        setRice(resolveData(riceData));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="text-center py-20 text-gray-600 text-xl">
          Loading All Products...
        </div>
      </UserLayout>
    );
  }

  const sections = [
    { title: "Ceylon Tea", data: tea, path: "tea", folder: "tea_products" },
    { title: "Coconut Products", data: coconut, path: "coconut", folder: "coconut_products" },
    { title: "Ceylon Cinnamon (Spices)", data: spices, path: "spices", folder: "spices_products" },
    { title: "Sri Lankan Rice", data: rice, path: "rice", folder: "rice_products" },
  ];

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-20">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">All Products</h1>

        {sections.map((section, i) => (
          <div key={i} className="mb-14">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              {section.title}
            </h2>

            <div className="w-20 h-[3px] bg-gray-900 mb-4"></div>

            <div className="overflow-x-auto">
              <div className="flex gap-6 min-w-max pb-4">
                {section.data.length === 0 && (
                  <p className="text-gray-500">No products available.</p>
                )}

                {section.data.map((p) => (
                  <a
                    key={p.id}
                    href={`/${section.path}/${p.id}`}
                    className="min-w-[260px] w-[260px] bg-white shadow-sm hover:shadow-md border rounded-lg transition"
                  >
                    <img
                      src={
                        p.image
                          ? `https://ceymoslanka.com/backend/uploads/${section.folder}/${p.image}`
                          : "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={p.title}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />

                    <div className="p-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {p.title}
                      </h3>

                      {p.net_weight && (
                        <p className="text-gray-700 mt-1 text-sm">
                          Net Weight: {p.net_weight}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default Products;
