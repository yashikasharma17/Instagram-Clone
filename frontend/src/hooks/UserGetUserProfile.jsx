import { setUserProfile } from '@/redux/authslice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const getUserProfile = (userId) => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const fetchUserProfile=async ()=>{
        try{
            const res=await axios.get(`http://localhost:8000/api/v1/user/${userId}/profile`,
                {withCredentials:true}
            )
            if(res.data.success){
                console.log(res.data.user);
                dispatch(setUserProfile(res.data.user));
            }
        }
        catch(error){
            console.log(error);
        }
    }
    fetchUserProfile();
  }, [userId])
}

export default getUserProfile
