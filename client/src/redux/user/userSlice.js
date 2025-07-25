import { createSlice } from "@reduxjs/toolkit";

const initialState={
  currentUser:null,
  error:null,
  loading:false,
}
const userSlice=createSlice({
  name:'user',
  initialState,
 reducers: {
    signInStart: (state) => {
      state.loading = true;
    
    }, 
    signInSuccess:(state,action)=>{
      state.currentUser=action.payload,
      state.loading=false,
      state.error=null;
    },
    signInFailure:(state,action)=>{
       state.error=action.payload,
       state.loading=false;
    },
    resetError: (state) => {
      state.error = null;  // ✅ This clears the error
    },
      updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserStart: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserStart: (state) => {
  state.loading = true;
},
signOutUserSuccess: (state) => {
  state.loading = false;
  state.currentUser = null;
},
signOutUserFailure: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},

  },

})
export const{signInStart, signInSuccess,signInFailure,resetError,updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,signOutUserFailure,signOutUserSuccess }=userSlice.actions;
export default userSlice.reducer