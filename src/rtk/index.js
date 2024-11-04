// Import Congighure Store
import { configureStore } from "@reduxjs/toolkit";
import languageSlicer from "./slicers/languageSlicer";
import carBrandsSlicer from "./slicers/carBrandsSlicer";
import offerSlicer  from "./slicers/offersSlice";

const store = configureStore({
    reducer: {
        webLanguage: languageSlicer,
        carBrands: carBrandsSlicer,
        offers: offerSlicer,
    }
});


// Export Store
export default store;