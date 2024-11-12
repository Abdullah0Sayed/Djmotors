// Import Congighure Store
import { configureStore } from "@reduxjs/toolkit";
import languageSlicer from "./slicers/languageSlicer";
import carBrandsSlicer from "./slicers/carBrandsSlicer";
import offerSlicer  from "./slicers/offersSlice";
import  compareCarsSlicer  from "./slicers/compareCarSlicer";

const store = configureStore({
    reducer: {
        webLanguage: languageSlicer,
        carBrands: carBrandsSlicer,
        offers: offerSlicer,
        compareCars: compareCarsSlicer
    }
});


// Export Store
export default store;