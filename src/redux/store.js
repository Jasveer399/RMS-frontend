import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alerts";
import { teacherAvaliableSlice } from "./teacherAvaliable";
import { studentSlice } from "./students";
const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  teacherAvaliable: teacherAvaliableSlice.reducer,
  student: studentSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;