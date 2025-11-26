import React from 'react';

const ProductCard = ({ title, image, weight }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{weight}</p>
    </div>
  );
};

export default ProductCard;
