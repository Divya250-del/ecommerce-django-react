import apiClient from "./apiClient";

// 🧾 CREATE ORDER
export const createOrderApi = async (form) => {
  try {
    const response = await apiClient.post("/api/orders/create/", form);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to place order" };
  }
};

// Logged in User Orders
export const getMyOrdersApi = async () => {
  try {
    const response = await apiClient.get("/api/orders/");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch order" };
  }
};


export const getSellerOrdersApi = async () => {
  const response = await apiClient.get(
    "/api/seller/orders/"
  );

  return response.data;
};