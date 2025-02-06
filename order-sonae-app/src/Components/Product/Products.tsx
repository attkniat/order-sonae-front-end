import React from "react";
import { useQuery } from "react-query";
import { fetchProducts } from "../../api";
import { ProductDto } from "../../types";
import styles from "./Products.module.css"; // Import the CSS module

const Products: React.FC = () => {
  const { data, error, isLoading } = useQuery<ProductDto[]>("products", fetchProducts);

  if (isLoading) return <div className={styles.loading}>Loading products...</div>;
  if (error instanceof Error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
  <h2 className={styles.title}>Products</h2>
  <div className={styles.list}>
    <div className={styles.header}>
      <span>Name</span>
      <span>Price</span>
      <span>ID</span>
    </div>
    {data?.map((product) => (
      <div key={product.id} className={styles.listItem}>
        <span>{product.name}</span>
        <span>${product.price}</span>
        <span>{product.id}</span>
      </div>
    ))}
  </div>
</div>
  );
};

export default Products;