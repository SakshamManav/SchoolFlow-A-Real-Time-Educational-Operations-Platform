export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-white text-gray-800 m-0">
      {/* Hero Section */}
      <section className="w-full py-28 px-6 md:px-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-yellow-300">FeeTrack</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Effortless fee tracking and management for modern institutions.
          </p>
          <a
            href="/students"
            className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:bg-yellow-300 hover:text-black transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
          Powerful Features to Manage Everything
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title=" Track Fees"
            desc="Get real-time updates on payments, dues, and balances of each student."
          />
          <FeatureCard
            title=" Secure Login"
            desc="Easily login using Google with robust session-based security."
          />
          <FeatureCard
            title=" Download Reports"
            desc="Generate fee receipts and reports in Excel or PDF formats."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} FeeTrack. Made with 💙
      </footer>
    </main>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-700">{desc}</p>
    </div>
  );
}
