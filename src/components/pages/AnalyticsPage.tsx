
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Module, Student } from '@/types/courseTypes';

interface AnalyticsPageProps {
  modules: Module[];
  students: Student[];
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ modules, students }) => {
  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">Course Analytics</h2>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-2">Course Completion</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">34%</span>
            <span className="ml-2 text-green-500 text-sm">+5% this month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-2">Average Grade</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">78%</span>
            <span className="ml-2 text-yellow-500 text-sm">-2% this month</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-2">Active Students</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">4/5</span>
            <span className="ml-2 text-gray-500 text-sm">Last 7 days</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-2">Assignment Completion</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">62%</span>
            <span className="ml-2 text-green-500 text-sm">+8% this month</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Module Completion Rates</h3>
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Student Activity</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Activity Chart Placeholder
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Assignment Performance</h3>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Performance Chart Placeholder
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">At-Risk Students</h3>
          <ul className="space-y-3">
            {students.filter(s => s.progress < 30).map(student => (
              <li key={student.id} className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm text-gray-500">Last active: {student.lastActive}</p>
                </div>
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-red-500 mr-2" />
                  <span className="text-red-500">{student.progress}% completion</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
