// Import Create Slicer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
// Import Axios
import axios from "axios";

export const fetechAllCarBrands = createAsyncThunk('carBrandsSlicer/fetchAllBrands' , async()=>{
    const response = await axios.get('http://127.0.0.1:8000/api/v1/car-brands');
    console.log(response.data.data); // This is optional for debugging
    return response.data.data;
})

export const carBrandsSlicer = createSlice({
    initialState: {
        brands: [], 
        status: 'OFF', 
        error: null
    },
    name: 'carBrandsSlicer',
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetechAllCarBrands.pending , (state , action)=>{
            state.status = 'loading';
            
            console.log('Loading');
        }).addCase(fetechAllCarBrands.fulfilled , (state , action)=>{
            state.status = 'Success';
            state.brands = action.payload
        }).addCase(fetechAllCarBrands.rejected , (state , action)=>{
            state.status = 'Rejected';
            state.error = action.error.message
        })
    }
})


// Export the reducer
export default carBrandsSlicer.reducer;