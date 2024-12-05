import { configureStore } from "@reduxjs/toolkit";
import navbarSlicerReducer from "./navbar/navbarSlicer";
import productSlice from './product/productSlice'
export const store = configureStore({
  reducer: {
    navbar: navbarSlicerReducer,
    product:productSlice
  },
});