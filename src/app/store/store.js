import { configureStore } from "@reduxjs/toolkit";
import adminAppSlice from "./admin/adminAppSlice";
import adminAuthSlice from "./admin/adminAuthSlice";

const balajiInteriorStore = configureStore({
  reducer: {
    adminApp: adminAppSlice,
    adminAuth: adminAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 128,
      },
    }),
});

export default balajiInteriorStore;
