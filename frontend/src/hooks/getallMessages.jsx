import { setMessages } from '@/redux/chatpage';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const getallMessages = () => {
  const dispatch=useDispatch();
  const {selectedUser}=useSelector(store=>store.auth);
  useEffect(()=>{
    const fetchallMessages=async ()=>{
        try{
            const res=await axios.get(`https://instagram-clone-3-cfe5.onrender.com/api/v1/message/all/${selectedUser?._id}`,
               
                
                {withCredentials:true}
            )
            if(res.data.success){
               
                dispatch(setMessages(res.data.message));
            }
        }
        catch(error){
            console.log(error);
        }
    }
    fetchallMessages();
  }, [selectedUser])
}

export default getallMessages
