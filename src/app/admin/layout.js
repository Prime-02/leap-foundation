'use client'
import React, { useState } from 'react'

const layout = ({children}) => {
  const [currPage, setCurrPage] = useState(false)
  return (
      <div>
        <nav className="w-full min-h-16 border-b flex items-center justify-around relative">
          <div onClick={() => setCurrPage(false)}>All Posts</div>
          <div onClick={() => setCurrPage(true)}>Your Posts</div>
          <span
            className={`absolute w-1/2 h-1 rounded-full bg-green-800 bottom-0 left-0 transition duration-1000 
          ${!currPage ? "translate-x-0" : "translate-x-full"}
          `}
          ></span>
        </nav>
        {children}
      </div>
  );
}

export default layout