'use client';

import { FC, useState } from 'react';

type UserRole = 'admin' | 'teacher' | 'student';

interface LoginPageProps {
  onLogin: (role: UserRole, credentials: { username: string; password: string }) => void;
}

const LoginPage: FC<LoginPageProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<UserRole>('admin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(activeTab, { username, password });
  };

  const tabs: UserRole[] = ['admin', 'student', 'teacher'];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 sm:py-12">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
            School Management System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please login to access your dashboard
          </p>
        </div>

        {/* Tabs - more responsive for mobile */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setUsername('');
                setPassword('');
              }}
              className={`px-3 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize sm:px-4
                ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <form className="mt-6 space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base"
                placeholder={`${activeTab} username`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm sm:text-base"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:py-3"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
