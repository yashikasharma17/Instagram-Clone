import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import SuggestedUsers from './SuggestedUsers';
import { Input } from './ui/input';
import { setSelectedUser } from '@/redux/authslice';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatpage';

const ChatPage = () => {

  const { user, selectedUser, suggestedUsers } = useSelector(
    store => store.auth
  );
  const [textmessage,settextmessage]=useState("");
  const {onlineUsers,messages}=useSelector(store=>store.chat);
  console.log("onlineusers",onlineUsers)
  const dispatch=useDispatch();
  const messagehandler=async(receiverid)=>{
try {
  const res=await axios.post(`http://localhost:8000/api/v1/message/send/${receiverid}`,{textmessage},{
    headers:{
      'Content-type':'application/json'
    },
    withCredentials:true
  })
  if(res.data.success){
    dispatch(setMessages([...messages,res.data.newmessage]));
    settextmessage("");
  }
} catch (error) {
  console.log(error);
}
  }
useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);
  return (
    <div className="flex ml-[1%] h-screen">

      <section className="w-full md:w-1/4 my-5">

        <h1 className="text-xl font-bold px-1 mb-4">
          {user?.username}
        </h1>

        <hr className="mb-4 border-gray-300" />

        <div className="overflow-y-auto h-[80vh] ">

          {suggestedUsers?.map((suggestedUser) => {
const isOnline=onlineUsers?.includes(suggestedUser?._id);
            return (
              <div onClick={()=>dispatch(setSelectedUser(suggestedUser))}
                key={suggestedUser._id}
                className="flex items-center gap-4 p-2 mb-6  border-b border-gray-300 hover:cursor-pointer "
              >

                <Avatar>
                  <AvatarImage
                    src={suggestedUser?.profilepic}
                    alt="profile"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold text-sm">
                    {suggestedUser?.username}
                  </p>
                  <span className={`text-xs font-bold ${isOnline? 'text-green-600':'text-red-600'}`}>{isOnline?"Online":"Offline"}</span>
                  
                </div>
               

              </div>
            );

          })}

        </div>

      </section>
{
    selectedUser ? (
<section className='flex-1 border-l border-l-gray-300 flex flex-col h-full '>
<div className='flex gap-3 border-b border-gray-300 items-center px-3 py-2 sticky top-0 bg-white z-10'>
   <Avatar>
                  <AvatarImage
                    src={selectedUser?.profilepic}
                    alt="profile"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className='flex flex-col'>
                  <span className="font-semibold text-sm">
                    {selectedUser?.username}
                  </span>
                </div>
                  
</div>
<Messages selectedUser={selectedUser}/>
<div className="flex items-center p-4 border-t border-t-gray-300">
  <Input value={textmessage} type="text" onChange={(e)=>settextmessage(e.target.value)} className="flex-1 mr-2 focus-visible:ring-transparent " placeholder="Messages"/>
  <Button onClick={()=>messagehandler(selectedUser?._id)} className="hover:bg-blue-600 hover:text-white hover:cursor-pointer">Send</Button>
</div>
</section>
):
(
  <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full '>
 <div className='flex flex-col items-center justify center mx-auto py-42' >
  <MessageCircleCode className='h-32 w-32 my-4'/>
  <h1 className='font-medium'>Your Messages</h1>
  <span>Send a Message to start a chat</span>
</div>

  </section>
 


   
    

    )
}
    </div>
  );
};

export default ChatPage;