import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '@/redux/authslice';
import { toast } from 'sonner';
import axios from 'axios';

const EditProfile = () => {
    const {user}=useSelector(store=>store.auth);
    const imageref=useRef();
    const [loading,setLoading]=useState(false);
    const [input,setInput]=useState({
        "bio":user?.bio,
        "profilepic":user?.profilepic,
        "gender":user?.gender
 } )
 const navigate=useNavigate();
 const dispatch=useDispatch();
 const filehandler=(e)=>{
    const file=e.target.files?.[0];
    if(file){
        setInput({...input,profilepic:file});
    }
 }
 const setgender=(value)=>{
    setInput({...input,gender:value});
 }
 const editprofilehandler=async()=>{
    const formdata=new FormData();
    formdata.append("bio",input.bio);
    formdata.append("gender",input.gender);
    if(input.profilepic){
        formdata.append("profilepic",input.profilepic);

    }
try{
setLoading(true);
const res=await axios.post('https://instagram-clone-3-cfe5.onrender.com/api/v1/user/profile/edit',formdata,{

    headers:{
        'Content-Type':'multipart/form-data'
    },
    withCredentials:true
})
if(res.data.success){
    const updateduser={
        ...user,//saving the previous users values while changing given below values
        bio:res.data.user?.bio,
        profilepic:res.data.user?.profilepic,
        gender:res.data.user?.gender
    };
    dispatch(setAuthUser(updateduser));
toast.success(res.data.message);
navigate(`/profile/${user?._id}`);
}

}catch(error){
    console.log(error);
   
}
finally{
    setLoading(false);
}
 }
  return (
    <div className='flex max-w-10xl mx-auto pl-10'>
        <section className='flex flex-col gap-5 w-full my-8'>
            <h1 className='text-xl font-bold w-fit pl-50'>Edit Profile</h1>
            <div className='flex items-center justify-between gap-5 bg-gray-100 rounded-xl p-4 ml-50 max-w-xl'>
                <div className='flex items-center gap-2'>
       
          <Avatar>
            <AvatarImage src={user?.profilepic} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
       
        <div>
          <p className='font-semibold text-sm'>{user?.username}</p>
          <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
        </div>
      </div>
      
      <input ref={imageref} type="file" className="hidden" onChange={filehandler}/>
      <Button className='bg-blue-500 hover:bg-blue-600 cursor-pointer text-white ' onClick={()=>imageref.current?.click()}>Change Profile Picture</Button>
            </div>
            <div>
                <h1 className="font-bold text-lg w-fit pl-50">Bio</h1>
                <Textarea className="max-w-xl ml-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"  name='bio' 
                value={input.bio} onChange={(e)=>setInput({...input,bio:e.target.value})} />
            </div>
            <div>
                <h1 className="font-bold text-lg w-fit pl-50">Gender</h1>
 <Select defaultValue={input.gender} onValueChange={setgender} >
                        <SelectTrigger className=" ml-50 mx-auto w-140">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>
            <div className="flex item-center justify-center">{
loading?(
    <Button className=" w-fit bg-blue-500 hover:bg-blue-600">
        <Loader2 className="animate-spin mr-2 h-4 w-4"/>
        Please wait
    </Button>
):(
    <Button onClick={editprofilehandler} className=" w-fit bg-blue-500 hover:bg-blue-600">Submit</Button>
)
}
            </div>
        </section>
      
    </div>
  )
}

export default EditProfile
