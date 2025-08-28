import React, { ReactNode } from 'react'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import AuthProvider from './AuthProvider';


export interface IUserToken {
    _id: string; email: string; role: "user" | "admin"; username: string
}


async function layout({ children }: { children: ReactNode }) {
    const reqCookies = await cookies();
    console.log("reqCookies:", reqCookies)
    const token = reqCookies.get("token")?.value
    let decoded: IUserToken | null = null;
    if (token) {
        try {
            decoded = jwt.decode(token) as IUserToken;
        } catch { }
    }
    return (
        <div>
            <AuthProvider user={decoded}>
                {children}
            </AuthProvider>
        </div>
    )
}

export default layout
