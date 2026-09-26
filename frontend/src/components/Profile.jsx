
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link,useParams } from 'react-router-dom';

import { Button } from './ui/button';
import UserGetUserProfile from '../hooks/UserGetUserProfile'
import { useSelector } from 'react-redux';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { setAuthUser, setUserProfile } from '@/redux/authslice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const params=useParams();
 const dispatch=useDispatch();
  const userId=params.id;
  UserGetUserProfile(userId);
  const {userProfile,user}=useSelector(store=>store.auth);
  const isloggedin=user?._id===userProfile?._id;
  const isFollowed=userProfile?.followers?.includes(user?._id);
  const [activeTab,setActiveTab]=useState("posts");
  const handleTabChange=(tab)=>{
    setActiveTab(tab);
  }
  const displayedpost=activeTab==="posts"? userProfile?.posts : userProfile?.bookmark;
  const USER_API_END_POINT = "https://instagram-clone-3-cfe5.onrender.com/api/v1/user"; 
  const handleFollowUnfollow = async () => {
  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/followOrUnfollow/${userProfile?._id}`,
      {},
      { withCredentials: true }
    );
    if (res.data.success) {
      const updatedFollowers = isFollowed
        ? userProfile.followers.filter(id => String(id) !== String(user._id))
        : [...(userProfile.followers || []), user._id];

      dispatch(setUserProfile({ ...userProfile, followers: updatedFollowers }));

      const updatedFollowing = isFollowed
        ? user.following.filter(id => String(id) !== String(userProfile._id))
        : [...(user.following || []), userProfile._id];

      dispatch(setAuthUser({ ...user, following: updatedFollowing }));
    }
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className='flex max-w-7xl mx-auto gap-5 my-5 px-25'>
    <div className='flex flex-col gap-5 w-full'>
     <div className='grid grid-cols-3 gap-5'>
      <section className='flex items-center justify-center '>
        <Avatar className='w-32 h-32'>
          <AvatarImage src={userProfile?.profilepic}/>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </section>
      <section>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-5'>
            <span className='font-bold text-lg'>{userProfile?.username}</span>
{
  isloggedin ? (
    <>
    <Link to="/account/edit"> <Button className='hover:bg-gray-200' variant='secondary'>Edit Profile</Button></Link>
    <Button onClick={()=>handleTabChange("saved")} variant='secondary' className='hover:bg-gray-200'> View Archives</Button>
    <Button variant='secondary' className='hover:bg-gray-200'>Ad tools</Button>
    </>
   
    
  ):
  (
isFollowed ? (
  <>
  <Button onClick={handleFollowUnfollow} className='bg-blue-500 text-white hover:bg-blue-600'>Unfollow</Button>
  <Link to="/chat"><Button className='bg-blue-500 text-white hover:bg-blue-600' >Message</Button>
  </Link>
  </>
  
)
  :(
    <Button onClick={handleFollowUnfollow} className='bg-blue-500 text-white hover:bg-blue-600'>Follow</Button>
  )
)
}
          </div>
          <div className='flex items-center gap-2'>
            <Badge className='w-fit my-1' variant='secondary'><AtSign/><span className='pl-1'>{userProfile?.username}</span></Badge>
          </div>
          <div className='flex items-center gap-5'>
            <p><span className='font-bold'>{userProfile?.posts?.length}</span> posts</p>
             <p><span className='font-bold'>{userProfile?.followers?.length}</span> followers</p>
              <p><span className='font-bold'>{userProfile?.following?.length}</span> following</p>
          </div>
          <div className='flex items-center flex-col gap-2 w-fit'>
            <span className='font-semibold'>{userProfile?.bio}</span>
          </div>
        </div>
        
      </section>
      
     </div>
<div className='  border-t border-gray-300 ml-16 md:ml-0'>
<div className='flex items-center gap-20 justify-center '>
<span className={`cursor-pointer ${activeTab==="posts"? "font-bold":''}`} onClick={()=>handleTabChange("posts")}>
  POSTS
</span>
<span className={`cursor-pointer ${activeTab==="saved"? "font-bold":''}`} onClick={()=>handleTabChange("saved")}>
  SAVED
</span>
</div>
<div className='grid grid-cols-3 gap-1 px-20 my-4'>
  {
displayedpost?.map((post)=>{
  return(
<div key={post._id} className='relative group cursor-pointer'>
  <img className="w-250 h-70" src={post.image} alt="Post" />
  <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-50 transition-opacity duration-300'>
<div className=' flex items-center text-white space-x-4'>
  <button className='flex items-center gap-2 hover:text-gray-300'>
    <Heart/>
    <span>
{post?.likes.length}
    </span>
  </button >
  <button className='flex items-center gap-2 hover:text-gray-300'>
    <MessageCircle/>
    <span>
{post?.comment.length}
    </span>
  </button>
</div>
  </div>
  </div>
  )
})
  }
</div>
    </div>
     </div>
     </div>
  )
}

export default Profile
