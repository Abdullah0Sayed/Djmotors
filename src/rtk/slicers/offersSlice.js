import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOffers = createAsyncThunk('offers/fetchOffers', async () => {
    const response = await axios.get('http://127.0.0.1:8000/api/v1/offers');
    console.log(response.data.data);
    return response.data.data;
});

export const offerSlicer = createSlice({
    name: 'offerSlicer',
    initialState: {
        offers: [],
        status: 'OFF',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOffers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOffers.fulfilled, (state, action) => {
                state.status = 'Success';
                state.offers = action.payload;
            })
            .addCase(fetchOffers.rejected, (state, action) => {
                state.status = 'Rejected';
                state.error = action.error.message; // فقط تعيين الخطأ هنا
            });
    }
});

// تصدير reducer
export default offerSlicer.reducer;
