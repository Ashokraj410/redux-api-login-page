import axios from "axios";

const BASE_URL = "https://91.203.132.120/staging/app";

export const loginApi = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });
  return response.data;
};


// Verify OTP API
export const verifyOtpApi = async (otpData) => {
  const token = localStorage.getItem("token")
  console.log(token)
  const response = await axios.post(
    `${BASE_URL}/auth/access-code/validate`,
    {
      accessCode: otpData.accessCode, //  OTP
      opaque: localStorage.getItem("opaque"), // from login response
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `BslogiKey ${token}`
      },
    }
  );
  return response.data;
};



