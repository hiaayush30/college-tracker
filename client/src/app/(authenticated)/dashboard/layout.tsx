import React, { ReactNode } from 'react'
import AuthProvider from './AuthProvider';


export interface IUserToken {
    _id: string; email: string; role: "user" | "admin"; username: string
}


async function layout({ children }: { children: ReactNode }) {
    return (
        <div>
            <AuthProvider>
                {children}
            </AuthProvider>
        </div>
    )
}

export default layout
