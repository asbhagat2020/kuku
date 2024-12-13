import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import navbarSlicerReducer from "./navbar/navbarSlicer";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import authReducer from "./auth/authSlice";

// Combine all reducers
const rootReducer = combineReducers({
  navbar: navbarSlicerReducer,
  product: productSlice,
  cart: cartSlice,
  wishlist: wishlistReducer,
  auth: authReducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for localStorage
  storage,     // Use localStorage to persist data
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor
export const persistor = persistStore(store);
