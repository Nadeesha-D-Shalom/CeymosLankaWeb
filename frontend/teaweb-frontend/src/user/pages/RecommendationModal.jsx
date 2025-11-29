import React from "react";

const RecommendationModal = ({ open, onClose, products }) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Recommended Products
        </h2>

        {/* PRODUCT SECTIONS */}
        {Object.entries(products).map(([category, list]) => (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
              {category}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {list.map((item) => (
                <a
                  key={item.id}
                  href={`/${category}/${item.id}`}
                  className="border rounded-md shadow-sm hover:shadow-md transition block bg-white"
                >
                  <img
                    src={`https://ceymoslanka.com/backend/uploads/${category}_products/${item.image}`}
                    alt={item.title}
                    className="w-full h-36 object-cover rounded-t-md"
                  />
                  <div className="p-3">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="w-full py-2 border mt-4 rounded bg-gray-100 hover:bg-gray-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RecommendationModal;
