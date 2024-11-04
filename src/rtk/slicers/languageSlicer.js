// Import necessary libraries
import { createSlice } from "@reduxjs/toolkit";
import i18n from '../../i18n'; // assuming the i18n file is located at src/i18n.js

// Create the slice
export const languageSlice = createSlice({
    name: 'langSlice',
    initialState: i18n.language || 'ar', // Get the current language from i18next or default to 'ar'
    reducers: {
        // Action to set the language dynamically
        setWebLanguage: (state, action) => {
            const newLanguage = action.payload;
            i18n.changeLanguage(newLanguage); // Change the language in i18next
            return newLanguage; // Update the state in Redux
        },
        // Action to get the current language
        getWebLanguage: (state) => {
            return state; // Return the current state (language)
        }
    }
});

// Export Actions & Reducers
export const { setWebLanguage, getWebLanguage } = languageSlice.actions;

export default languageSlice.reducer;
