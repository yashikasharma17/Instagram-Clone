import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authslice';
const Login = () => {
  const dispatch=useDispatch();
  const [input,setinput]=useState({
    email:"",
    password:""
  });
  const {user}=useSelector(store=>store.auth);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const changeEventHandler=(e)=>{
    setinput({...input,[e.target.name]:e.target.value});
  }
  const signlehandler=async (e)=>{
e.preventDefault();
try {
  setLoading(true);
  const res=await axios.post('https://instagram-clone-3-cfe5.onrender.com/api/v1/user/login',input,{
    headers:{
      'Content-type':'application/json'
    },
    withCredentials:true
  })
  if(res.data.success){
    dispatch(setAuthUser(res.data.user));
    navigate("/");
    toast.success(res.data.message);
    setinput({
      email:"",
      password:""
    })
  }
  
} catch (error){
  console.log(error);
  toast.error(error.response.data.message);
}
finally{
setLoading(false);
}
  }
  useEffect(()=>{
      if(user){
        navigate("/");
      }
    },[]);
  return (
    <div className='flex items-center justify-center min-h-screen overflow-hidden'>
      <form onSubmit={signlehandler} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className="my-4">
          <h1 className='flex justify-center items-center gap-2'>
            <img src="instagram-new-logo.png" alt="logo"  className=' w-20 h-10'/>
          </h1>
          <p className='text-sm text-center '>Login to see photos and videos of your friends</p>

        </div>
         <div>
          <span className='font-medium'>Email</span>
          <Input
          type="email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className='focus-visible:ring-transparent my-2'></Input>
        </div>
         <div>
          <span className='font-medium'>password</span>
          <Input
          type="password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          className='focus-visible:ring-transparent my-2'></Input>
        </div>
        {
            loading?(
<Button>
    <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
    Please wait 
</Button>
            ):(
                <Button type='submit'>Login</Button>

            )
        }
        
         <span className='text-center'>Do not have an Account? <Link to="/signup" className='text-blue-600' >Sign up</Link></span>
      </form>
      
    </div>
  )
}

export default Login
