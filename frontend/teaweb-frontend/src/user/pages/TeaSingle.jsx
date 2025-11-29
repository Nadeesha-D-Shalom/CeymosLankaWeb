import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import "../assets/styles/tea-bg.css";

const TeaSingle = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ceymoslanka.com/backend/api/tea_manager/get_single_tea.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProduct(data.product);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <UserLayout>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-600">
          Loading tea details...
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
      {/* FULL-WIDTH BACKGROUND */}
      <div className="tea-bg w-full py-24">

        {/* YOUR ORIGINAL CONTENT UNTOUCHED */}
        <div className="max-w-6xl mx-auto px-2 pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 pt-24 gap-28">

            <div>
              <img
                src={`https://ceymoslanka.com/backend/uploads/tea_products/${product.image}`}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </div>

            <div className="flex flex-col justify-start">
              <h1 className="text-4xl font-bold text-gray-900 leading-snug mb-3">
                {product.title}
              </h1>

              <div className="w-24 h-[3px] bg-gray-900 mb-6"></div>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">

                <p>
                  <span className="font-semibold text-[#C8A951]">Grade:</span>{" "}
                  {product.tea_grade}
                </p>

                <p>
                  <span className="font-semibold text-[#C8A951]">Net Weight:</span>{" "}
                  {product.net_weight}
                </p>

                {product.tasting_notes && (
                  <p>
                    <span className="font-semibold text-[#C8A951]">
                      Tasting Notes:
                    </span>{" "}
                    {product.tasting_notes}
                  </p>
                )}

                {product.ingredients && (
                  <p>
                    <span className="font-semibold text-[#C8A951]">
                      Ingredients:
                    </span>{" "}
                    {product.ingredients}
                  </p>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </UserLayout>
  );
};

export default TeaSingle;
