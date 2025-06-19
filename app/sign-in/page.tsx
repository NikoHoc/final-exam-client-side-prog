'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        setErrorMsg(error.message);
        setLoading(false);
    } else {
        Swal.fire({
            icon: "success",
            title: "Sukses",
            text: "Login berhasil!",
            confirmButtonText: "OK",
        }).then(() => {
            router.push("/");
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl text-black font-semibold text-center mb-6">Sign in for full access</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-black p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-black  p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            {loading ? (
                <span className="loading loading-bars loading-lg"></span>
            ) : 'Login'}
          </button>
        </form>

        <h2 className="text-center text-black mt-3">
          Don't have an account? <Link href="/sign-up" className='text-blue-600 underline decoration-blue-600 md:decoration-blue-400'>Sign Up</Link>
        </h2>

        {errorMsg && <p className="mt-4 text-red-500 text-center">{errorMsg}</p>}
      </div>
    </div>
  );
}