import { LoginForm } from "../_components/LoginForm"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export default function LoginPage() {

    return (
        <div>
            <div
                className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                        <CardAction>
                            <Link href="/register">
                                <Button variant="link">Register</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <LoginForm></LoginForm>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}