'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Register() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Password validation
    const validatePassword = (password: any) => {
        const minLength = /.{5,}/;
        const hasLower = /[a-z]/;
        const hasNumber = /[0-9]/;

        if (!minLength.test(password)) return "Password must be at least 5 characters long.";
        if (!hasLower.test(password)) return "Password must include a lowercase letter.";
        if (!hasNumber.test(password)) return "Password must include a number.";
        return "";
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        try {
            setIsLoading(true);

            const res = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: name,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            // success
            router.push("/login");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    <div className="px-8 py-3 text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
                    </div>

                    <div className="px-8 pb-8">
                        <form onSubmit={handleSignUp} className="space-y-6">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-4 py-3 border-2 rounded-xl ${
                                        error ? "border-red-500" : "border-gray-200"
                                    }`}
                                    required
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
                            >
                                {isLoading ? "Creating account..." : "Sign Up"}
                            </button>
                        </form>

                        <div className="text-center mt-6">
                            <button
                                onClick={() => router.push("/login")}
                                className="text-gray-600 hover:text-blue-600 font-semibold"
                            >
                                Login instead →
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
