import { HeroHeader } from '@/components/header'
import React, { ReactNode } from 'react'

function layout({children}:{children:ReactNode}) {
  return (
    <div>
      <HeroHeader/>
      {children}
    </div>
  )
}

export default layout
