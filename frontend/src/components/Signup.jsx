import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Signup = () => {
  const [input,setinput]=useState({
    username:"",
    email:"",
    password:""
  });
  const [loading,setLoading]=useState(false);
  const {user}=useSelector(store=>store.auth);
  const navigate=useNavigate();
  const changeEventHandler=(e)=>{
    setinput({...input,[e.target.name]:e.target.value});
  }

  const signlehandler=async (e)=>{
e.preventDefault();
try {
  setLoading(true);
  const res=await axios.post('http://localhost:8000/api/v1/user/register',input,{
    headers:{
      'Content-type':'application/json'
    },
    withCredentials:true
  })
  if(res.data.success){
    navigate("/login");
    toast.success(res.data.message);
    setinput({
      username:"",
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
          <p className='text-sm text-center '>Signup to see photos and videos of your friends</p>

        </div>
        <div>
          <span className='font-medium'>Username</span>
          <Input
          type="text"
          name="username"
          value={input.username}
          onChange={changeEventHandler}
          className='focus-visible:ring-transparent my-2'></Input>
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
              //here this button css will work when its loading , 
              // //mr-2 is margin -2 and h-4 is height 4 and animate spin is spin mechanism 
<Button>
  
    <Loader2 className='mr-2 h-4 w-4 animate-spin'/> 
   
    Please wait 
</Button>
            ):(
              //after loading ends 
            
                <Button type='submit'>Sign up</Button>

            )
        }
        
        <span className='text-center'>Already have an Account? <Link to='/login' className='text-blue-600' >Login</Link></span>
      </form>
      
    </div>
  )
}

export default Signup
