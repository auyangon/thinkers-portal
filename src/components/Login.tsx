import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GraduationCap, Sparkles } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { decodeGoogleCredential } from '../services/googleAuth';

const QUOTES = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" }
];

const getQuote = () => QUOTES[Math.floor(Date.now() / 86400000) % QUOTES.length];

export default function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const { loginWithGoogle } = useStudent();
  const quote = getQuote();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = () => time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const handleSuccess = async (resp: any) => {
    if (!resp.credential) return;
    setIsLoading(true);
    setError('');
    try {
      const user = decodeGoogleCredential(resp.credential);
      if (user?.email) {
        const success = await loginWithGoogle(user.email);
        if (!success) setError('Email not found. Please use your AUY email.');
      }
    } catch {
      setError('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-seafoam-900 to-seafoam-700">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-seafoam-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-seafoam-900">AUY Student Portal</h1>
            <p className="text-seafoam-600 mt-1">{formatDate()} • {formatTime()}</p>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setError('Login failed')}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
          {isLoading && <p className="text-center mt-4 text-seafoam-600">Logging in...</p>}

          <div className="mt-6 p-4 bg-seafoam-50 rounded-xl">
            <div className="flex items-start gap-2">
              <Sparkles size={16} className="text-seafoam-500 mt-0.5" />
              <p className="text-sm text-seafoam-700 italic">"{quote.text}"</p>
            </div>
            <p className="text-xs text-seafoam-500 mt-2 text-right">- {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
