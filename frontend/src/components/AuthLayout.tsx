import { ReactNode } from "react";

interface AuthLayoutProps {
    leftTitle: string;
    leftSubtitle: string;
    leftItems: { icon: string; title: string; text: string }[];
    children: ReactNode;
}

export default function AuthLayout({
    leftTitle,
    leftSubtitle,
    leftItems,
    children,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            {/* Outer glow border */}
            <div className="max-w-5xl w-full bg-white/5 rounded-3xl p-[1px] shadow-[0_24px_80px_rgba(15,23,42,0.9)]">
                {/* Inner main card */}
                <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden">
                    {/* Left hero / info panel */}
                    <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-10 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                                <span className="font-bold text-2xl">T</span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                                {leftTitle}
                            </h2>
                            <p className="text-blue-100 text-lg mb-8">{leftSubtitle}</p>
                        </div>

                        <div className="space-y-4">
                            {leftItems.map((item) => (
                                <div key={item.title} className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                                        <span className="text-xl">{item.icon}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-sm text-blue-100">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right form side */}
                    <div className="lg:w-1/2 p-8 lg:p-10 flex items-center justify-center">
                        <div className="w-full max-w-md">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
