import { setMessages } from '@/redux/chatpage';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const getRTN = () => {
    const {socket}=useSelector(store=>store.socketio);
    const {messages}=useSelector(store=>store.chat);

  const dispatch=useDispatch();
  useEffect(()=>{
   socket?.on('newmessage',(newmessage)=>{
    dispatch(setMessages([...messages,newmessage]));
   })

     return()=>{
        socket?.off('newmessage');
     }   
   
  }, [messages,setMessages])
}

export default getRTN
