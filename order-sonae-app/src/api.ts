import axios from "axios";
const API_URL = "https://localhost:7137";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProducts = async () => {
  const response = await api.get("/get-all");
  return response.data;
};

export const getProductById = async (productId: string) => {
    const response = await api.get(`/${productId}`);
    return response.data;
  };
  

export const initializeProducts = async () => {
    const response = await api.post("/initialize");
    return response.data;
  };

export const createOrder = async (productId: string, quantity: number) => {
  const response = await api.post("/order", {
    productId,
    quantity,
  });
  return response.data;
};

export const fetchOrder = async (orderId: string) => {
  const response = await api.get(`/order/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string, statusNumber: string) => {
  const response = await api.put(
    `/order/update-status`,
    { statusNumber },
    {
      params: {
        orderId,
      },
    }
  );
  return response.data;
};