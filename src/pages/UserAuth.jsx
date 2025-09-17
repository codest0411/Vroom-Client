import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import GoogleAuthButton from '../components/GoogleAuthButton';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);
    if (error) setForgotMsg(error.message);
    else setForgotMsg('Password reset email sent!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else {
        setMessage('Login successful!');
        setTimeout(() => navigate('/user-dashboard'), 500);
      }
    } else {
      // Register
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, role: 'user' } }
      });
      if (error) setMessage(error.message);
      else setMessage('Registration successful! Please check your email to confirm.');
    }
    setLoading(false);
  };

  React.useEffect(() => {
    // Removed auto-redirect to /user-dashboard. User must log in first.
  }, []);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2980] via-[#fcb045] to-[#fd1d1d]">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg p-10 rounded-3xl shadow-2xl relative border border-gray-200 animate-fadein">
        <div className="mb-4 flex items-center text-blue-700 text-sm">
          <a href="/" className="flex items-center hover:text-blue-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Home
          </a>
        </div>
        <button
          onClick={() => setIsLogin((v) => !v)}
          className="absolute right-4 top-4 text-blue-700 text-sm font-semibold focus:outline-none"
        >
          {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
        </button>
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-900 tracking-tight flex items-center justify-center gap-2">
          <span className="inline-block bg-blue-100 rounded-full p-2 text-blue-700 shadow">{isLogin ? '🔑' : '📝'}</span>
          {isLogin ? 'User Login' : 'User Register'}
        </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 text-gray-900 shadow-sm"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 text-gray-900 shadow-sm"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 text-gray-900 pr-10 shadow-sm"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3 cursor-pointer text-xl bg-blue-100 rounded-full p-1 shadow hover:bg-blue-200 transition"
              onClick={() => setShowPassword(v => !v)}
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-extrabold shadow-lg hover:from-blue-600 hover:to-blue-800 transition text-lg" disabled={loading}>
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : (isLogin ? 'Login' : 'Register')}
          </button>
          {isLogin && (
            <div className="text-right text-xs mt-2">
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setShowForgot(true)}>Forgot Password?</button>
            </div>
          )}
          {message && <div className="text-center text-sm mt-2 text-red-500">{message}</div>}
        </form>
        {showForgot && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadein">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-80 border border-gray-200">
              <h3 className="text-2xl font-extrabold mb-4 text-blue-900 text-center">🔒 Reset Password</h3>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 text-gray-900 shadow-sm" required />
                <button type="submit" className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow hover:from-blue-600 hover:to-blue-800 transition">Send Reset Email</button>
                <button type="button" className="w-full py-2 rounded-xl bg-gray-200 text-blue-700 font-bold shadow hover:bg-gray-300 transition" onClick={() => setShowForgot(false)}>Cancel</button>
              </form>
              {forgotMsg && <div className="text-center text-xs mt-3 text-blue-700">{forgotMsg}</div>}
            </div>
          </div>
        )}
        <div className="my-6 text-center text-gray-500">or</div>
        <div className="flex justify-center">
          <GoogleAuthButton label={isLogin ? 'Sign in with Google' : 'Sign up with Google'} redirectTo={window.location.origin + '/user-dashboard'} />
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
