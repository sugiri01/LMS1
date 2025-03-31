
import React, { useState } from 'react';
import { Play, Award, CheckCircle, Clock, BarChart2, Edit, Trash, PlusCircle } from 'lucide-react';
import { Module, Deadline, Announcement, Student, UserRole, Assignment } from '../types/courseTypes';

interface DashboardProps {
  modules: Module[];
  upcomingDeadlines: Deadline[];
  announcements: Announcement[];
  students: Student[];
  assignments: Assignment[];
  userRole: UserRole;
  setActivePage: (page: any) => void;
  setActiveModule: (moduleId: number) => void;
  setActiveLesson: (lessonId: number) => void;
  toggleModule: (moduleId: number) => void;
  expandedModules: number[];
  setAnnouncements: React.Dispatch<React.SetStateAction<Announcement[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  modules, 
  upcomingDeadlines, 
  announcements, 
  students,
  assignments,
  userRole,
  setActivePage, 
  setActiveModule, 
  setActiveLesson, 
  toggleModule,
  expandedModules,
  setAnnouncements
}) => {
  const [showAddContent, setShowAddContent] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  const totalLessons = modules.reduce((sum, module) => sum + module.total, 0);
  const completedLessons = modules.reduce((sum, module) => sum + module.completed, 0);
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100);

  const handleAddAnnouncement = () => {
    if (newAnnouncementTitle.trim() === '' || newAnnouncementContent.trim() === '') return;
    
    const newAnnouncement = {
      id: announcements.length + 1,
      title: newAnnouncementTitle,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      content: newAnnouncementContent
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setShowAddContent(false);
  };

  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">
        {userRole === 'student' ? 'Student Dashboard' : 'Teacher Dashboard'}
      </h2>
      
      {userRole === 'student' && (
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Overall Progress</h3>
            <div className="flex items-end">
              <span className="text-3xl font-bold">{progressPercentage}%</span>
              <div className="ml-auto">
                <div className="w-16 h-16 rounded-full border-4 border-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">{completedLessons}/{totalLessons}</span>
                </div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Current Module</h3>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">{modules[0].title}</span>
            </div>
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => {
                setActivePage('modules');
                setActiveModule(1);
                setActiveLesson(3);
                if (!expandedModules.includes(1)) toggleModule(1);
              }}
            >
              <Play size={16} className="mr-2" />
              Continue Learning
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Achievements</h3>
            <div className="flex space-x-2 mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Award size={24} className="text-yellow-500" />
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={24} className="text-green-500" />
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Award size={24} className="text-gray-300" />
              </div>
            </div>
            <button className="text-blue-600 text-sm">View all achievements</button>
          </div>
        </div>
      )}

      {userRole === 'teacher' && (
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Students Enrolled</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">{students.length}</span>
              <span className="ml-2 text-green-500 text-sm">+2 this week</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Average Completion</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">34%</span>
              <div className="ml-auto w-12 h-12 rounded-full border-4 border-blue-100 flex items-center justify-center">
                <BarChart2 size={20} className="text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Pending Assignments</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">7</span>
              <button className="ml-auto text-blue-600 text-sm">
                Grade now
              </button>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-gray-500 font-medium mb-2">Discussion Activity</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">12</span>
              <span className="ml-2 text-sm text-gray-500">new posts</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        {userRole === 'student' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-4">Upcoming Deadlines</h3>
            <ul className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <li key={index} className="flex items-start">
                  <Clock size={18} className="text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{deadline.title}</p>
                    <p className="text-sm text-gray-500">{deadline.module} • Due {deadline.due}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {userRole === 'teacher' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Recent Student Activity</h3>
              <button className="text-blue-600 text-sm">View All</button>
            </div>
            <ul className="space-y-3">
              {students.slice(0, 3).map(student => (
                <li key={student.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{student.progress}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Announcements</h3>
            {userRole === 'teacher' && (
              <button 
                className="text-blue-600 flex items-center text-sm"
                onClick={() => setShowAddContent(!showAddContent)}
              >
                <PlusCircle size={14} className="mr-1" />
                Add New
              </button>
            )}
          </div>
          
          {showAddContent && userRole === 'teacher' && (
            <div className="mb-4 bg-blue-50 p-3 rounded-md">
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Announcement Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded"
                  placeholder="Enter title"
                  value={newAnnouncementTitle}
                  onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea 
                  className="w-full p-2 border rounded"
                  placeholder="Enter announcement content"
                  rows={3}
                  value={newAnnouncementContent}
                  onChange={(e) => setNewAnnouncementContent(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-3 py-1 text-sm rounded bg-gray-200"
                  onClick={() => setShowAddContent(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
                  onClick={handleAddAnnouncement}
                >
                  Post
                </button>
              </div>
            </div>
          )}
          
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li key={announcement.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-1">
                  <h4 className="font-medium">{announcement.title}</h4>
                  <span className="text-sm text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-sm text-gray-600">{announcement.content}</p>
                {userRole === 'teacher' && (
                  <div className="flex space-x-2 mt-2">
                    <button className="text-blue-600 text-xs flex items-center">
                      <Edit size={12} className="mr-1" />
                      Edit
                    </button>
                    <button className="text-red-600 text-xs flex items-center">
                      <Trash size={12} className="mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
