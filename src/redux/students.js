import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: null,  // Initial state with no student
  },
  reducers: {
    SetStudent: (state, action) => {
      state.student = action.payload;  // Set the student data
    },
    ClearStudent: (state) => {
      state.student = null;  // Clear the student data
    }
  },
});

export const { SetStudent, ClearStudent } = studentSlice.actions;
export default studentSlice.reducer;
