
import React, { useState, useEffect } from 'react';
import { 
  CalendarEvent, 
  Assignment, 
  Module, 
  Student, 
  DiscussionForum, 
  ResourceCategoryItem,
  ActivePage,
  UserRole,
  ActiveTab,
  ResourceCategoryType
} from '@/types/courseTypes';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import PlaceholderPage from '@/components/PlaceholderPage';
import ModulesList from '@/components/ModulesList';
import LessonContent from '@/components/LessonContent';
import StudentsPage from '@/components/pages/StudentsPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';
import AssignmentsPage from '@/components/pages/AssignmentsPage';
import CalendarPage from '@/components/pages/CalendarPage';
import DiscussionsPage from '@/components/pages/DiscussionsPage';
import ProfilePage from '@/components/pages/ProfilePage';
import ResourcesPage from '@/components/pages/ResourcesPage';
import SettingsPage from '@/components/pages/SettingsPage';
import { useAuth } from '@/contexts/AuthContext';
import { AlertTriangle, ChevronLeft, ChevronRight, Download, Edit, FileText, Link, Lock, Mail, Play, PlusCircle, Search, Trash } from 'lucide-react';

const Index: React.FC = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [activeResourceCategory, setActiveResourceCategory] = useState<ResourceCategoryType>('all');
  const [activeDiscussionId, setActiveDiscussionId] = useState<number | null>(null);
  const [activeTopic, setActiveTopic] = useState<any | null>(null);
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [activeLesson, setActiveLesson] = useState<number>(0);

  // Update userRole when auth user changes
  useEffect(() => {
    if (user) {
      setUserRole(user.role);
    }
  }, [user]);

  // Sample modules data
  const modules: Module[] = [
    {
      id: 1,
      title: 'Introduction to Python',
      description: 'Learn the basics of Python programming.',
      lessons: [
        { id: 101, title: 'Setting up your environment', content: 'Instructions for setting up Python.', type: 'text', duration: '15 min', completed: false },
        { id: 102, title: 'Basic syntax', content: 'Overview of Python syntax.', type: 'video', duration: '20 min', completed: false },
      ],
      total: 10,
      completed: 7,
      weeks: '1-2'
    },
    {
      id: 2,
      title: 'Data Structures',
      description: 'Explore different data structures in Python.',
      lessons: [
        { id: 201, title: 'Lists', content: 'Working with lists in Python.', type: 'text', duration: '30 min', completed: false },
        { id: 202, title: 'Dictionaries', content: 'Using dictionaries in Python.', type: 'quiz', duration: '25 min', completed: false },
      ],
      total: 10,
      completed: 3,
      weeks: '3-4'
    },
    {
      id: 3,
      title: 'Web Development with Flask',
      description: 'Build web applications using Flask framework.',
      lessons: [
        { id: 301, title: 'Introduction to Flask', content: 'Setting up Flask and creating routes.', type: 'video', duration: '45 min', completed: false },
        { id: 302, title: 'Templates', content: 'Using templates in Flask.', type: 'text', duration: '30 min', completed: false },
      ],
      total: 10,
      completed: 10,
      weeks: '5-6'
    },
  ];

  // Sample students data
  const students: Student[] = [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      progress: 75,
      lastActive: '2 days ago',
    },
    {
      id: 2,
      name: 'Emily Smith',
      email: 'emily.s@example.com',
      progress: 45,
      lastActive: '5 days ago',
    },
    {
      id: 3,
      name: 'Jordan Lee',
      email: 'jordan.l@example.com',
      progress: 90,
      lastActive: '1 day ago',
    },
  ];

  // Sample assignments data
  const assignments: Assignment[] = [
    {
      id: 1,
      title: 'Python Basics Assignment',
      due: '2025-03-15',
      dueDate: '2025-03-15',
      status: 'graded',
      grade: 'A',
      description: 'Complete the Python basics assignment.',
      moduleId: 1,
      module: 'Introduction to Python',
      points: 100
    },
    {
      id: 2,
      title: 'Data Structures Project',
      due: '2025-04-01',
      dueDate: '2025-04-01',
      status: 'pending',
      grade: null,
      description: 'Work on the data structures project.',
      moduleId: 2,
      module: 'Data Structures',
      points: 150
    },
    {
      id: 3,
      title: 'Flask Web App',
      due: '2025-04-15',
      dueDate: '2025-04-15',
      status: 'submitted',
      grade: null,
      description: 'Build a web application using Flask.',
      moduleId: 3,
      module: 'Web Development with Flask',
      points: 200
    },
  ];

  // Sample discussion forums data
  const discussionForums: DiscussionForum[] = [
    {
      id: 1,
      title: 'Python Basics Discussion',
      module: 'Introduction to Python',
      topics: [
        {
          id: 101,
          title: 'Help with loops',
          author: 'Alex',
          date: '2023-04-01',
          replies: 1,
          content: 'I need help with loops',
          responses: [],
          posts: [
            { id: 1001, author: 'Alex', content: 'I need help with for loops.' },
            { id: 1002, author: 'Emily', content: 'Have you tried using while loops?' },
          ],
        },
        {
          id: 102,
          title: 'Understanding functions',
          author: 'Jordan',
          date: '2023-04-02',
          replies: 1,
          content: 'Functions question',
          responses: [],
          posts: [
            { id: 1003, author: 'Jordan', content: 'Can someone explain functions?' },
            { id: 1004, author: 'Alex', content: 'Functions are reusable blocks of code.' },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Data Structures Discussion',
      module: 'Data Structures',
      topics: [
        {
          id: 201,
          title: 'Working with lists',
          author: 'Emily',
          date: '2023-04-03',
          replies: 1,
          content: 'Lists question',
          responses: [],
          posts: [
            { id: 2001, author: 'Emily', content: 'What are the best practices for lists?' },
            { id: 2002, author: 'Jordan', content: 'Use list comprehensions for efficiency.' },
          ],
        },
        {
          id: 202,
          title: 'Dictionaries vs sets',
          author: 'Alex',
          date: '2023-04-04',
          replies: 1,
          content: 'Dictionaries question',
          responses: [],
          posts: [
            { id: 2003, author: 'Alex', content: 'When should I use dictionaries vs sets?' },
            { id: 2004, author: 'Emily', content: 'Dictionaries for key-value pairs, sets for unique values.' },
          ],
        },
      ],
    },
  ];

  // Sample resources data
  const resourcesData: ResourceCategoryItem[] = [
    {
      category: 'Documentation',
      items: [
        {
          id: 1,
          title: 'Python Documentation',
          type: 'documentation',
          url: 'https://docs.python.org/3/',
          description: 'Official Python documentation'
        },
        {
          id: 2,
          title: 'Flask Official Website',
          type: 'documentation',
          url: 'https://flask.palletsprojects.com/',
          description: 'Official Flask documentation'
        },
      ]
    },
    {
      category: 'Tutorials',
      items: [
        {
          id: 3,
          title: 'Python Tutorial',
          type: 'tutorial',
          url: 'https://www.tutorialspoint.com/python/index.htm',
          description: 'Comprehensive Python tutorial'
        }
      ]
    }
  ];

  // Sample calendar events
  const calendarEvents: CalendarEvent[] = [
    {
      id: 1,
      title: 'Live Coding Session',
      date: '2025-04-05',
      time: '15:00',
      description: 'Live coding session on advanced Python topics.',
      type: 'webinar'
    },
    {
      id: 2,
      title: 'Office Hours',
      date: '2025-04-02',
      time: '13:00',
      description: 'Office hours for Q&A.',
      type: 'meeting'
    },
    {
      id: 3,
      title: 'Final Project Introduction',
      date: '2025-04-10',
      time: '14:00',
      description: 'Introduction to the final project requirements.',
      type: 'webinar'
    },
  ];

  // Function to toggle module expansion
  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Function to set active module
  const handleSetActiveModule = (moduleId: number) => {
    setActiveModule(moduleId);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        userRole={userRole} 
        setUserRole={setUserRole} 
      />
      
      {/* Render the appropriate page content based on activePage */}
      {activePage === 'dashboard' && (
        <Dashboard 
          userRole={userRole}
          modules={modules}
          assignments={assignments}
          students={students}
          upcomingDeadlines={[]}
          announcements={[]}
          setActivePage={(page) => setActivePage(page)} 
          setActiveModule={handleSetActiveModule}
          setActiveLesson={setActiveLesson}
          toggleModule={toggleModule}
          expandedModules={expandedModules}
          setAnnouncements={() => {}}
        />
      )}
      
      {activePage === 'modules' && activeModule === null && (
        <ModulesList 
          modules={modules}
          expandedModules={expandedModules}
          activeModule={activeModule}
          activeLesson={activeLesson}
          userRole={userRole}
          toggleModule={toggleModule}
          setActiveModule={handleSetActiveModule}
          setActiveLesson={setActiveLesson}
        />
      )}
      
      {activePage === 'modules' && activeModule !== null && (
        <LessonContent 
          modules={modules}
          activeModule={activeModule}
          activeLesson={activeLesson}
          userRole={userRole}
        />
      )}
      
      {activePage === 'assignments' && (
        <AssignmentsPage 
          assignments={assignments}
          userRole={userRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      
      {activePage === 'discussions' && (
        <DiscussionsPage 
          discussionForums={discussionForums}
          activeDiscussionId={activeDiscussionId}
          setActiveDiscussionId={setActiveDiscussionId}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          userRole={userRole}
        />
      )}
      
      {activePage === 'resources' && (
        <ResourcesPage 
          resources={resourcesData}
          userRole={userRole}
          activeResourceCategory={activeResourceCategory}
          setActiveResourceCategory={setActiveResourceCategory}
        />
      )}
      
      {activePage === 'students' && userRole === 'teacher' && (
        <StudentsPage students={students} />
      )}
      
      {activePage === 'analytics' && userRole === 'teacher' && (
        <AnalyticsPage 
          modules={modules}
          students={students}
        />
      )}
      
      {activePage === 'calendar' && (
        <CalendarPage 
          calendarEvents={calendarEvents}
          userRole={userRole}
        />
      )}
      
      {activePage === 'profile' && (
        <ProfilePage 
          modules={modules}
          userRole={userRole}
        />
      )}
      
      {activePage === 'settings' && (
        <SettingsPage userRole={userRole} />
      )}
    </div>
  );
};

export default Index;
