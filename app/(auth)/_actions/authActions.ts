"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"

type LoginState = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}

type RegisterPayload = {
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
};

export const loginAction = async (prevState: LoginState, formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");
    const payload = { email, password }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();

    // // cookie set
    if (result.success) {
        const cookieStore = await cookies()
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        })


        // role based redirect (just once) - same logic present on proxy but runs on every request
        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

        if (decodedToken.role === "CUSTOMER") {
            redirect("/customer-dashboard")
        }
        else if (decodedToken.role === "TECHNICIAN") {
            redirect("/technician-dashboard")
        }
        else if (decodedToken.role === "ADMIN") {
            redirect("/admin-dashboard")
        }
    }
    return result;
}


export const registerAction = async (prevStore: RegisterPayload, formData: FormData) => {
    const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        phone: formData.get("phone"),
        city: formData.get("city"),
        address: formData.get("address"),
        role: formData.get("role"),
    };
    // console.log(payload);
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })

    const result = await res.json();


    // // cookie set
    if (result.success) {
        const cookieStore = await cookies()
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        })

        console.log("REGISTER ACCESS TOKEN:", result.data.accessToken);
        console.log("REGISTER RESULT:", result);


        // role based redirect (just once) - same logic present on proxy but runs on every request
        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

        if (decodedToken.role === "CUSTOMER") {
            redirect("/customer-dashboard")
        }
        else if (decodedToken.role === "TECHNICIAN") {
            redirect("/technician-dashboard")
        }
        else if (decodedToken.role === "ADMIN") {
            redirect("/admin-dashboard")
        }
    }

    return result;
}