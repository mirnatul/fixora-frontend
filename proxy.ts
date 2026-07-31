// runs on every request
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';

const AUTH_ROUTES = ["/login", "/register"]
const PUBLIC_ROUTES = ["/", "/technicians", "/services"]

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;


    const cookieStore = await cookies()

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;


    // decode the token
    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        // access token has expired but refresh token is valid, get new access token from backend
        const result = await getNewAccessToken()

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax"
            })

            accessToken = newAccessToken;
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET as string);
        }
    }


    let userRole = null;

    if (!decodedAccessToken?.success) {
        cookieStore.delete("accessToken")
    }


    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }
    // user logged in and try to access login or register
    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "CUSTOMER") {
            return NextResponse.redirect(new URL('/customer-dashboard', request.url))
        }
        else if (userRole === "TECHNICIAN") {
            return NextResponse.redirect(new URL('/technician-dashboard', request.url))
        }
        else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
        else {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    // public routes
    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))

    // authenticated page protection: authorization is not handled yet
    if (!accessToken && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // role based
    // not-found.tsx will be placed in app
    if (pathname.startsWith("/customer-dashboard") && userRole !== "CUSTOMER") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith("/technician-dashboard") && userRole !== "TECHNICIAN") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }
    else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL('/not-found', request.url))
    }


    // if user want to visit premium but they are not subscribed 
    // then they will redirecto to payment page
    // if (pathname === "/premium") {
    //     const subscriptionStatus = await getSubscriptionStatus();
    //     const isActive = Boolean(
    //         subscriptionStatus?.success && subscriptionStatus.data?.isSubscribed
    //     )
    //     if (!isActive) {
    //         return NextResponse.redirect(new URL('/payment', request.url))
    //     }
    // }


    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
}

// catch all route and exclude
export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ]
}