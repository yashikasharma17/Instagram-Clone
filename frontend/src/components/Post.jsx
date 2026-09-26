import React,{useState} from 'react'
import { Dialog, DialogContent,DialogTitle, DialogTrigger,DialogDescription } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import Commentdialog from './commentdialog'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import {setPosts,setSelectedPost} from '../redux/postslice'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Posts from './Posts'
import { Badge } from './ui/badge'
import { setAuthUser } from '@/redux/authslice'


const Post = ({post}) => {
    const [text,settext]=useState("");
    const[open,setopen]=useState(false);
    const {user}=useSelector((store)=>store.auth);
    const {posts}=useSelector((store)=>store.posts);
     const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
const [postLike, setPostLike] = useState(post.likes.length);
const [comment,setcomment]=useState(post.comment);
    const dispatch=useDispatch();
    
    const changeeventhandler=(e)=>{
        const inputtext=e.target.value;
        if(inputtext.trim()){
            settext(inputtext);
        }
        else{
            settext("");
        }
    }
     const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8000/api/v1/post/${post._id}/${action}`,
                 { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

               
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                settext("");
            }
        } catch (error) {
            console.log(error);
        }
    }
    const commenthandler=async()=>{
        try
        {
const res=await axios.post(`http://localhost:8000/api/v1/post/${post._id}/comment`,{text},{
    headers:{
        'Content-Type': 'application/json'
    },withCredentials:true});
if(res.data.success){
    const update=[...comment,res.data.comment];
    setcomment(update);
    const updatedCommentsData=posts.map(p=>
        p._id===post._id?{
            ...p,
            comment:update
            
        } : p
    );
    dispatch(setPosts(updatedCommentsData));
    toast.success(res.data.message);
    settext("");

}
    }
        catch(error){
            console.log(error);
        }
    }
    const deletepost=async ()=>{
        try{
const res=await axios.delete(`http://localhost:8000/api/v1/post/delete/${post?._id}`,{withCredentials:true});
if(res.data.success){
    
    const updatedpost=posts.filter((p)=>p?._id!==post?._id);
    // Remove the deleted post from the posts array
    dispatch(setPosts(updatedpost));
    toast.success(res.data.message);
}
        }
        catch(error){
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
  const bookmarked = user?.bookmark?.includes(post._id) || false;

    const bookmarkHandler = async () => {
        try {
            const res = await axios.post(
                `http://localhost:8000/api/v1/post/bookmark/${post?._id}`,
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                const updatedBookmark = bookmarked
                    ? user.bookmark.filter((id) => String(id) !== String(post._id))
                    : [...(user.bookmark || []), post._id];

                dispatch(setAuthUser({ ...user, bookmark: updatedBookmark }));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    };
  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
<div className='flex items-center justify-between'>
<div className='flex items-center gap-3 '>
        <Avatar>
            <AvatarImage src={post.author?.profilepic} alt="post_img"/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex items-center gap-2'>
<p className='text-base font-medium'>{post.author?.username}</p>
     
        {
            user._id===post?.author._id && <Badge className='bg-black text-white' variant='secondary'>Author</Badge>
        }
        </div>
      
   
    </div>
    <Dialog>
        <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer'/>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center text-sm text-center">
                 <DialogTitle></DialogTitle>
  <DialogDescription>
    
  </DialogDescription>

                
               
                 <Button onClick={bookmarkHandler} variant="ghost" className="cursor-pointer w-fit text-[Black] font-bold ">
Add to favorites
                </Button>
                {user && user?._id===post?.author?._id && (<Button onClick={deletepost} variant="ghost" className="cursor-pointer w-fit text-[Red] font-bold ">
Delete
                </Button>)}
                
            </DialogContent>
        
    </Dialog>
    </div>
    <img  className='rounded-sm my-2 w-full aspect-square object-cover '
    src={post.image} alt="image_posted" />
   
<div className='flex items-center justify-between my-2'>
    <div className='flex items-center gap-3'>
  {
                  liked ? <FaHeart onClick={likeOrDislikeHandler} size={'24'} className='cursor-pointer text-red-600' />
        : <FaRegHeart onClick={likeOrDislikeHandler} size={'22px'} className='cursor-pointer hover:text-gray-600' />
                    }
    <MessageCircle onClick={() => {setopen(true);
         dispatch(setSelectedPost(post))}
    } className="cursor-pointer hover:text-gray-600"/>
    <Send className="cursor-pointer hover:text-gray-600"/>
    </div>
    
        {
    bookmarked ? (
        <Bookmark onClick={bookmarkHandler} fill="currentColor" className="cursor-pointer hover:text-gray-600" />
    ) : (
        <Bookmark onClick={bookmarkHandler} className="cursor-pointer hover:text-gray-600" />
    )
}
    


</div>
<span className='font-medium block text-left'>{post.likes.length} like</span>
<p className='text-left'>
    <span className='font-medium  text-left'>{post.author?.username } </span> 
    {post.caption} 
</p>
{
  comment.length>0 &&  <span onClick={() => {
    setopen(true);
    dispatch(setSelectedPost(post));
}} className="text-left block  cursor-pointer text-sm text-gray-400">

    View all {comment.length} comments
</span>
}

<Commentdialog open={open} setopen={setopen}/>
<div className="flex items-center justify-between">
    <input type="text"
    placeholder="Add a comment..."
    value={text}
    onChange={changeeventhandler}
    className="outline-none w-full text-sm"
     />
     {
        text && <span onClick={commenthandler} className="text-blue-500 font-bold cursor-pointer">
            Post
        </span>
     }
</div>
    </div>
    

    
  
    
    
  )
}

export default Post
