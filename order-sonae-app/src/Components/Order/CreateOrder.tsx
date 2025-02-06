import React, { useState } from "react";
import { useMutation } from "react-query";
import { createOrder } from "../../api";
import styles from "./CreateOrder.module.css";

const CreateOrder: React.FC = () => {
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [id, setId] = useState<string | null>(null);

  const { mutate, isLoading, error } = useMutation(
    (orderData: { productId: string; quantity: number }) =>
      createOrder(orderData.productId, orderData.quantity),
    {
      onSuccess: (data) => {
        setId(data);
      },
      onError: (error) => {
        console.error("Error creating order:", error);
      },
    }
  );

  const handleSubmit = () => {
    if (!productId) {
      alert("Please enter a product ID.");
      return;
    }
    mutate({ productId, quantity });
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Create Order</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="productId" className={styles.label}>
          Product ID:
        </label>
        <input
          id="productId"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Enter Product ID"
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="quantity" className={styles.label}>
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max="10"
          className={styles.input}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? "Creating Order..." : "Create Order"}
      </button>
      {error instanceof Error && (
        <div className={styles.error}>Error: {error.message}</div>
      )}
      {id && (
        <div className={styles.success}>
          Order created successfully! Order ID: {id}
        </div>
      )}
    </div>
  );
};

export default CreateOrder;