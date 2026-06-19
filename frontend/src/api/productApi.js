import apiClient from "./apiClient";

// 🧾 CREATE PRODUCT

export const createProductApi = async (formData) => {
  try{
  const response = await apiClient.post("api/products/create/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    
  });

  return response.data;
  }
  catch (error) {
    throw error.response?.data || { error: "Failed to create product" };
  }
};

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

export const updateProductApi = async (id, formData) => {
  try {
    const response = await apiClient.put(
      `/api/products/${id}/manage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to update product" };
  }
};

export const deleteProductApi = async (id) => {
  try {
    const response = await apiClient.delete(
      `/api/products/${id}/manage`
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      error: "Failed to delete product",
    };
  }
};

export const fetchSellerOwnProducts = async () => {
    const response = await apiClient.get("api/seller/products/");
    return response.data;
};