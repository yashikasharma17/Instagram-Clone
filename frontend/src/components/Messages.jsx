import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import getallMessages from '@/hooks/getallMessages';
import getRTN from '@/hooks/getRTN';

const Messages = ({selectedUser}) => {
    getRTN();
    getallMessages();
    const {user}=useSelector(store=>store.auth);
    const {messages}=useSelector(store=>store.chat);
  return (
    <div className='overflow-y-auto flex-1 p-4'>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center justify-center'>
 <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilepic} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
       
       
          <p className='font-semibold text-sm'>{selectedUser?.username}</p>
          <Link to={`/profile/${selectedUser?._id}`}>
          <Button className='text-white text-sm h-8 my-2 bg-blue-600 hover:bg-black cursor-pointer' variant="secondary">View Profile</Button>
          </Link>
       
       
         
          
        </div >
    </div >
    <div className='flex flex-col gap-3'>
        {
messages && messages.map((msgs)=>{
    return(
        <div className={`flex ${msgs.senderId===user?._id ?'justify-end':'justify-start'}`} key={msgs._id}>
            <div className={`rounded-md p-2 max-w-xs break-words ${msgs.senderId===user?._id? 'bg-blue-500 text-white':'bg-gray-300 text-black'} `}>
{msgs.message}
            </div>
        </div>
        
    )
})
        }
    </div>
    </div>
  )
}

export default Messages;
