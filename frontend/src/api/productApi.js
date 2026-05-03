import apiClient from "./apiClient";
export const getProductByIdApi = async (id) => {
  try {
    const response = await apiClient.get(`/api/products/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch product" };
  }
};

export const getProductsApi = async (params) => {
  try {
    const response = await apiClient.get("/api/products/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch products" };
  }
};