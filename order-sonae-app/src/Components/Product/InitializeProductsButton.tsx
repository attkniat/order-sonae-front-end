import React from "react";
import { useMutation } from "react-query";
import { initializeProducts } from "../../api";
import styles from "./InitializeProductsButton.module.css";

const InitializeProductsButton: React.FC = () => {
  const { mutate, isLoading, isError, error } = useMutation(initializeProducts, {
    onSuccess: (data) => {
      alert("Products initialized successfully!");
      console.log("Initialized Products:", data);
    },
    onError: (error) => {
      alert("Failed to initialize products.");
      console.error("Error:", error);
    },
  });

  const handleInitializeProducts = () => {
    mutate();
  };

  return (
    <div className={styles.container}>
      <button
        onClick={handleInitializeProducts}
        disabled={isLoading}
        className={styles.button}
      >
        {isLoading ? "Initializing..." : "Initialize Products"}
      </button>
      {isError && error instanceof Error && (
        <div className={styles.error}>Error: {error.message}</div>
      )}
    </div>
  );
};

export default InitializeProductsButton;