import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// import { toast.error, toast.success } from '@/utils/Notification/notif';
import { toast } from 'react-hot-toast';
// Initial state
const initialState = {
    products: [],
    isLoading: false,
    error: null,
};
let notificationShown= false
// Async Thunk for fetching products
export const getProducts = createAsyncThunk(
    "getProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "https://fakestoreapi.com/products"
            );
            if (!notificationShown) {
                toast.success(
                    'Success',
                    'Product Fetched Successfully',
                    3000
                );
                notificationShown = true;
            }
            return response.data;
        } catch (error) {
            if (!notificationShown) {
                toast.error(
                    'Error',
                    'Product Fetch failed',
                    3000
                );
                notificationShown = true;
            }
            return rejectWithValue(error.response.data);
        }
    }
);

// Product Slice
const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Export actions and reducer
export default productSlice.reducer;