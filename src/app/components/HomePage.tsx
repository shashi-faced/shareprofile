'use client';

import { FC, useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarCheck, FaBookReader } from 'react-icons/fa';

interface HomePageProps {
  title: string;
  userRole?: 'admin' | 'teacher';
  teacherClass?: string;
}

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgColor: string;
}

const StatsCard: FC<StatsCardProps> = ({ title, value, icon, bgColor }) => (
  <div className={`${bgColor} p-4 sm:p-6 rounded-lg shadow-lg text-white`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{title}</p>
        <h3 className="text-2xl sm:text-3xl font-bold">{value}</h3>
      </div>
      <div className="text-3xl sm:text-4xl opacity-80">{icon}</div>
    </div>
  </div>
);

const HomePage: FC<HomePageProps> = ({ title, userRole = 'teacher', teacherClass }) => {
  const mockStats = {
    totalStudents: userRole === 'admin' ? 450 : 35,
    totalTeachers: 15,
    attendanceToday: userRole === 'admin' ? '92%' : '95%',
    classesInSession: userRole === 'admin' ? 5 : 6 // 6 subjects for teachers
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
              {userRole === 'admin' 
                ? 'School Administration Dashboard' 
                : `Class Teacher - ${teacherClass || 'Class Assignment Pending'}`}
            </p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow self-start sm:self-auto">
            <p className="text-xs sm:text-sm text-gray-600">Academic Year</p>
            <p className="text-base sm:text-lg font-semibold">2024-2025</p>
          </div>
        </div>

        {/* Quick Stats Grid - Improved for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
          <StatsCard
            title={userRole === 'admin' ? 'Total Students' : 'Class Students'}
            value={mockStats.totalStudents}
            icon={<FaUserGraduate />}
            bgColor="bg-blue-600"
          />
          {userRole === 'admin' && (
            <StatsCard
              title="Total Teachers"
              value={mockStats.totalTeachers}
              icon={<FaChalkboardTeacher />}
              bgColor="bg-green-600"
            />
          )}
          <StatsCard
            title="Today's Attendance"
            value={mockStats.attendanceToday}
            icon={<FaCalendarCheck />}
            bgColor="bg-purple-600"
          />
          <StatsCard
            title={userRole === 'admin' ? 'Active Classes' : 'Today\'s Subjects'}
            value={mockStats.classesInSession}
            icon={<FaBookReader />}
            bgColor="bg-orange-600"
          />
        </div>

        {/* Quick Actions and Recent Updates - Improved for mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <button className="p-3 sm:p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm sm:text-base">
                Mark Attendance
              </button>
              <button className="p-3 sm:p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-sm sm:text-base">
                {userRole === 'admin' ? 'View All Reports' : 'Class Reports'}
              </button>
              <button className="p-3 sm:p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm sm:text-base">
                {userRole === 'admin' ? 'Manage Results' : 'Update Results'}
              </button>
              {userRole === 'admin' ? (
                <button className="p-3 sm:p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm sm:text-base">
                  Manage Teachers
                </button>
              ) : (
                <button className="p-3 sm:p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm sm:text-base">
                  Submit Leave Request
                </button>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Recent Updates</h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                <p className="text-xs sm:text-sm text-gray-600">Today, 2:30 PM</p>
                <p className="text-sm sm:text-base text-gray-800">
                  {userRole === 'admin' 
                    ? 'All classes attendance updated'
                    : `${teacherClass} attendance marked`}
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                <p className="text-xs sm:text-sm text-gray-600">Today, 11:00 AM</p>
                <p className="text-sm sm:text-base text-gray-800">
                  {userRole === 'admin'
                    ? 'Monthly assessment results published'
                    : 'Mathematics test results updated'}
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3 sm:pl-4">
                <p className="text-xs sm:text-sm text-gray-600">Yesterday</p>
                <p className="text-sm sm:text-base text-gray-800">
                  {userRole === 'admin'
                    ? 'New academic calendar published'
                    : 'Parent-teacher meeting schedule updated'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
