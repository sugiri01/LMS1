
import React from 'react';
import { 
  Settings, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut,
  User 
} from 'lucide-react';
import { Module, UserRole } from '@/types/courseTypes';

interface ProfilePageProps {
  modules: Module[];
  userRole: UserRole;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ modules, userRole }) => {
  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center text-gray-500">
                <User size={48} />
              </div>
              <h3 className="text-xl font-bold">{userRole === 'student' ? 'Alex Johnson' : 'Prof. Davis'}</h3>
              <p className="text-gray-500 capitalize">{userRole}</p>
              
              <button className="mt-4 text-blue-600 text-sm">
                Change Profile Picture
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <button className="flex items-center text-gray-700 w-full hover:text-blue-600">
                  <Settings size={16} className="mr-2" />
                  Account Settings
                </button>
              </li>
              <li>
                <button className="flex items-center text-gray-700 w-full hover:text-blue-600">
                  <Bell size={16} className="mr-2" />
                  Notification Preferences
                </button>
              </li>
              <li>
                <button className="flex items-center text-gray-700 w-full hover:text-blue-600">
                  <Lock size={16} className="mr-2" />
                  Privacy Settings
                </button>
              </li>
              <li>
                <button className="flex items-center text-gray-700 w-full hover:text-blue-600">
                  <HelpCircle size={16} className="mr-2" />
                  Help & Support
                </button>
              </li>
              <li>
                <button className="flex items-center text-red-600 w-full">
                  <LogOut size={16} className="mr-2" />
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h3 className="font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md"
                  value={userRole === 'student' ? 'Alex Johnson' : 'Prof. Davis'}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border rounded-md"
                  value={userRole === 'student' ? 'alex.j@example.com' : 'prof.davis@example.com'}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="tel" 
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter your location"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                className="w-full p-2 border rounded-md"
                rows={3}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Save Changes
              </button>
            </div>
          </div>
          
          {userRole === 'student' ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">My Progress</h3>
              <div className="space-y-4">
                {modules.map(module => (
                  <div key={module.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{module.title}</span>
                      <span className="text-sm text-gray-500">
                        {Math.round((module.completed / module.total) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(module.completed / module.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Teaching Schedule</h3>
              <div className="space-y-3">
                <div className="border-b pb-3">
                  <div className="font-medium">Live Coding Session</div>
                  <div className="text-sm text-gray-500">Apr 5, 2025 • 3:00 PM - 4:30 PM</div>
                </div>
                <div className="border-b pb-3">
                  <div className="font-medium">Office Hours</div>
                  <div className="text-sm text-gray-500">Apr 2, 2025 • 1:00 PM - 3:00 PM</div>
                </div>
                <div>
                  <div className="font-medium">Final Project Introduction</div>
                  <div className="text-sm text-gray-500">Apr 10, 2025 • 2:00 PM - 3:00 PM</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
