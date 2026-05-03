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