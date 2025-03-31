
import React from 'react';
import { ChevronRight, ChevronDown, Play, FileText, CheckCircle, Edit, Trash, PlusCircle } from 'lucide-react';
import { Module, UserRole } from '../types/courseTypes';

interface ModulesListProps {
  modules: Module[];
  expandedModules?: number[];
  activeModule?: number | null;
  activeLesson?: number;
  userRole?: UserRole;
  toggleModule?: (moduleId: number) => void;
  setActiveModule: (moduleId: number) => void;
  setActiveLesson?: (lessonId: number) => void;
}

const ModulesList: React.FC<ModulesListProps> = ({
  modules,
  expandedModules = [],
  activeModule = null,
  activeLesson = 0,
  userRole = 'student',
  toggleModule = () => {},
  setActiveModule,
  setActiveLesson = () => {}
}) => {
  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Course Modules</h2>
        {userRole === 'teacher' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <PlusCircle size={16} className="mr-2" />
            Add New Module
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        {modules.map(module => (
          <div key={module.id} className="border rounded-lg overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex items-center space-x-2">
                {expandedModules.includes(module.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <h3 className="font-medium">{module.title}</h3>
                <span className="text-sm text-gray-500 ml-2">{module.weeks}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  {module.completed}/{module.total} completed
                </span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(module.completed / module.total) * 100}%` }}
                  ></div>
                </div>
                {userRole === 'teacher' && (
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={(e) => e.stopPropagation()}>
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={(e) => e.stopPropagation()}>
                      <Trash size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            {expandedModules.includes(module.id) && (
              <div className="bg-white">
                {module.lessons.map(lesson => (
                  <div 
                    key={lesson.id}
                    className={`flex items-center justify-between p-3 pl-10 border-t ${
                      activeModule === module.id && activeLesson === lesson.id 
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    } cursor-pointer`}
                    onClick={() => {
                      setActiveModule(module.id);
                      setActiveLesson(lesson.id);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      {lesson.type === 'video' ? <Play size={16} /> : <FileText size={16} />}
                      <span>{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                      {lesson.completed && <CheckCircle size={16} className="text-green-500" />}
                      {userRole === 'teacher' && (
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800" onClick={(e) => e.stopPropagation()}>
                            <Edit size={14} />
                          </button>
                          <button className="text-red-600 hover:text-red-800" onClick={(e) => e.stopPropagation()}>
                            <Trash size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {userRole === 'teacher' && (
                  <div className="p-3 pl-10 border-t">
                    <button className="text-blue-600 flex items-center space-x-2">
                      <PlusCircle size={16} />
                      <span>Add New Lesson</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesList;
