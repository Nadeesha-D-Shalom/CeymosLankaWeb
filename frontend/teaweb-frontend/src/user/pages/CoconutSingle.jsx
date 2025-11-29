import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import "../assets/styles/page-bg.css";

const CoconutSingle = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ceymoslanka.com/backend/api/coconut_manager/get_single_coconut.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProduct(data);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <UserLayout>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-600">
          Loading coconut details...
        </div>
      </UserLayout>
    );
  }

  if (!product) {
    return (
      <UserLayout>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-600">
          Product not found.
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="page-bg w-full py-24">

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-28">

          {/* LEFT IMAGE */}
          <div>
            <img
              src={`https://ceymoslanka.com/backend/uploads/coconut_products/${product.image}`}
              alt={product.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex flex-col justify-start">

            <h1 className="text-4xl font-bold text-gray-900 leading-snug mb-3">
              {product.title}
            </h1>

            <div className="w-24 h-[3px] bg-gray-900 mb-6"></div>

            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">

              <p>
                <span className="font-semibold text-[#C8A951]">Net Weight:</span>{" "}
                {product.net_weight}
              </p>

              {product.description && (
                <p>
                  <span className="font-semibold text-[#C8A951]">Description:</span>{" "}
                  {product.description}
                </p>
              )}

            </div>

          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default CoconutSingle;
