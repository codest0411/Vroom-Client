import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import GoogleAuthButton from '../components/GoogleAuthButton';

const DriverAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [aadhaar, setAadhaar] = useState('');

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

  // Verhoeff algorithm for Aadhaar validation
  const d = [
    [0,1,2,3,4,5,6,7,8,9],
    [1,2,3,4,0,6,7,8,9,5],
    [2,3,4,0,1,7,8,9,5,6],
    [3,4,0,1,2,8,9,5,6,7],
    [4,0,1,2,3,9,5,6,7,8],
    [5,9,8,7,6,0,4,3,2,1],
    [6,5,9,8,7,1,0,4,3,2],
    [7,6,5,9,8,2,1,0,4,3],
    [8,7,6,5,9,3,2,1,0,4],
    [9,8,7,6,5,4,3,2,1,0]
  ];
  const p = [
    [0,1,2,3,4,5,6,7,8,9],
    [1,5,7,6,2,8,3,0,9,4],
    [5,8,0,3,7,9,6,1,4,2],
    [8,9,1,6,0,4,3,5,2,7],
    [9,4,5,3,1,2,6,8,7,0],
    [4,2,8,6,5,7,3,9,0,1],
    [2,7,9,3,8,0,6,4,1,5],
    [7,0,4,6,9,1,3,2,5,8]
  ];
  // const inv = [0,4,3,2,1,5,6,7,8,9]; // Not used
  function validateAadhaar(num) {
    if (!/^[2-9]{1}[0-9]{11}$/.test(num)) return false;
    let c = 0, len = num.length;
    for (let i = 0; i < len; i++) {
      c = d[c][p[(i%8)][parseInt(num[len-i-1],10)]];
    }
    return c === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if (isLogin) {
      // Login as driver only
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else if (data.user.user_metadata?.role === 'driver') {
        setMessage('Login successful!');
        setTimeout(() => navigate('/driver'), 500);
      } else {
        setMessage('You are not registered as a driver.');
        await supabase.auth.signOut();
      }
    } else {
      // Register as driver only
      if (!validateAadhaar(aadhaar)) {
        setMessage('Invalid Aadhaar number.');
        setLoading(false);
        return;
      }
  // (No duplicate Aadhaar check, just validate format)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, aadhaar, role: 'driver' } }
      });
      if (error) {
        setMessage(error.message);
      } else {
  // Insert into drivers table
        const userId = data?.user?.id;
        if (userId) {
          await supabase.from('drivers').insert({ id: userId, full_name: fullName, aadhaar });
        }
        setMessage('Registration successful! Please check your email to confirm.');
      }
    }
    setLoading(false);
  };

  React.useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session && data.session.user?.user_metadata?.role === 'driver') {
        navigate('/driver');
      }
    };
    checkSession();
  }, [navigate]);

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fd1d1d] via-[#26d0ce] to-[#fcb045]">
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
          <span className="inline-block bg-blue-100 rounded-full p-2 text-blue-700 shadow">{isLogin ? '🚗' : '📝'}</span>
          {isLogin ? 'Driver Login' : 'Driver Register'}
        </h2>
  <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/70 text-gray-900 shadow-sm"
                required
              />
              <input
                type="text"
                placeholder="Aadhaar Number"
                value={aadhaar}
                onChange={e => setAadhaar(e.target.value.replace(/[^0-9]/g, ''))}
                maxLength={12}
                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-white/70 text-gray-900 shadow-sm ${aadhaar.length === 12 ? (validateAadhaar(aadhaar) ? 'border-green-500 focus:ring-green-400' : 'border-red-500 focus:ring-red-400') : 'border-blue-200 focus:ring-yellow-400'}`}
                required
              />
              {aadhaar.length === 12 && (
                <div className={`text-sm mt-1 ${validateAadhaar(aadhaar) ? 'text-green-600' : 'text-red-600'}`}>
                  {validateAadhaar(aadhaar) ? 'Aadhaar number is valid.' : 'Invalid Aadhaar number.'}
                </div>
              )}
            </>
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
          {message && <div className="text-center text-sm mt-2 text-red-500">{message}</div>}
          {isLogin && (
            <div className="text-right text-xs mt-2">
              <button type="button" className="text-blue-600 hover:underline" onClick={() => setShowForgot(true)}>Forgot Password?</button>
            </div>
          )}
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
          <GoogleAuthButton label={isLogin ? 'Sign in with Google' : 'Sign up with Google'} redirectTo={window.location.origin + '/driver'} />
        </div>
      </div>
    </div>
  );
};

export default DriverAuth;
