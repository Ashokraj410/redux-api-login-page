import axios from "axios";

const BASE_URL = "https://hastin-container.com/staging/app";


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

  
 export const containerApi = axios.create({
   base_URL:"https://hastin-container.com/staging/",
  headers: {
    
    "Content-Type": "application/json",
    "Aid":"86f15c81-66d3-4237-bb29-6c4e7a9daacf",
  },
});

// Automatically add token from localStorage
containerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `BslogiKey ${token}`; // or BslogiKey if needed
  }
  return config;
});


