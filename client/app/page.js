"use client"
import { useState, useEffect } from 'react';
import { DollarSign, Shield, Download, Star, Users, TrendingUp, CheckCircle, ArrowRight, Sparkles, Globe, Award } from 'lucide-react';
import HomeNavbar from './components/HomeNavbar';

const FeatureCard = ({ icon: Icon, title, desc, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <>
    
    <div className={`group relative bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-cyan-500/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-700/50 overflow-hidden ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-bounce"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-100 group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{desc}</p>
        
        {/* Hover arrow */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
          <ArrowRight className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
    </div>
    </>
  );
};

const StatCard = ({ number, label, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isVisible) {
      const target = number.includes('%') ? parseFloat(number.replace(/[^\d.]/g, '')) : parseInt(number.replace(/[^\d]/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(number.includes('%') ? Math.floor(current * 10) / 10 : Math.floor(current));
        }
      }, duration / steps);
    }
  }, [isVisible, number]);

  const formatNumber = () => {
    if (number.includes('%')) {
      return `${count}%`;
    }
    
    const formattedCount = count.toLocaleString();
    const hasPlus = number.includes('+');
    
    return hasPlus ? `${formattedCount}+` : formattedCount;
  };

  return (
    <div className={`text-center transition-all duration-700 p-4 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 whitespace-nowrap overflow-hidden">
        {formatNumber()}
      </div>
      <div className="text-blue-100 text-sm md:text-base lg:text-lg font-medium">{label}</div>
    </div>
  );
};

const TestimonialCard = ({ name, role, content, rating = 5 }) => {
  return (
    <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-300 leading-relaxed mb-6 italic">"{content}"</p>
      <div className="border-t border-gray-700 pt-4">
        <div className="font-semibold text-gray-100">{name}</div>
        <div className="text-cyan-400 text-sm">{role}</div>
      </div>
    </div>
    
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
    <HomeNavbar/>
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-gray-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-2s"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/15 to-cyan-500/15 rounded-full blur-3xl animate-pulse animation-delay-4s"></div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full pt-48 pb-32 px-6 md:px-20 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 text-white text-center overflow-hidden">
        {/* Hero Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-yellow-300/30 rounded-full animate-float animation-delay-2s"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300/20 rounded-full blur-lg animate-float animation-delay-4s"></div>

        <div className={`relative max-w-6xl mx-auto transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700/50">
            <Sparkles className="w-5 h-5 text-cyan-300" />
            <span className="text-sm font-medium">Trusted by 10,000+ schools worldwide</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
              SchoolFlow
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Comprehensive School Management System that streamlines administration, manages students, 
            tracks attendance, handles fees, and empowers educational excellence with smart automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/admin/dashboard"
              className="group bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-sky-500/50 hover:from-sky-400 hover:to-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3"
            >
              Admin Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="/student/dashboard"
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3"
            >
              Student Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="/teacher/dashboard"
              className="group bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-purple-500/50 hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center gap-3"
            >
              Teacher Portal
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
          <StatCard number="1000+" label="Schools Served" delay={200} />
          <StatCard number="200000+" label="Students Managed" delay={400} />
          <StatCard number="5000+" label="Teachers Connected" delay={600} />
          <StatCard number="99.9%" label="System Uptime" delay={800} />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-6 md:px-20 bg-gradient-to-b from-slate-800 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-cyan-500/20">
              <Award className="w-4 h-4" />
              Award-winning Features
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-100">
              Complete School{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Management Solution
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience comprehensive school administration with integrated student management, 
              attendance tracking, fee collection, timetable management, and powerful analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={Users}
              title="Student Management"
              desc="Complete student lifecycle management with enrollment, profiles, academic records, and parent communication tools."
              delay={0}
            />
            <FeatureCard
              icon={CheckCircle}
              title="Attendance Tracking"
              desc="Real-time attendance monitoring with automated reports, SMS notifications, and detailed analytics for better insights."
              delay={200}
            />
            <FeatureCard
              icon={DollarSign}
              title="Fee Management"
              desc="Streamlined fee collection with online payments, automated reminders, receipts, and comprehensive financial reporting."
              delay={400}
            />
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={TrendingUp}
              title="Academic Analytics"
              desc="Powerful insights into student performance, attendance patterns, fee collection trends, and institutional growth metrics."
              delay={600}
            />
            <FeatureCard
              icon={Shield}
              title="Role-Based Access"
              desc="Secure multi-user system with admin, teacher, and student portals, each with customized dashboards and permissions."
              delay={800}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-24 px-6 md:px-20 bg-gradient-to-r from-gray-800 to-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-100">
              Trusted by Educational Leaders Worldwide
            </h2>
            <p className="text-xl text-gray-400">
              See how schools are transforming their operations with SchoolFlow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Dr. Sarah Johnson"
              role="Principal, Sunrise Academy"
              content="SchoolFlow has transformed our school operations completely. From student enrollment to fee collection, everything is now streamlined and efficient."
            />
            <TestimonialCard
              name="Michael Chen"
              role="Academic Director, Elite High School"
              content="The attendance tracking and parent communication features are incredible. We've seen a 40% improvement in student attendance since implementation."
            />
            <TestimonialCard
              name="Emma Rodriguez"
              role="Administrator, Green Valley School"
              content="The integrated approach to school management is outstanding. Teachers, students, and parents all love the user-friendly interface and real-time updates."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 md:px-20 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-700 text-white text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your School Management?
          </h2>
          <p className="text-xl mb-10 text-gray-300">
            Join thousands of schools who trust SchoolFlow for their complete educational administration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/admin/dashboard"
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-cyan-500/50 hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              Admin Portal
            </a>
            <a
              href="/student/dashboard"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              Student Portal
            </a>
            <a
              href="/teacher/dashboard"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-purple-500/50 hover:from-purple-400 hover:to-indigo-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              Teacher Portal
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative text-center py-12 text-gray-400 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-100">SchoolFlow</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} SchoolFlow. Made with 💙 for educational excellence.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Empowering schools worldwide with comprehensive management solutions.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2s {
          animation-delay: 2s;
        }
        .animation-delay-4s {
          animation-delay: 4s;
        }
      `}</style>
    </main>
</>
    
  );
}