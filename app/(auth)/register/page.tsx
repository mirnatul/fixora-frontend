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
import { RegisterForm } from "../_components/RegisterForm"
import Link from "next/link"

export default function RegisterPage() {

    return (
        <div>
            <div
                className="flex min-h-screen items-center justify-center">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Register to your account</CardTitle>
                        <CardDescription>
                            Enter your info to create your account
                        </CardDescription>
                        <CardAction>
                            <Link href="/login">
                                <Button variant="link">Log In</Button>
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <RegisterForm></RegisterForm>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}