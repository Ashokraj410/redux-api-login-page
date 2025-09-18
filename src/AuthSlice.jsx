import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, verifyOtpApi, resendOtpApi } from "./Api/axiosInstance"; // adjust path

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await loginApi(credentials);
      return data; // { user: {...}, accessCode: '123456', token: '...' }
    } catch (err) {
      if (err.response) return rejectWithValue(err.response.data);
      if (err.request) return rejectWithValue({ message: "Network Error" });
      return rejectWithValue({ message: err.message });
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "/auth/aceess-code/validate",
  async (otpData, { rejectWithValue }) => {
    try {
      const data = await verifyOtpApi(otpData);
      return data;
    } catch (err) {
      if (err.response) return rejectWithValue(err.response.data);
      if (err.request) return rejectWithValue({ message: "Network Error" });
      return rejectWithValue({ message: err.message });
    }
  }
);

// Resend OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await resendOtpApi(userId);
      return data;
    } catch (err) {
      if (err.response) return rejectWithValue(err.response.data);
      if (err.request) return rejectWithValue({ message: "Network Error" });
      return rejectWithValue({ message: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
    error: null,
    otpMessage: null,
    accessCode: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.otpMessage = null;
      state.accessCode = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
        state.user = action.payload.user;
        state.accessCode = action.payload.accessCode;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
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
        state.otpMessage = action.payload.message;
        state.accessCode = null; // clear OTP after verification
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Resend OTP
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.otpMessage = action.payload.message;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
