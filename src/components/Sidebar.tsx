
import React from 'react';
import { 
  Home, BookOpen, FileText, MessageSquare, Book, BarChart2, 
  Users, Calendar, User, Settings, LogOut 
} from 'lucide-react';
import { ActivePage, UserRole } from '../types/courseTypes';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, userRole, setUserRole }) => {
  const { logout, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-xl font-bold">Python for All</h1>
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 text-xs rounded bg-blue-600">
            {userRole === 'student' ? 'Student' : 'Teacher'}
          </div>
          <button 
            onClick={() => setUserRole(userRole === 'student' ? 'teacher' : 'student')}
            className="text-xs text-gray-400 hover:text-white"
          >
            Switch
          </button>
        </div>
      </div>
      <div className="p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActivePage('dashboard')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('modules')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'modules' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <BookOpen size={18} />
                <span>My Courses</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('assignments')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'assignments' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <FileText size={18} />
                <span>Assignments</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('discussions')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'discussions' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <MessageSquare size={18} />
                <span>Discussion</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('resources')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'resources' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <Book size={18} />
                <span>Resources</span>
              </button>
            </li>
            {userRole === 'teacher' && (
              <>
                <li>
                  <button 
                    onClick={() => setActivePage('students')}
                    className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'students' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  >
                    <Users size={18} />
                    <span>Students</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePage('analytics')}
                    className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'analytics' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
                  >
                    <BarChart2 size={18} />
                    <span>Analytics</span>
                  </button>
                </li>
              </>
            )}
            <li>
              <button 
                onClick={() => setActivePage('calendar')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'calendar' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <Calendar size={18} />
                <span>Calendar</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActivePage('profile')}
                className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'profile' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                <User size={18} />
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button 
          onClick={() => setActivePage('settings')}
          className={`flex items-center space-x-2 w-full p-2 rounded ${activePage === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 w-full p-2 rounded hover:bg-gray-700 text-red-400"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
