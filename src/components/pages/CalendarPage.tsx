
import React from 'react';
import { ChevronLeft, ChevronRight, PlusCircle, Edit, Trash } from 'lucide-react';
import { CalendarEvent, UserRole } from '@/types/courseTypes';

interface CalendarPageProps {
  calendarEvents: CalendarEvent[];
  userRole: UserRole;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ calendarEvents, userRole }) => {
  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">Course Calendar</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button className="bg-gray-200 rounded-md p-2">
            <ChevronLeft size={18} />
          </button>
          <h3 className="text-lg font-medium">April 2025</h3>
          <button className="bg-gray-200 rounded-md p-2">
            <ChevronRight size={18} />
          </button>
        </div>
        {userRole === 'teacher' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <PlusCircle size={16} className="mr-2" />
            Add Event
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-7 gap-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500">{day}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => i + 1).map(date => (
              <div 
                key={date} 
                className={`p-2 text-center rounded-md ${
                  date === 5 ? 'bg-blue-100 text-blue-800' : 
                  date === 1 || date === 2 || date === 8 || date === 10 ? 'bg-orange-100 text-orange-800' : 
                  ''
                }`}
              >
                {date}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
          <ul className="space-y-4">
            {calendarEvents.map(event => (
              <li key={event.id} className="flex items-start border-b pb-4 last:border-b-0 last:pb-0">
                <div className={`
                  p-2 rounded-md mr-3 flex-shrink-0
                  ${event.type === 'webinar' ? 'bg-blue-100 text-blue-800' : 
                    event.type === 'deadline' ? 'bg-red-100 text-red-800' :
                    event.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }
                `}>
                  {event.date.split(' ')[0].split(',')[0]}
                </div>
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-500">{event.date} • {event.time}</p>
                  <p className="text-sm text-gray-500 capitalize">{event.type}</p>
                </div>
                {userRole === 'teacher' && (
                  <div className="ml-auto flex items-center space-x-2">
                    <button className="text-blue-600">
                      <Edit size={14} />
                    </button>
                    <button className="text-red-600">
                      <Trash size={14} />
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

export default CalendarPage;
