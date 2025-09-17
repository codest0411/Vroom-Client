import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Home = () => {
  const navigate = useNavigate();

  const handlePricingClick = async (e) => {
    e.preventDefault();
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      navigate('/pricing');
    } else {
      alert('Please login first to view pricing.');
      navigate('/user-auth');
    }
  };

  return (
  <>
  <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] relative overflow-hidden text-base" style={{backgroundImage: 'radial-gradient(circle at 20% 40%, #F9D423 0%, transparent 60%), radial-gradient(circle at 80% 70%, #24C6DC 0%, transparent 60%)'}}>
      {/* Header */}
  <header className="w-full flex items-center justify-between px-12 py-8 bg-gradient-to-r from-[#3A1C71] via-[#D76D77] to-[#FFAF7B] shadow-2xl z-20 relative border-b-4 border-[#F9D423]">
        <nav className="flex items-center gap-8">
          <span className="font-extrabold text-5xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F9D423] via-[#24C6DC] to-[#3A1C71] drop-shadow-lg">VroomVroom</span>
          <a href="#features" className="text-white font-semibold hover:text-[#F2B134]">Features</a>
          <a href="#support" className="text-white font-semibold hover:text-[#F2B134]">Support Tracking</a>
          <a href="/pricing" className="text-white font-semibold hover:text-[#F2B134]" onClick={handlePricingClick}>Pricing</a>
          <a href="#contact" className="text-white font-semibold hover:text-[#F2B134]">Contact</a>
          <a href="#blog" className="text-white font-semibold hover:text-[#F2B134]">Blog</a>
        </nav>
        <div className="flex gap-8 items-center justify-end mt-0">
          <a href="/user-auth" className="flex items-center justify-center min-w-[5rem] px-4 h-8 bg-gradient-to-r from-yellow-300 to-yellow-400 text-[#B94A2C] font-bold rounded-full shadow-md transition-all duration-200 text-sm text-center hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 focus:outline-none">User Login</a>
          <a href="/driver-auth" className="flex items-center justify-center min-w-[5rem] px-4 h-8 bg-gradient-to-r from-yellow-300 to-yellow-400 text-[#B94A2C] font-bold rounded-full shadow-md transition-all duration-200 text-sm text-center hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 focus:outline-none">Driver Login</a>
          {/* Admin Login removed */}
        </div>
      </header>

    {/* Hero Section - Unique Gradient & Pattern */}
  <section className="w-full flex flex-col items-center justify-center px-4 py-16 relative min-h-[32rem] bg-gradient-to-br from-[#24C6DC] via-[#5433FF] to-[#F9D423]" style={{backgroundImage: 'radial-gradient(circle at 60% 20%, #FFAF7B 0%, transparent 60%), radial-gradient(circle at 30% 80%, #D76D77 0%, transparent 60%)'}}>
        <div className="max-w-3xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fd1d1d] to-[#fcb045] mb-8 tracking-tight drop-shadow-2xl">VroomVroom is the simple ride and booking tracker.</h1>
          <p className="text-xl md:text-2xl text-[#3A1C71] font-medium mb-10">Your City, Your Ride, Your Way.<br />VroomVroom is a modern ride-hailing platform designed to connect riders with drivers seamlessly. Whether you need a quick bike ride through the city or a comfortable car journey, VroomVroom ensures fast, safe, and affordable travel. With real-time tracking, secure payments, and trusted drivers, VroomVroom makes commuting smarter and easier.</p>
          <a href='/user-auth'><button className="bg-[#F2B134] text-[#B94A2C] font-extrabold py-5 px-12 rounded-2xl transition text-3xl shadow-xl hover:bg-[#B94A2C] hover:text-[#F2B134] focus:outline-none focus:ring-4 focus:ring-[#F2B134]">BOOK NOW</button></a>
  <a href='/driver-auth' className="ml-6"><button className="bg-[#F2B134] text-[#B94A2C] font-extrabold py-5 px-12 rounded-2xl transition text-3xl shadow-xl hover:bg-[#B94A2C] hover:text-[#F2B134] focus:outline-none focus:ring-4 focus:ring-[#F2B134]">BECOME DRIVER</button></a>
        </div>
        {/* Abstract SVG pattern overlay for uniqueness */}
        <svg className="absolute left-0 top-0 w-full h-full z-0" style={{pointerEvents:'none'}} viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="120" r="120" fill="#F9D423" fillOpacity="0.18" />
          <circle cx="1240" cy="200" r="160" fill="#24C6DC" fillOpacity="0.13" />
          <rect x="600" y="40" width="240" height="80" rx="40" fill="#3A1C71" fillOpacity="0.10" />
        </svg>
      </section>
      
    {/* Features Section - Unique Color */}
  <section id="features" className="w-full py-20 bg-gradient-to-r from-[#5433FF] via-[#24C6DC] to-[#F9D423] flex flex-col items-center justify-center">
  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F9D423] via-[#3A1C71] to-[#24C6DC] mb-8 tracking-wide">Features</h2>
        <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFF7E6] rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-[#F9D423]">
            <span className="text-3xl text-[#C15336] mb-4">🚗</span>
            <div className="font-bold mb-2">Fast Booking</div>
            <div className="text-gray-500 text-center">Book your ride in seconds with our intuitive platform.</div>
          </div>
          <div className="bg-[#E6F7FF] rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-[#24C6DC]">
            <span className="text-3xl text-[#C15336] mb-4">🔒</span>
            <div className="font-bold mb-2">Secure Payments</div>
            <div className="text-gray-500 text-center">Pay safely with multiple payment options and encryption.</div>
          </div>
          <div className="bg-[#F9E6FF] rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-[#3A1C71]">
            <span className="text-3xl text-[#C15336] mb-4">📍</span>
            <div className="font-bold mb-2">Live Tracking</div>
            <div className="text-gray-500 text-center">Track your ride in real-time from pickup to drop-off.</div>
          </div>
        </div>
      </section>

      {/* Support Tracking Section */}
  <section id="support" className="w-full py-20 bg-gradient-to-r from-[#FFAF7B] via-[#F9D423] to-[#24C6DC] flex flex-col items-center justify-center">
  <div className="bg-white rounded-2xl shadow-2xl max-w-3xl px-10 py-10 text-center mb-2 border-4 border-[#3A1C71]">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3A1C71] via-[#24C6DC] to-[#F9D423] mb-8 tracking-wide">Support Tracking</h2>
          <div className="text-lg text-[#3A1C71] mb-6">
            Our support tracking system ensures you are never alone on your journey. With VroomVroom, you can:
          </div>
          <ul className="list-disc list-inside text-left text-[#3A1C71] mb-6">
            <li>Track your ride status in real-time and receive instant notifications for every update.</li>
            <li>Contact our support team directly from the app via live chat, email, or phone for any ride-related issues.</li>
            <li>Access a detailed history of your rides and support requests for full transparency.</li>
            <li>Get proactive help: if your ride is delayed, canceled, or you need assistance, our team will reach out to you first.</li>
            <li>Share your live ride location with friends or family for added safety and peace of mind.</li>
            <li>Rate your support experience and help us improve our service continuously.</li>
          </ul>
          <div className="text-lg text-[#3A1C71]">
            Our support team is available 24/7 to help you track your ride, resolve issues, and answer your questions. Get instant updates and support through chat, email, or phone.
          </div>
        </div>
      </section>

      {/* Contact Section */}
  <section id="contact" className="w-full pt-6 pb-20 bg-gradient-to-r from-[#24C6DC] via-[#F9D423] to-[#FFAF7B] flex flex-col items-center justify-center">
  <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3A1C71] via-[#24C6DC] to-[#F9D423] mb-8 tracking-wide">Contact</h2>
  <div className="max-w-3xl text-center text-lg text-[#3A1C71] mb-6">Have questions or need help? Reach out to us anytime!</div>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="bg-[#FFF7E6] rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-[#F9D423]">
            <div className="font-bold mb-2 text-[#C15336]">Email</div>
            <div className="text-gray-500">usesuber3@gmail.com</div>
          </div>
          <div className="bg-[#E6F7FF] rounded-2xl shadow-xl p-8 flex flex-col items-center border-2 border-[#24C6DC]">
            <div className="font-bold mb-2 text-[#C15336]">Phone</div>
            <div className="text-gray-500">+917795001796</div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
  <section id="blog" className="w-full py-20 bg-[#C15336] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-white mb-8 tracking-wide">Blog</h2>
        <div className="max-w-3xl text-center text-lg text-white/90">Read our latest updates, tips, and stories about ride-hailing, travel, and technology. Stay informed and inspired with VroomVroom!</div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-black via-gray-900 to-gray-800 py-10 border-t mt-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-4">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-2 tracking-wide">VroomVroom</div>
            <div className="text-gray-400 mb-4">We provide the best taxi services for you all over the country.</div> <br /><div className="text-[#B94A2C] mb-4">Your City, Your Ride, Your Way ! Just Enjot The Ride VroomVroom</div>
            {/* <button className="bg-gradient-to-r from-red-600 to-red-400 text-white font-extrabold px-10 py-4 rounded-xl transition text-lg shadow-2xl hover:scale-105">ORDER NOW</button> */}
          </div>
          <div className="flex-1 mb-6 md:mb-0">
            <div className="font-bold mb-2 text-white">ABOUT</div>
            <div className="text-gray-600 text-sm">About Us<br />Careers<br />Press and media</div>
          </div>
          <div className="flex-1 mb-6 md:mb-0">
            <div className="font-bold mb-2 text-white">QUICK LINKS</div>
            <div className="text-gray-600 text-sm flex flex-col gap-1">
              <a href="/user-auth" className="hover:text-[#F2B134] transition-colors">Sign Up</a>
              {/* <a href="/pricing" className="hover:text-[#F2B134] transition-colors">Pricing</a> */}
              <a href="#support" className="hover:text-[#F2B134] transition-colors">Online Help</a>
              <a href="#features" className="hover:text-[#F2B134] transition-colors">Services</a>
              <a href="#blog" className="hover:text-[#F2B134] transition-colors">Blog</a>
            </div>
          </div>
          <div className="flex-1">
            <div className="font-bold mb-2 text-white">CONTACTS</div>
            <div className="text-gray-600 text-sm">usesuber3@gmail.com<br />+91 7795001796</div>
            <div className="flex gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><span className="text-blue-700">&#9679;</span></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><span className="text-blue-400">&#9679;</span></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><span className="text-pink-500">&#9679;</span></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><span className="text-blue-900">&#9679;</span></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs mt-8">© 2025, All Rights Reserved</div>
      </footer>
    </div>
    </>
  );
};



export default Home;