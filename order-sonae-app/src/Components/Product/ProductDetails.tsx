import React, { useState } from "react";
import { useQuery } from "react-query";
import { getProductById } from "../../api";
import styles from "./ProductDetails.module.css";

const ProductDetails: React.FC = () => {
  const [productId, setProductId] = useState<string>("");
  const { data, error, isLoading } = useQuery(
    ["product", productId],
    () => getProductById(productId),
    { enabled: !!productId }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
  };

  if (isLoading) return <div className={styles.loading}>Loading product...</div>;
  if (error instanceof Error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Get Product by ID</h2>
      <input
        type="text"
        placeholder="Enter product ID"
        onChange={handleInputChange}
        className={styles.input}
      />
      {data && (
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <strong>Id:</strong> {data.id}
          </div>
          <div className={styles.detailItem}>
            <strong>Name:</strong> {data.name}
          </div>
          <div className={styles.detailItem}>
            <strong>Price:</strong> {data.price}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;