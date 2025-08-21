import Link from 'next/link'
import React, { ReactNode } from 'react'
import TimelineIcon from '@mui/icons-material/Timeline';

function layout({children}:{children:ReactNode}) {
  return (
    <div>
      <nav
        className="max-w-[45vw] p-3 absolute top-5 left-0 bg-gray-800 rounded-full right-0 w-full mx-auto bg-opacity-90 shadow-lg"
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
          <Link href={"/"}
            className="text-4xl cursor-pointer font-extrabold text-slate-300 tracking-tight"
          >
            College Tracker
          </Link>
          <TimelineIcon className="hover:scale-125 transition-all"/>
        </div>
      </nav>
      {children}
    </div>
  )
}

export default layout
