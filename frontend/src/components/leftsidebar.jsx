import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from "../redux/authslice";
import Createdialog from './Createdialog';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from './ui/button';


const Leftsidebar = () => {
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const {user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const {likeNotification}=useSelector(store=>store.real);
    const sidebaritems=
    //here icons are actuall icons from lucid 
    [
        {icon:<Home/> ,text:"Home"},
        {icon:<Search/> ,text:"Search"},
        {icon:<TrendingUp/> ,text:"Explore"},
        {icon:<MessageCircle/> ,text:"Messages"},
        {icon:<Heart/>, text:"Notifications"},
        {icon:<PlusSquare/>,text:"Create"},
        {
            icon:(
            <Avatar className="w-6 h-6" >
  <AvatarImage src={user?.profilepic}/>
  <AvatarFallback>YS</AvatarFallback>
</Avatar>
            ),
            text:"Profile"
        },
        {icon:<LogOut/>,text:"Logout"}
    ]
    
    const logout= async ()=>{
try{
const res= await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials:true});
if(res.data.success){
    dispatch(setAuthUser(null));
    toast.success(res.data.message);
    navigate("/login");
}

}
catch(error){
    console.log(error);
    toast.error(error.response.data.message);
}
    }
    
    const sidebarhandler=(typetext)=>{
if(typetext==='Logout'){
    logout();
}
else if(typetext==="Create"){
setOpen(true);
}
else if(typetext==="Profile"){
    navigate(`/profile/${user?._id}`);
}
else if(typetext==="Home"){
    navigate("/");
}
else if(typetext==="Messages"){
    navigate("/chat");
}
    }
  return (
    <div className='fixed top-0 left-0 z-10 px-4 border-r border-gray-300 w-[16%] h-screen'>
        <div className='flex flex-col'>
             <h1 className='flex justify-center items-center '>
            <img src="instagram-new-logo.png" alt="logo"  className='w-35 h-15'/>
          </h1>
            <div >
                {
                    sidebaritems.map((item,index)=>{
                        //here whats happening that sidebaritems map both the icon and text , 
                        //and for both of these a separate div is created , 
                        //for eg <div>
                        //home
                        //</div>
                        //<div>
                        //search
                        //</div>-like this and clicking on every text of that sidebar results in sidebarhandler function to activate 
                        return(
                            <div onClick={()=>sidebarhandler(item.text)} key={index} className='
                            flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
                                {item.icon}
                                <span>{item.text}</span>
                                {
item.text==="Notifications" && likeNotification.length > 0 && (
<Popover>
  <PopoverTrigger asChild>
    <Button size="icon" className="rounded-full bottom-6 left-6 bg-red-600 hover:bg-red-600 h-5 w-5 hover:cursor-pointer">{likeNotification.length}</Button>
    
  </PopoverTrigger>
  <PopoverContent>
    <div>
        {
            likeNotification.length === 0 ?(
                <p>NO NEW NOTIFICATION</p>
            ):(
                likeNotification.map((notification)=>{
                    return(
                        <div key={notification.userId} className='flex item-center gap-2'>
                            <Avatar>
                                <AvatarImage src={notification.userDetails?.profilepic}/>
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username }</span> Liked your Post</p>
                            </div>
                    )
                })
            )
        }
    </div>
    
  </PopoverContent>
</Popover>
)
                                }
                                </div>
                        )
                    })
                }
            </div>
        </div>
        <Createdialog open={open} setOpen={setOpen}/>
      
    </div>
  )
}

export default Leftsidebar
