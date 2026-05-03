
import apiClient from "./apiClient";

// 📝 REGISTER
export const registerApi = async (form, role) => {
  try {
    const response = await apiClient.post("/api/register/", {
      ...form,
      role: role || "customer",
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Registration failed" };
  }
};

export const logoutApi = async () => {
  const response = await apiClient.post("/api/logout/");
  return response.data;
};