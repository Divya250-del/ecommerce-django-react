import apiClient from "./apiClient";



// 🔐 LOGIN
export const loginApi = async (formData) => {
  const response = await apiClient.post("/api/login/", formData);
  return response;
};



export const createCartApi = async () => {
  try {
    const response = await apiClient.post("/api/createcart/");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to create cart" };
  }
};

export const getCartApi = async () => {
  const response = await apiClient.get("/api/cart/");
  return response.data;
};

export const addToCartApi = async (productId) => {
  const response = await apiClient.post("/api/cart/add/", {
    product_id: productId,
  });
  return response.data;
};

export const removeFromCartApi = async (itemId) => {
  const response = await apiClient.post("/api/cart/remove/", {
    item_id: itemId,
  });
  return response.data;
};

export const updateCartQuantityApi = async (itemId, quantity) => {
  const response = await apiClient.post("/api/cart/update/", {
    item_id: itemId,
    quantity,
  });
  return response.data;
};