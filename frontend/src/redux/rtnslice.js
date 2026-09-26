import { createSlice } from "@reduxjs/toolkit";

const rtnslice = createSlice({
    name:'real',
    initialState:{
        likeNotification:[], // [1,2,3]
    },
    reducers:{
        setLikeNotification:(state,action)=>{
            if(action.payload.type === 'like'){
                state.likeNotification.push(action.payload);
            }else if(action.payload.type === 'dislike'){
                state.likeNotification = state.likeNotification.filter((item)=> item.userId !== action.payload.userId);
            }
        }
    }
});
export const {setLikeNotification} = rtnslice.actions;
export default rtnslice.reducer;