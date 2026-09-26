import { Dialog } from './ui/dialog'
import React, { useRef, useState } from 'react'

import { Textarea } from './ui/textarea'
import { fileToDataUrl } from '@/lib/utils'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog'
import  {
  Avatar,
  AvatarFallback,
  AvatarImage
} from './ui/avatar'
import { Loader2 } from 'lucide-react'
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '@/redux/postslice'

const Createdialog = ({ open, setOpen }) => {
  const userfile=useRef();
  const [loading,setLoading]=useState(false);
  const [file,setFile]=useState("");
  const [caption,setCaption]=useState("");
  const [imagePreview,setImagePreview]=useState("");
  const {user}=useSelector((store)=>store.auth);//useSelector lets a React component read data from the Redux store.
  const {posts}=useSelector((store)=>store.posts);
  const dispatch=useDispatch();
 
  const filechangeHandler=async(e)=>{
    const file=e.target.files[0];
    if(file){
    setFile(file);
    const dataurl=await fileToDataUrl(file);
    setImagePreview(dataurl);
    }
  }
  const createPostHandler=async (e)=>{
const formdata=new FormData();
formdata.append("caption",caption);
if(imagePreview){
  formdata.append("image",file);
}
try{
  setLoading(true);
  const res=await axios.post("http://localhost:8000/api/v1/post/createpost",formdata,{
    headers:{
      "Content-Type":"multipart/form-data"//"This request contains files."
    },
    withCredentials:true//Allows authentication cookies.
  });
  if(res.data.success){
    dispatch(setPosts([res.data.post,...posts]));
    toast.success(res.data.message);
    setOpen(false);

  }
  
}
  catch(error){
toast.error(error?.response?.data?.message|| "Something went wrong");
  }
  finally{
    setLoading(false);
  }
}
  
  return (
  <Dialog open={open} className="overflow-hidden">
    <DialogContent onInteractOutside={()=>setOpen(false)} className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
  <DialogTitle className="text-center font-semibold">
    Create New Post
  </DialogTitle>

  <DialogDescription />
</DialogHeader>
        <div className='flex gap-3 items-center'>
         <Avatar>
            <AvatarImage src={user?.profilepic} alt="post_img"/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      
        <p className="font-semibold text-lg"> {user?.username}</p>
        </div>
        <span className="text-gray-500 text-xs">{user?.bio || "Bio here.."}</span>
        
      
       <Textarea value={caption} onChange={(e)=>setCaption(e.target.value)} className="focus-visible:ring-transparent border-none" placeholder="Write a caption..."/>
        {
          imagePreview && 
          <img src={imagePreview} alt="Preview" className="w-full max-h-96 object-cover rounded-md"/>
        }
      
       <input ref={userfile} type="file" className='hidden' onChange={filechangeHandler}/>
       <Button onClick={()=>userfile.current.click()}className="bg-blue-500 hover:bg-blue-800 w-fit mx-auto">Select your file</Button>
       {
        imagePreview &&
        (
          loading?
          <Button >
            <Loader2 className='animate-spin mr-2 h-4 w-4'/>
            Posting...Please wait
          </Button>
          :
          <Button onClick={createPostHandler} type="submit" className="w-full">
            Post
          </Button>
        )
       }
    </DialogContent>
  </Dialog>
  
      )
    }

export default Createdialog
