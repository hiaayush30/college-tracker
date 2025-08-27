import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // Paths you want to protect
    if (url.pathname.startsWith("/dashboard")) {
        // Grab the cookie (assuming JWT or session cookie)
        const token = req.cookies.get("token")?.value;

        if (!token) {
            url.pathname = "/login";
            return NextResponse.redirect(url);
        } else {
            // const decoded = jwt.decode(token) as IUserToken;
            // You can attach data to headers so client can read it
            // const requestHeaders = new Headers(req.headers);
            // requestHeaders.set("x-user", JSON.stringify(decoded));

            // return NextResponse.next({
            //     request: {
            //         headers: requestHeaders,
            //     },
            // })
            return NextResponse.next();
        }
    }
    else {
        // not authenticated routes
        return NextResponse.next()
    }
}

