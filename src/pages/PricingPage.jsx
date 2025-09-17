import React from "react";
import { Link } from "react-router-dom";
// import { startStripeCheckout } from "../utils/stripeCheckout";
import { useState } from "react";
import { supabase } from "../supabaseClient";

const PricingPage = ({ isDark }) => (
  <div className={"min-h-screen flex flex-col bg-[#C15336]"}>
    {/* Navbar - same as UserDashboard */}
    <nav className={isDark ? "w-full flex items-center justify-between px-8 py-4 bg-gray-800/80 border-b border-gray-700 backdrop-blur-lg" : "w-full flex items-center justify-between px-8 py-4 bg-white/80 border-b border-gray-200 backdrop-blur-lg"}>
      <div className="flex items-center gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-extrabold text-2xl">V</span>
          </div>
          <h1 className={isDark ? "text-3xl font-extrabold text-white" : "text-3xl font-extrabold text-gray-900"}>VroomVroom</h1>
          <Link to="/user-dashboard" className={isDark ? "ml-6 px-5 py-2 bg-gray-700/80 text-white rounded-xl font-semibold hover:bg-gray-600/80 shadow transition" : "ml-6 px-5 py-2 bg-white/80 rounded-xl font-semibold hover:bg-gray-200/80 shadow transition"}>Dashboard</Link>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/profile" className={isDark ? "px-5 py-2 bg-gray-700/80 text-white rounded-xl font-semibold hover:bg-gray-600/80 shadow transition" : "px-5 py-2 bg-white/80 rounded-xl font-semibold hover:bg-gray-200/80 shadow transition"}>Profile</Link>
        <Link to="/settings" className={isDark ? "px-5 py-2 bg-gray-700/80 text-white rounded-xl font-semibold hover:bg-gray-600/80 shadow transition" : "px-5 py-2 bg-white/80 rounded-xl font-semibold hover:bg-gray-200/80 shadow transition"}>Settings</Link>
      </div>
    </nav>
    {/* Pricing Section */}
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <section className="w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-2 tracking-wide text-center">Pricing & Plans</h2>
        <p className="text-lg text-white mb-10 text-center">Choose the perfect plan for your ride needs. Start free and upgrade as you grow.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-white border-2 border-[#F2B134] rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <div className="font-bold text-2xl text-[#B94A2C] mb-2">VroomVroom Free</div>
            <div className="text-3xl font-extrabold text-[#F2B134] mb-2">₹0</div>
            <div className="text-[#B94A2C] mb-4 text-center">First Ride is Free <br />Basic support<br />Standard ride quality<br />Email support</div>
            <button className="bg-[#F2B134] text-[#B94A2C] font-bold px-6 py-2 rounded-xl mt-2">Current Plan</button>
          </div>
          {/* Pro Plan */}
          <div className="bg-white border-2 border-[#D97B2A] rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <div className="font-bold text-2xl text-[#B94A2C] mb-2">VroomVroom Pro</div>
            <div className="text-3xl font-extrabold text-[#D97B2A] mb-2">₹499<span className="text-base font-normal text-[#B94A2C]">/mo</span></div>
            <div className="text-[#B94A2C] mb-4 text-center">Free 10 rides/month Under 2km<br />Priority support<br />High-quality rides<br />Live chat support<br />Export ride history</div>
            <StripeCheckoutButton amount={499} label="Upgrade to VVP" />
          </div>
          {/* Premium Plan */}
          <div className="bg-white border-2 border-[#B94A2C] rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <div className="font-bold text-2xl text-[#B94A2C] mb-2">VroomVroom Pro Max</div>
            <div className="text-3xl font-extrabold text-[#B94A2C] mb-2">₹999<span className="text-base font-normal text-[#D97B2A]">/mo</span></div>
            <div className="text-[#B94A2C] mb-4 text-center">Free Every 2 km Rides/Month<br />Free 2 Rides/Month Under 5km <br /> Free 1 Ride/Month Under 10km<br /> 24/7 priority support<br />Ultra-high ride quality<br />Advanced ride tracking<br />Team collaboration<br />All access</div>
            <StripeCheckoutButton amount={999} label="Upgrade to VVPM" />

          </div>
        </div>
        {/* All Plans Include */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-[#F2B134] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl text-[#B94A2C] mb-2">🔒</span>
            <div className="font-bold text-[#B94A2C] mb-1">Secure & Private</div>
            <div className="text-[#B94A2C] text-center text-sm">Your ride data is encrypted and never shared. Ride with confidence.</div>
          </div>
          <div className="bg-[#F2B134] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl text-[#B94A2C] mb-2">⚡</span>
            <div className="font-bold text-[#B94A2C] mb-1">Fast Processing</div>
            <div className="text-[#B94A2C] text-center text-sm">Get anywhere quickly with our optimized ride algorithms.</div>
          </div>
          <div className="bg-[#F2B134] rounded-xl shadow-lg p-6 flex flex-col items-center">
            <span className="text-3xl text-[#B94A2C] mb-2">👍</span>
            <div className="font-bold text-[#B94A2C] mb-1">Easy to Use</div>
            <div className="text-[#B94A2C] text-center text-sm">Simple ride booking designed for the best experience.</div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="max-w-5xl w-full mb-12 mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#B94A2C] rounded-xl shadow p-6">
              <div className="font-bold text-white mb-2">Can I change plans anytime?</div>
              <div className="text-white text-sm">Yes! Choose the plan that fits you and upgrade when you need more features.</div>
            </div>
            <div className="bg-[#B94A2C] rounded-xl shadow p-6">
              <div className="font-bold text-white mb-2">What payment methods are supported?</div>
              <div className="text-white text-sm">We accept UPI, credit/debit cards, and net banking for all plans.</div>
            </div>
            <div className="bg-[#B94A2C] rounded-xl shadow p-6">
              <div className="font-bold text-white mb-2">Is there a free trial?</div>
              <div className="text-white text-sm">You can start with the Free plan and upgrade when you need more features.</div>
            </div>
            <div className="bg-[#B94A2C] rounded-xl shadow p-6">
              <div className="font-bold text-white mb-2">How secure is my ride data?</div>
              <div className="text-white text-sm">All rides are encrypted and stored safely. Higher plans offer advanced privacy options.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);


// StripeCheckoutButton component using Stripe.js redirectToCheckout
function StripeCheckoutButton({ amount, label }) {
  const [loading, setLoading] = useState(false);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.auth.getUser();
      const userId = data?.user?.email || "guest";
  const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"}/api/payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, type: "plan", userId })
      });
      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        alert("Failed to create Stripe checkout session");
      }
    } catch (err) {
      alert("Stripe checkout failed: " + err.message);
      console.error("Stripe checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-[#D97B2A] text-white font-bold px-6 py-2 rounded-xl mt-2 disabled:opacity-60"
      onClick={handleStripeCheckout}
      disabled={loading}
    >
      {loading ? "Redirecting..." : label}
    </button>
  );
}

export default PricingPage;
