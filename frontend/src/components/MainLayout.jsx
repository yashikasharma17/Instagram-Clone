import React from 'react'
import { Outlet } from 'react-router-dom'
import Leftsidebar from './leftsidebar'

const MainLayout = () => {
  return (
    <div >
      <Leftsidebar/>
      <div>
         <Outlet/>
      </div>
     
    </div>
  )
}

export default MainLayout
