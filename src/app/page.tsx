'use client';

import { useState } from 'react';
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

type UserRole = 'admin' | 'teacher' | 'student';

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  username: string;
}

export default function Home() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null,
    username: ''
  });

  const handleLogin = (role: UserRole, credentials: { username: string; password: string }) => {
    // In a real application, you would validate credentials against your backend
    // For now, we'll simulate a successful login
    setAuth({
      isAuthenticated: true,
      userRole: role,
      username: credentials.username
    });
  };

  if (!auth.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Only admin and teacher roles can access the dashboard
  if (auth.userRole === 'student') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Student Portal</h1>
          <p className="text-gray-600 mb-4">Welcome, {auth.username}!</p>
          <p className="text-gray-600">Student dashboard is under construction.</p>
          <button
            onClick={() => setAuth({ isAuthenticated: false, userRole: null, username: '' })}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="p-4 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-semibold">Welcome, {auth.username}</h1>
        <button
          onClick={() => setAuth({ isAuthenticated: false, userRole: null, username: '' })}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <HomePage 
        title="School Dashboard" 
        userRole={auth.userRole as 'admin' | 'teacher'}
        teacherClass={auth.userRole === 'teacher' ? 'Class 5A' : undefined}
      />
    </div>
  );
}
