
import React from 'react';
import { Play, FileText, Edit, Eye, CheckCircle, Upload, Trash, PlusCircle } from 'lucide-react';
import { Module, UserRole } from '../types/courseTypes';

interface LessonContentProps {
  modules: Module[];
  activeModule: number;
  activeLesson: number;
  userRole: UserRole;
}

const LessonContent: React.FC<LessonContentProps> = ({ 
  modules, 
  activeModule, 
  activeLesson,
  userRole
}) => {
  // Find the current module and lesson
  const currentModule = modules.find(m => m.id === activeModule);
  const currentLesson = currentModule?.lessons.find(l => l.id === activeLesson);

  if (!currentModule || !currentLesson) return null;

  return (
    <div className="ml-64 p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            {currentModule.title} • Lesson {activeLesson} of {currentModule.lessons.length}
          </div>
          <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
        </div>
        
        {userRole === 'teacher' && (
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <Edit size={16} className="mr-2" />
              Edit Lesson
            </button>
            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center">
              <Eye size={16} className="mr-2" />
              Preview as Student
            </button>
          </div>
        )}
        
        {userRole === 'student' && (
          <div>
            <button 
              className={`flex items-center px-4 py-2 rounded-md ${
                currentLesson.completed ? 'bg-green-100 text-green-800' : 'bg-blue-600 text-white'
              }`}
            >
              {currentLesson.completed ? (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  Completed
                </>
              ) : (
                <>
                  <CheckCircle size={16} className="mr-2" />
                  Mark as Complete
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {currentLesson.type === 'video' && (
        <div className="mb-8">
          <div className="bg-gray-800 aspect-video rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play size={48} className="text-white mx-auto mb-2" />
              <p className="text-white">Video Player: {currentLesson.title}</p>
              <p className="text-gray-400">{currentLesson.duration}</p>
            </div>
          </div>
          {userRole === 'teacher' && (
            <div className="mt-4 flex justify-end space-x-2">
              <button className="flex items-center text-blue-600">
                <Upload size={16} className="mr-1" />
                <span>Replace Video</span>
              </button>
              <button className="flex items-center text-red-600">
                <Trash size={16} className="mr-1" />
                <span>Delete Video</span>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 relative">
            <h3 className="text-lg font-medium mb-4">Lesson Overview</h3>
            {userRole === 'teacher' && (
              <button className="absolute top-4 right-4 text-blue-600">
                <Edit size={16} />
              </button>
            )}
            <p className="text-gray-700 mb-4">
              This lesson covers {currentLesson.title} in Python programming. You'll learn the fundamental concepts and practice with real-world examples.
            </p>
            
            <h4 className="font-medium mt-6 mb-2">Learning Objectives:</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Understand the core principles of {currentLesson.title.toLowerCase()}</li>
              <li>Apply these concepts to solve practical problems</li>
              <li>Build a foundation for more advanced programming topics</li>
            </ul>
          </div>

          {activeModule === 1 && activeLesson === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 relative">
              <h3 className="text-lg font-medium mb-4">Interactive Exercise</h3>
              {userRole === 'teacher' && (
                <button className="absolute top-4 right-4 text-blue-600">
                  <Edit size={16} />
                </button>
              )}
              <div className="bg-gray-50 p-4 rounded-md font-mono text-sm mb-4">
                <p className="text-gray-800"># Your First Python Program</p>
                <p className="text-gray-800 mb-2"># Write a program that prints "Hello, World!"</p>
                <div className="bg-white p-3 rounded border min-h-16">
                  <p className="text-blue-600">print("Hello, World!")</p>
                </div>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                Run Code
              </button>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-sm border relative">
            <h3 className="text-lg font-medium mb-4">Assignment</h3>
            {userRole === 'teacher' && (
              <button className="absolute top-4 right-4 text-blue-600">
                <Edit size={16} />
              </button>
            )}
            <p className="text-gray-700 mb-4">
              Based on what you've learned in this lesson, complete the following assignment:
            </p>
            
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 mb-4">
              <h4 className="font-medium text-blue-800 mb-2">Personal Practice Exercise</h4>
              <p className="text-blue-800">
                Create a program that demonstrates your understanding of {currentLesson.title.toLowerCase()}. 
                Submit your code and a brief explanation of what it does.
              </p>
            </div>
            
            {userRole === 'student' && (
              <div className="flex justify-between">
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md">
                  Save Draft
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Submit Assignment
                </button>
              </div>
            )}
            
            {userRole === 'teacher' && (
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Due:</span> Apr 7, 2025
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Points:</span> 20
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6 relative">
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            {userRole === 'teacher' && (
              <button className="absolute top-4 right-4 text-blue-600">
                <Edit size={16} />
              </button>
            )}
            <ul className="space-y-2">
              <li className="flex items-center">
                <FileText size={16} className="mr-2 text-gray-500" />
                <a href="#" className="text-blue-600 hover:underline">Lesson Slides</a>
              </li>
              <li className="flex items-center">
                <FileText size={16} className="mr-2 text-gray-500" />
                <a href="#" className="text-blue-600 hover:underline">Python Cheat Sheet</a>
              </li>
              <li className="flex items-center">
                <FileText size={16} className="mr-2 text-gray-500" />
                <a href="#" className="text-blue-600 hover:underline">Practice Exercises</a>
              </li>
            </ul>
            {userRole === 'teacher' && (
              <button className="text-blue-600 flex items-center text-sm mt-4">
                <PlusCircle size={14} className="mr-1" />
                Add Resource
              </button>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium mb-4">Discussion</h3>
            <p className="text-gray-700 mb-4">
              Join the conversation about this lesson with your classmates.
            </p>
            <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md">
              View Discussion (12 comments)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;
