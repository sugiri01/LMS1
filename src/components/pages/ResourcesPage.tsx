
import React from 'react';
import { FileText, Link, Play, Edit, Trash, PlusCircle } from 'lucide-react';
import { ResourceCategoryItem, ResourceCategoryType, UserRole } from '@/types/courseTypes';

interface ResourcesPageProps {
  resources: ResourceCategoryItem[];
  userRole: UserRole;
  activeResourceCategory: ResourceCategoryType;
  setActiveResourceCategory: (category: ResourceCategoryType) => void;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({
  resources,
  userRole,
  activeResourceCategory,
  setActiveResourceCategory
}) => {
  let filteredResources = resources;
  if (activeResourceCategory !== 'all') {
    filteredResources = resources.filter(r => r.category === activeResourceCategory);
  }

  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Learning Resources</h2>
        {userRole === 'teacher' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <PlusCircle size={16} className="mr-2" />
            Add Resource
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <div className="border-b flex">
          <button 
            className={`px-4 py-2 ${activeResourceCategory === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveResourceCategory('all')}
          >
            All Resources
          </button>
          {resources.map(category => (
            <button 
              key={category.category}
              className={`px-4 py-2 ${activeResourceCategory === category.category ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveResourceCategory(category.category as ResourceCategoryType)}
            >
              {category.category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        {filteredResources.map(category => (
          <div key={category.category} className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium mb-4">{category.category}</h3>
            <ul className="space-y-3">
              {category.items.map(item => (
                <li key={item.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="flex items-start">
                    {item.type === 'pdf' && <FileText size={18} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />}
                    {item.type === 'link' && <Link size={18} className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />}
                    {item.type === 'video' && <Play size={18} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />}
                    <div>
                      <a href={item.url} className="font-medium text-blue-600 hover:underline">{item.title}</a>
                      {item.duration && <span className="text-sm text-gray-500 ml-2">{item.duration}</span>}
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                  {userRole === 'teacher' && (
                    <div className="flex space-x-3 mt-2">
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
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
