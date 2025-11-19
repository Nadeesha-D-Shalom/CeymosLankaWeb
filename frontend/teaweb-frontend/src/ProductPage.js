import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE from "./api";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/get_product.php?id=${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{product.name}</h2>

      {product.image && (
        <img
          src={`http://localhost/TeaWeb/backend/uploads/${product.image}`}
          alt={product.name}
          style={{ width: "300px", borderRadius: "10px" }}
        />
      )}

      <p><b>Category:</b> {product.category_id}</p>
      <p><b>Description:</b> {product.description}</p>
      <p><b>Price:</b> Rs. {product.price}</p>

      <button style={{ marginTop: "20px" }}>Add to Cart</button>
    </div>
  );
}

export default ProductPage;
