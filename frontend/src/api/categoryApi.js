import apiClient from "./apiClient";
export const getCategoriesApi = async (params) => {
  try {
    const response = await apiClient.get("/api/categories/", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch Categories" };
  }
};