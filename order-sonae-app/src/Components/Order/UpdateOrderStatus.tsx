import React, { useState } from "react";
import { useMutation } from "react-query";
import { updateOrderStatus } from "../../api";
import styles from "./UpdateOrderStatus.module.css";

const UpdateOrderStatus: React.FC = () => {
  const [orderId, setOrderId] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);

  const { mutate, isLoading, isError, error } = useMutation(
    (payload: { orderId: string; statusNumber: string }) =>
      updateOrderStatus(payload.orderId, payload.statusNumber),
    {
      onSuccess: (data) => {
        setMessage(`Order status updated successfully! Response: ${JSON.stringify(data)}`);
      },
      onError: (error) => {
        setMessage("Failed to update order status.");
        console.error("Error updating order status:", error);
      },
    }
  );

  const handleUpdateStatus = () => {
    if (!orderId) {
      alert("Please enter an order ID.");
      return;
    }
    if (status === 0) {
      alert("Please select a valid status.");
      return;
    }

    const payload = {
      orderId,
      statusNumber: status.toString(),
    };

    console.log("Sending payload:", payload);

    mutate(payload);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Update Order Status</h3>
      <div className={styles.inputGroup}>
        <label htmlFor="orderId" className={styles.label}>
          Order ID:
        </label>
        <input
          id="orderId"
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="status" className={styles.label}>
          Status:
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
          className={styles.select}
        >
          <option value={0}>Pending</option>
          <option value={1}>Shipped</option>
          <option value={2}>Delivered</option>
          <option value={3}>Cancelled</option>
        </select>
      </div>
      <button
        onClick={handleUpdateStatus}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? "Updating Status..." : "Update Status"}
      </button>
      {isError && error instanceof Error && (
        <div className={styles.error}>Error: {error.message}</div>
      )}
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default UpdateOrderStatus;