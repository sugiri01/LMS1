
import React from 'react';
import { ChevronLeft, PlusCircle } from 'lucide-react';
import { DiscussionForum, Topic, UserRole } from '@/types/courseTypes';

interface DiscussionsPageProps {
  discussionForums: DiscussionForum[];
  userRole: UserRole;
  activeDiscussionId: number | null;
  activeTopic: Topic | null;
  setActiveDiscussionId: (id: number | null) => void;
  setActiveTopic: (topic: Topic | null) => void;
}

const DiscussionsPage: React.FC<DiscussionsPageProps> = ({
  discussionForums,
  userRole,
  activeDiscussionId,
  activeTopic,
  setActiveDiscussionId,
  setActiveTopic
}) => {
  if (activeDiscussionId !== null && activeTopic === null) {
    // Display topics within a forum
    const forum = discussionForums.find(f => f.id === activeDiscussionId);
    
    if (!forum) return null;
    
    return (
      <div className="ml-64 p-8">
        <div className="mb-6 flex items-center">
          <button 
            className="mr-2 text-blue-600"
            onClick={() => setActiveDiscussionId(null)}
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-2xl font-bold">{forum.title}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Topics</h3>
            <button className="text-blue-600 flex items-center">
              <PlusCircle size={16} className="mr-1" />
              New Topic
            </button>
          </div>
          
          <div className="space-y-4">
            {forum.topics.map(topic => (
              <div 
                key={topic.id} 
                className="border-b pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 p-3 rounded cursor-pointer"
                onClick={() => setActiveTopic(topic)}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium text-blue-600">{topic.title}</h4>
                  <div className="text-sm text-gray-500">
                    {topic.replies} {topic.replies === 1 ? 'reply' : 'replies'}
                  </div>
                </div>
                <div className="flex text-sm text-gray-500 mt-1">
                  <span>Started by {topic.author}</span>
                  <span className="mx-2">•</span>
                  <span>{topic.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (activeDiscussionId !== null && activeTopic !== null) {
    // Display a specific topic
    return (
      <div className="ml-64 p-8">
        <div className="mb-6 flex items-center">
          <button 
            className="mr-2 text-blue-600"
            onClick={() => setActiveTopic(null)}
          >
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-bold">{activeTopic.title}</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="border-b pb-4">
            <div className="flex justify-between mb-2">
              <div className="font-medium">{activeTopic.author}</div>
              <div className="text-sm text-gray-500">{activeTopic.date}</div>
            </div>
            <p className="text-gray-700">{activeTopic.content}</p>
          </div>
          
          <div className="mt-6 space-y-6">
            {activeTopic.responses.map(response => (
              <div key={response.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">
                    {response.author}
                    {response.author === "Prof. Davis" && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Instructor</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{response.date}</div>
                </div>
                <p className="text-gray-700">{response.content}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="font-medium mb-3">Post a Reply</h4>
            <textarea 
              className="w-full p-3 border rounded-md"
              rows={4}
              placeholder="Type your reply here..."
            ></textarea>
            <div className="flex justify-end mt-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Post Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // Display the list of discussion forums
    return (
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Discussion Forums</h2>
          {userRole === 'teacher' && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
              <PlusCircle size={16} className="mr-2" />
              Create Forum
            </button>
          )}
        </div>
        
        <div className="grid gap-4">
          {discussionForums.map(forum => (
            <div 
              key={forum.id} 
              className="bg-white rounded-lg shadow-sm border p-6 hover:border-blue-300 cursor-pointer"
              onClick={() => setActiveDiscussionId(forum.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-blue-600">{forum.title}</h3>
                <div className="text-sm text-gray-500">
                  {forum.topics.reduce((sum, topic) => sum + topic.replies, 0)} posts
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {forum.module}
              </p>
              <div className="mt-4 text-sm text-gray-500">
                {forum.topics.length} {forum.topics.length === 1 ? 'topic' : 'topics'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default DiscussionsPage;
