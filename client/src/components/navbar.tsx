import React from 'react'
import { Button } from './ui/button'

function Navbar() {
    return (
        <nav
            className='absolute text-black flex items-center justify-between top-5 rounded-full py-2 px-5 mx-auto w-[40vw] bg-white shadow-lg'>
            <h3 className='text-2xl font-semibold underline underline-offset-2'>College Tracker</h3>
            <div className='flex items-center gap-3'>
                <Button variant={"ghost"}>Login</Button>
                <Button variant={"ghost"}>Signup</Button>
            </div>
        </nav>
    )
}

export default Navbar
