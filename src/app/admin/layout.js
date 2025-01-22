'use client'
import React from 'react'
import SideBar from './sidebar/SideBar'

const layout = ({children}) => {
  return (
    <>
    <SideBar/>
    <div className='pl-0 md:pl-[25%] '>
      {children}
    </div>
    </>
  )
}

export default layout