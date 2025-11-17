"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";
import AuthLayout from "@/components/AuthLayout"; // if you’re using the shared layout; else remove

export default function LoginPage() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // authService.login() returns response.data (AuthResponse)
            const res: any = await authService.login(
                formData.email,
                formData.password
            );

            // Some backends send { accessToken, refreshToken, user }
            // others send { data: { accessToken, ... } }
            const level1 = res?.data ?? res;
            const authPayload = level1?.data ?? level1;

            const accessToken = authPayload?.accessToken;
            const refreshToken = authPayload?.refreshToken;
            const user = authPayload?.user;

            if (!accessToken || !refreshToken || !user) {
                console.error("Unexpected login response:", res);
                toast.error("Login response invalid");
                setLoading(false);
                return;
            }

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            setUser(user);
            toast.success("Welcome back!");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login error:", error?.response || error);
            toast.error(error?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            leftTitle="Welcome Back!"
            leftSubtitle="Sign in to continue managing your tasks and boost your productivity."
            leftItems={[
                { icon: "⚡", title: "Fast & Efficient", text: "Quick access to all your tasks" },
                { icon: "🔒", title: "Secure & Private", text: "Your data is always protected" },
                { icon: "💼", title: "Professional Tools", text: "Everything you need to succeed" },
            ]}
        >
            <div>
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-white font-bold text-2xl">T</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
                    <p className="text-gray-600">Access your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a
                            href="#"
                            className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                {/* Social buttons omitted for brevity – keep your existing ones here */}

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                        Create one
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
