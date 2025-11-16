
import { createSlice } from "@reduxjs/toolkit";

const isClient = typeof window !== "undefined";
const TOKEN_EXPIRY_TIME = 60 * 60 * 1000; 

const isTokenExpired = () => {
  if (!isClient) return false;
  const expiryTime = Number(localStorage.getItem("adminTokenExpiry")) || 0;
  return expiryTime && Date.now() > expiryTime;
};

const getInitialState = () => {
  if (!isClient) {
    return {
      isAuthenticated: false,
      adminToken: "",
      adminUser: {},
      adminTokenExpiry: 0,
    };
  }

  if (isTokenExpired()) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminTokenExpiry");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    return {
      isAuthenticated: false,
      adminToken: "",
      adminUser: {},
      adminTokenExpiry: 0,
    };
  }

 
  return {
    isAuthenticated: !!localStorage.getItem("adminToken"),
    adminToken: localStorage.getItem("adminToken") || "",
    adminUser: JSON.parse(localStorage.getItem("adminUser") || "{}"),
    adminTokenExpiry: Number(localStorage.getItem("adminTokenExpiry")) || 0,
  };
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      const { adminToken, adminUser, username, password } = action.payload;
      state.isAuthenticated = true;
      state.adminToken = adminToken;
      state.adminUser = adminUser;

      if (isClient) {
        try {
          const adminExpiryTime = new Date().getTime() + TOKEN_EXPIRY_TIME;
          state.adminTokenExpiry = adminExpiryTime;
          localStorage.setItem("adminToken", adminToken);
          localStorage.setItem("adminUser", JSON.stringify(adminUser));
          localStorage.setItem("adminTokenExpiry", adminExpiryTime.toString());
          localStorage.setItem("loggedIn", "true");


          if (username && password) {
            localStorage.setItem("username", username);
            localStorage.setItem("password", password);
          }

          console.log(
            "Token set to expire at:",
            new Date(adminExpiryTime).toLocaleString()
          );
        } catch (error) {
          console.error("Failed to set token expiry:", error);
          state.isAuthenticated = false;
          state.adminToken = "";
          state.adminUser = {};
          state.adminTokenExpiry = 0;
        }
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.adminToken = "";
      state.adminUser = {};
      state.adminTokenExpiry = 0;

      if (isClient) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminTokenExpiry");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
    checkTokenExpiry: (state) => {

      if (!isClient || !state.isAuthenticated) return;

      if (isTokenExpired()) {
        state.isAuthenticated = false;
        state.adminToken = "";
        state.adminUser = {};
        state.adminTokenExpiry = 0;

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        localStorage.removeItem("adminTokenExpiry");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
    },
  },
});

export const { login, logout, checkTokenExpiry } = adminAuthSlice.actions;
export const selectCheckAuthentication = (state) =>
  state.adminAuth.isAuthenticated;
export const selectCurrentAdminUser = (state) => state.adminAuth.adminUser;
export const selectAdminToken = (state) => state.adminAuth.adminToken;
export default adminAuthSlice.reducer;
