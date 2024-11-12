import { createSlice } from "@reduxjs/toolkit";

// تحميل البيانات المحفوظة من localStorage أو sessionStorage
const loadCarsFromStorage = () => {
  const savedCars = localStorage.getItem("compareCars");
  if (savedCars) {
    return JSON.parse(savedCars);
  }
  return []; 
};

export const compareCarsSlicer = createSlice({
  name: "CompareCarsSlicer",
  initialState: {
    cars: loadCarsFromStorage(),  
    status: "empty",  
    error: null,  
  },
  reducers: {
    addCarToCompareList: (state, action) => {
      if (state.cars.length === 3) {
        state.status = "full";
        state.error = "Cars List To Compare is Full - Remove one Car From it";
        console.log(`Compare Cars List Now : ${state.cars}`);
      } else if (state.cars.length < 3) {
        const newCar = action.payload;
        state.cars.push(newCar);  // إضافة السيارة للـ list
        state.status = "not full";
        if (state.cars.length === 3) {
          state.status = "full";
        }
        console.log(`Compare Cars List Now After Add: ${state.cars}`);

        localStorage.setItem("compareCars", JSON.stringify(state.cars));
      }
    },
    removeCarFromCompareList: (state, action) => {
      state.cars = state.cars.filter(car => car.uuid !== action.payload.uuid); 
      state.status = state.cars.length === 0 ? "empty" : "not full";
      if (state.cars.length === 3) {
        state.status = "full";
      }

      localStorage.setItem("compareCars", JSON.stringify(state.cars));
    }
  }
});

// Export Actions
export const { addCarToCompareList, removeCarFromCompareList } = compareCarsSlicer.actions;
// Export Reducer
export default compareCarsSlicer.reducer;
