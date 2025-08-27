import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Paths you want to protect
    if (url.pathname.startsWith("/dashboard")) {
        // Grab the cookie (assuming JWT or session cookie)
        console.log(req.cookies)
        const token = req.cookies.get("token")?.value;

        if (!token) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }
    else {
        // not authenticated routes
        return NextResponse.next()
    }
} 

