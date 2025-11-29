import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import "../assets/styles/rice-bg.css";

const RiceSingle = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://ceymoslanka.com/backend/api/rice_manager/get_single_rice.php?id=${id}`)
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
          Loading rice details...
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
      <div className="rice-bg w-full">
        <div className="max-w-6xl mx-auto px-2 pt-24 pb-16">

          <div className="grid grid-cols-1 lg:grid-cols-2 pt-24 gap-28">

            <div>
              <img
                src={`https://ceymoslanka.com/backend/uploads/rice_products/${product.image}`}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-md"
              />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.title}</h1>
              <div className="w-24 h-[3px] bg-gray-900 mb-6"></div>

              <p className="text-lg text-gray-700 mb-4">
                <span className="font-semibold text-[#C8A951]">Net Weight:</span>{" "}
                {product.net_weight}
              </p>

              <p className="text-lg leading-relaxed text-gray-700">
                <span className="font-semibold text-[#C8A951]">Description:</span>{" "}
                {product.description}
              </p>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default RiceSingle;
