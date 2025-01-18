import { configureStore } from "@reduxjs/toolkit";

import navbarSlicerReducer from "./navbar/navbarSlicer";
import productSlice from "./product/productSlice";
import cartSlice from "./cart/cartSlice";
import wishlistReducer from "./wishlist/wishlistSlice";
import authReducer from "./auth/authSlice";
import popupReducer from './popup/popupSlice'
// Combine all reducers

export const store = configureStore({
  reducer: {
    navbar: navbarSlicerReducer,
    product: productSlice,
    cart: cartSlice,
    wishlist: wishlistReducer,
    auth: authReducer,
    popup: popupReducer
  },
});
