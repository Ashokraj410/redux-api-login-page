import axiosInstance from "./axios";

export const loginApi = async (userName, password) => {
  const payload = { userName, password, origin: "AGENT" };
  console.log("Login payload:", payload);

  try {
    const response = await axiosInstance.post("/login", payload);
    return response.data; // { token: "..." }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
