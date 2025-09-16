import React from "react";

function ProductList({ products }) {
  if (!products.length) return <p>No products to show.</p>;
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - ${p.price}
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
