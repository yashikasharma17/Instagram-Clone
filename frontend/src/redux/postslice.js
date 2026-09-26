import { createSlice } from "@reduxjs/toolkit";
const postslice=createSlice({
    name:"posts",
    initialState:{
        posts:[],
        selectedPost:null
    },
    reducers:{
        setPosts:(state,action)=>{
            state.posts=action.payload;
        },
        setSelectedPost:(state,action)=>{
            state.selectedPost=action.payload;
        }
    }
})
export const {setPosts, setSelectedPost}=postslice.actions;
export default postslice.reducer;