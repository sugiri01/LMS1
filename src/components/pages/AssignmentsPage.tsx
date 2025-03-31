
import React from 'react';
import { 
  PlusCircle, 
  Trash 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Assignment, UserRole, ActiveTab } from '@/types/courseTypes';

interface AssignmentsPageProps {
  assignments: Assignment[];
  userRole: UserRole;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const AssignmentsPage: React.FC<AssignmentsPageProps> = ({
  assignments,
  userRole,
  activeTab,
  setActiveTab
}) => {
  // Filter assignments based on the active tab and role
  let filteredAssignments = [...assignments];
  
  if (userRole === 'student') {
    if (activeTab === 'pending') {
      filteredAssignments = assignments.filter(a => a.status === 'Not Started');
    } else if (activeTab === 'submitted') {
      filteredAssignments = assignments.filter(a => a.status === 'Submitted');
    }
  }

  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Assignments</h2>
        {userRole === 'teacher' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
            <PlusCircle size={16} className="mr-2" />
            Create Assignment
          </button>
        )}
      </div>

      {userRole === 'student' && (
        <div className="mb-6">
          <div className="border-b flex">
            <button 
              className={`px-4 py-2 ${activeTab === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'submitted' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('submitted')}
            >
              Submitted
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('all')}
            >
              All Assignments
            </button>
          </div>
        </div>
      )}

      {userRole === 'teacher' && (
        <div className="mb-6">
          <div className="border-b flex">
            <button 
              className={`px-4 py-2 ${activeTab === 'pending' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('pending')}
            >
              To Grade
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'upcoming' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('all')}
            >
              All Assignments
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Assignment</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Due Date</TableHead>
              {userRole === 'student' && (
                <TableHead>Status</TableHead>
              )}
              {userRole === 'teacher' && (
                <TableHead>Submissions</TableHead>
              )}
              <TableHead>Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssignments.map(assignment => (
              <TableRow key={assignment.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-gray-900">{assignment.title}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{assignment.module}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{assignment.due}</div>
                </TableCell>
                {userRole === 'student' && (
                  <TableCell>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${assignment.status === 'Submitted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {assignment.status}
                    </span>
                    {assignment.grade && (
                      <div className="text-sm text-gray-500 mt-1">Grade: {assignment.grade}</div>
                    )}
                  </TableCell>
                )}
                {userRole === 'teacher' && (
                  <TableCell>
                    <div className="text-sm text-gray-500">3/5 students</div>
                  </TableCell>
                )}
                <TableCell>
                  {assignment.points} pts
                </TableCell>
                <TableCell className="text-right">
                  {userRole === 'student' && (
                    assignment.status === 'Submitted' ? (
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View Submission</button>
                    ) : (
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Start Assignment</button>
                    )
                  )}
                  {userRole === 'teacher' && (
                    <>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View Details</button>
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Grade</button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash size={16} />
                      </button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AssignmentsPage;
