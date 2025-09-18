import axios from "axios";

const BASE_URL = "https://hastin-container.com/staging/app";

// Login API
export const loginApi = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};

// Verify OTP API
export const verifyOtpApi = async (otpData) => {
  const response = await axios.post(`${BASE_URL}/auth/aceess-code/validate`, otpData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Resend OTP API
export const resendOtpApi = async (userId) => {
  const response = await axios.post(
    `${BASE_URL}/auth/resend-otp`,
    { userId },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
