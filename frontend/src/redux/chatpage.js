import { createSlice } from "@reduxjs/toolkit";
const chatpageslice=createSlice({
    name:"chat",
    initialState:{
        onlineUsers:[],
        messages:[]
        
    },
    reducers:{
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
        },
         setMessages:(state,action)=>{
            state.messages=action.payload;
        },
       
    }
})
export const {setOnlineUsers,setMessages}=chatpageslice.actions;
export default chatpageslice.reducer;