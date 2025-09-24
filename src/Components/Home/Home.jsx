import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import ListNavbar from '../Navbar/ListNavbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <ListNavbar/>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
