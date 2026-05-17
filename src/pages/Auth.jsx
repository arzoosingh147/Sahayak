import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserCircleIcon, EnvelopeIcon, LockClosedIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

// Destructured setLoginState prop from App.jsx to handle instant route evaluation
const Auth = ({ setLoginState }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const handleAction = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login Logic
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser && savedUser.email === formData.email && savedUser.password === formData.password) {
        setMessage(`Welcome back, ${savedUser.name}!`);
        localStorage.setItem("isLoggedIn", "true");
        
        // 1. Instantly update App.jsx global auth state
        if (setLoginState) setLoginState(true);
        
        // Redirect to dashboard after 1.5 seconds so user sees the welcome popup
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1500);

      } else {
        setMessage("Invalid credentials!");
      }
    } else {
      // Signup Logic
      localStorage.setItem("user", JSON.stringify(formData));
      setMessage("Account created successfully!");
      localStorage.setItem("isLoggedIn", "true");
      
      // 2. Instantly update App.jsx global auth state for signup
      if (setLoginState) setLoginState(true);
      
      // Redirect to dashboard after 1.5 seconds so user sees the success popup
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }

    // Auto-hide popup message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FFE4D7] flex items-center justify-center px-6 pt-20 relative">
      
      {/* Popup Message */}
      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-28 z-[60] bg-[#093832] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-[#F1A6B4]"
          >
            <CheckCircleIcon className="w-5 h-5 text-[#F1A6B4]" />
            <span className="font-bold text-sm">{message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/20 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F1A6B4]/20 rounded-full blur-3xl" />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#093832]">
            {isLogin ? 'Welcome Back' : 'Join Sahayak'}
          </h2>
          <p className="text-[#093832]/60 mt-2">
            {isLogin ? 'We missed you! Please sign in.' : 'Start your journey to wellness today.'}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleAction}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative"
              >
                <UserCircleIcon className="w-5 h-5 text-[#093832]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  required
                  placeholder="Full Name"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-[#FFF4E0] border-none rounded-2xl focus:ring-2 focus:ring-[#F1A6B4] text-[#093832] outline-none transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <EnvelopeIcon className="w-5 h-5 text-[#093832]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="email" 
              required
              placeholder="Email Address"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-[#E8F3F1] border-none rounded-2xl focus:ring-2 focus:ring-[#F1A6B4] text-[#093832] outline-none transition-all"
            />
          </div>

          <div className="relative">
            <LockClosedIcon className="w-5 h-5 text-[#093832]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="password" 
              required
              placeholder="Password"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-12 pr-4 py-4 bg-[#F3E8FF] border-none rounded-2xl focus:ring-2 focus:ring-[#F1A6B4] text-[#093832] outline-none transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#e095a3" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#F1A6B4] text-[#093832] py-4 rounded-2xl font-bold shadow-lg mt-4 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={toggleAuth}
            className="text-[#093832] font-semibold hover:text-[#F1A6B4] transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
