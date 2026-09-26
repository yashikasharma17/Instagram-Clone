import React,{useEffect, useState} from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button';
import {useDispatch, useSelector} from 'react-redux';
import Comments from './comments'
import axios from 'axios'
import { toast } from 'sonner'
import {setPosts,setSelectedPost} from '../redux/postslice'



const Commentdialog = ({open,setopen}) => {//setopen and open are props passed from posts component
     const [text,settext]=useState("");
     const {selectedPost,posts}=useSelector((store)=>store.posts);
       const [comment, setComment] = useState([]);
       
  const dispatch = useDispatch();
 useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comment);
    }
  }, [selectedPost]);

     const changeeventhandler=(e)=>{
        const inputtext=e.target.value;
        if(inputtext.trim()){
            settext(inputtext);
        }
        else{
            settext("");
        }
    }
    const sendmessagehandler = async () => {

    try {
      const res = await axios.post(`https://instagram-clone-3-cfe5.onrender.com/api/v1/post/${selectedPost?._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === selectedPost._id ? { ...p, comment: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        settext("");
      }
    } catch (error) {
      console.log(error);
    }
  
    }
  return (
<Dialog open={open}>
    <DialogContent onInteractOutside={()=>setopen(false)} className="!max-w-4xl w-full p-0 overflow-hidden flex flex-col">
<div className="flex flex-1">
    <div className="w-1/2">
    <img src={selectedPost?.image} alt="post_img" 
    className="w-full h-full object-cover rounded-l-lg"/>
    </div>
    <div className="w-1/2 flex flex-col justify-between">
    <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
            <Link>
       <Avatar>
            <AvatarImage src={selectedPost?.author?.profilepic} alt="post_img"/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        </Link>
        <div >
            <Link className="text-xs font-semibold">{selectedPost?.author?.username}</Link>
        </div>
        </div>
        <Dialog>
            <DialogTrigger asChild>
<MoreHorizontal className="cursor-pointer"/>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center text-sm text-center">
                <div className='cursor-pointer text-red w-full font-bold' >
Unfollow
                </div>
                 <div className='cursor-pointer font-bold w-full' >
Add to favorites
                </div>
            </DialogContent>
        </Dialog>
       
         
    </div>
    <hr/>
    <div className='flex-1 overflow-y-auto max-h-96 p-4'>
   {
    comment?.map((comment)=> <Comments key={comment._id} comment={comment}/>)
   }
   </div>
    <div className='p-4'>
        <div className="flex items-center justify-between gap-3">
            <input onChange={changeeventhandler} value={text} type="text" placeholder="Add a comment.." className="bg-transparent border-none focus:outline-none"/>
            <Button disabled={!text.trim()}onClick={sendmessagehandler}variant="outline">Send</Button>
        </div>
    </div>
    </div>

</div>
    </DialogContent>
</Dialog>
  )
}
export default Commentdialog
