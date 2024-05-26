import { createSlice } from "@reduxjs/toolkit";

export const teacherAvaliableSlice = createSlice({
  name: "teacherAvaliable",
  initialState: {
    teacherAvaliable: null,
  },
  reducers: {
    SetAvaliableTeacher: (state, action) => {
      state.teacherAvaliable = action.payload;
    },
    ClearAvaliableTeacher: (state) => {
      state.student = null; // Clear the student data
    },
  },
});

export const { SetAvaliableTeacher, ClearAvaliableTeacher } =
  teacherAvaliableSlice.actions;
