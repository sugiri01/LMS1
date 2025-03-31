export interface Lesson {
  id: number;
  title: string;
  type: "video" | "text" | "quiz";
  duration: string;
  completed: boolean;
  content?: string; // Add content property
}

export interface Module {
  id: number;
  title: string;
  completed: number;
  total: number;
  weeks: string;
  lessons: Lesson[];
  description?: string; // Add description property
}

export interface Deadline {
  title: string;
  due: string;
  module: string;
}

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
}

export interface Assignment {
  id: number;
  title: string;
  moduleId: number;
  module: string;
  due: string;
  dueDate?: string; // Add dueDate property
  status: string;
  points: number;
  description: string;
  submissions?: any[];
  type?: string;
  grade?: string | null;
  feedback?: string;
}

export interface Student {
  id: number;
  name: string;
  progress: number;
  email: string;
  lastActive: string;
}

export interface Response {
  id: number;
  author: string;
  content: string;
  date: string;
}

export interface Topic {
  id: number;
  title: string;
  author: string;
  date: string;
  replies: number;
  content: string;
  responses: Response[];
  posts?: {id: number, author: string, content: string}[]; // Add posts property
}

export interface DiscussionForum {
  id: number;
  title: string;
  module: string;
  topics: Topic[];
}

export interface ResourceItem {
  id: number;
  title: string;
  type: string;
  url: string;
  description: string;
  duration?: string;
}

export interface ResourceCategoryItem {
  category: string;
  items: ResourceItem[];
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: string;
  description?: string;
}

// Add the missing Resource interface
export interface Resource {
  id: number;
  title: string;
  link: string;
  category: string;
}

export type UserRole = 'student' | 'teacher';
export type ActiveTab = 'pending' | 'submitted' | 'graded' | 'upcoming' | 'all';
export type ResourceCategoryType = 'all' | 'Documentation' | 'Cheat Sheets' | 'Practice Exercises' | 'Videos' | 'documentation' | 'tutorials';
export type ActivePage = 'dashboard' | 'modules' | 'assignments' | 'discussions' | 'resources' | 'students' | 'analytics' | 'calendar' | 'profile' | 'settings';
