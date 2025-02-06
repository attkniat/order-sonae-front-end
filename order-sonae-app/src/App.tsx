import React from "react";
import ProductList from "./Components/Product/Products";
import CreateOrder from "./Components/Order/CreateOrder";
import OrderDetails from "./Components/Order/OrderDetails";
import InitializeProductsButton from "./Components/Product/InitializeProductsButton";
import ProductDetails from "./Components/Product/ProductDetails";
import UpdateOrderStatus from "./Components/Order/UpdateOrderStatus";
import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to OrdersSonae</h1>
        <p className={styles.subtitle}>Manage your products and orders efficiently</p>
      </header>
      
      <div className={styles.initializeButton}>
        <InitializeProductsButton />
      </div>
      
      <main className={styles.mainContent}>
        <section className={styles.productSection}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Products</h2>
            <ProductList />
            <ProductDetails />
          </div>
        </section>
        
        <section className={styles.orderSection}>
          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Orders</h2>
            <CreateOrder />
            <div className={styles.divider} />
            <OrderDetails />
            <div className={styles.divider} />
            <UpdateOrderStatus />
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;