import React from 'react'
import { Outlet } from 'react-router-dom'
import Feed from './Feed'
import Rightsidebar from './Rightsidebar'
import UseGetSuggestedUsers from '../hooks/UseGetSuggestedUsers';
import getallposts from '../hooks/getallposts';

const Home = () => {
  UseGetSuggestedUsers();
  getallposts();
  return (
    
    //flex grow here tells element how much it can grow in a space 
    <div className='flex '>
      <div className='flex flex-grow'>
        <Outlet/>
        <Feed/>
      </div>
      <Rightsidebar/>
    
    </div>
  )
}

export default Home
