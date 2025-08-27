import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function NootFound() {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-3'>
            <p className='text-xl'>Page Under Construction (Shrug emoji)</p>
            <Link href={"/dashboard"}>
                <Button className='cursor-pointer'>Go Back</Button>
            </Link>
        </div>
    )
}

export default NootFound
