import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchOrder } from "../../api";
import styles from "./OrderDetails.module.css";

const OrderDetails: React.FC = () => {
  const [orderId, setOrderId] = useState<string>("");
  const { data, error, isLoading } = useQuery(
    ["order", orderId],
    () => fetchOrder(orderId),
    { enabled: !!orderId }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId(e.target.value);
  };

  const getStatusClassName = (status: string) => {
    const baseClass = styles.status;
    const statusClass = {
      pending: styles.statusPending,
      processing: styles.statusProcessing,
      completed: styles.statusCompleted,
      cancelled: styles.statusCancelled,
    }[status.toLowerCase()] || styles.statusPending;
    
    return `${baseClass} ${statusClass}`;
  };

  if (isLoading) return <div className={styles.loading}>Loading order...</div>;
  if (error instanceof Error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Get Order by ID</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter Order ID"
          value={orderId}
          onChange={handleInputChange}
        />
      </div>
      {data && (
        <div className={styles.orderDetails}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Order ID:</span>
            <span className={styles.value}>{data.id}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Product ID:</span>
            <span className={styles.value}>{data.productId}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Quantity:</span>
            <span className={styles.value}>{data.quantity}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Status:</span>
            <span className={getStatusClassName(data.status)}>{data.status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;