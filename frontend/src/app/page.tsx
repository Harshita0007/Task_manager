import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col">

      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex-1">
        <div className="text-center text-white">
          {/* Logo */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-white font-bold text-4xl">T</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Task Management System
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Organize your work and life, finally. Become focused, organized, and
            calm with our powerful task management platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-blue-700 px-10 py-3 rounded-xl text-base font-semibold hover:bg-blue-50 transition shadow-2xl transform hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/login"
              className="bg-white/10 backdrop-blur-sm text-white px-10 py-3 rounded-xl text-base font-semibold border-2 border-white/30 hover:bg-white/20 transition shadow-xl transform hover:scale-105"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <FeatureCard icon="📝" title="Create Tasks" text="Add tasks with title, description, deadline and priority." />
            <FeatureCard icon="🚀" title="Track Progress" text="Monitor live status from pending to completed." />
            <FeatureCard icon="🎯" title="Stay Organized" text="Search, filter and categorize tasks without confusion." />
            <FeatureCard icon="🔔" title="Reminders & Alerts" text="Never miss deadlines with smart notifications." />
            <FeatureCard icon="🔒" title="Secure & Private" text="Your data is encrypted and never shared with anyone." />
            <FeatureCard icon="📱" title="Cross-platform" text="Access dashboard from laptop, tablet or mobile anytime." />

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Task Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

/* Small reusable component for feature cards */
function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition border border-gray-200 transform hover:-translate-y-1">
      <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center text-3xl text-white mb-6 shadow-md">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
}
