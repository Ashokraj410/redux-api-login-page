import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, verifyOtpApi } from "./Api/axiosInstance";

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      return response.data; // ✅ backend wraps inside .data
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(otpData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    token: localStorage.getItem("token") || null,
    accessCode: localStorage.getItem("accessCode") || null,
    otpMessage: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.accessCode = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.jwt;
        state.accessCode = action.payload.accessCode;

        // Save to localStorage
        localStorage.setItem("token", action.payload.jwt);
        localStorage.setItem("accessCode", action.payload.accessCode);
        localStorage.setItem("opaque", action.payload.opaque);

        // Save expiry as absolute timestamp
        const expiryTime = Date.now() + action.payload.accessExpiryInSecond * 1000;
        localStorage.setItem("expiry", expiryTime.toString());
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpMessage = action.payload.message || "OTP Verified!";
        state.accessCode = null; // clear OTP after success
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
