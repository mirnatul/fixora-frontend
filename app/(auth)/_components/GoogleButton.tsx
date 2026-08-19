"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { handleGoogleLogin } from "../_actions/authActions";

export default function GoogleButton() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="flex w-full flex-col items-center gap-2">
            <div
                className={`w-full ${
                    isLoading ? "pointer-events-none opacity-60" : ""
                }`}
            >
                <GoogleLogin
                    text="continue_with"
                    width="100%"
                    onSuccess={async (credentialResponse) => {
                        if (!credentialResponse.credential) {
                            return;
                        }

                        setIsLoading(true);

                        try {
                            await handleGoogleLogin(
                                credentialResponse.credential
                            );
                        } catch (error) {
                            console.error("Google login failed:", error);
                            setIsLoading(false);
                        }
                    }}
                    onError={() => {
                        console.log("Google Login Failed");
                        setIsLoading(false);
                    }}
                />
            </div>

            {isLoading && (
                <div className="flex items-center gap-2 text-sm">
                    <span className="loading loading-spinner loading-sm" />
                    <span>Signing in...</span>
                </div>
            )}
        </div>
    );
}