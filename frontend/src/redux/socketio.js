import { createSlice } from "@reduxjs/toolkit";
const socketioslice=createSlice({
    name:"socketio",
    initialState:{
        socket:null
        
    },
    reducers:{
        setSocket:(state,action)=>{
            state.socket=action.payload;
        },
       
    }
})
export const {setSocket}=socketioslice.actions;
export default socketioslice.reducer;