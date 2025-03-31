
import React from 'react';
import { Search, PlusCircle, Download, Trash } from 'lucide-react';
import { Student } from '@/types/courseTypes';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface StudentsPageProps {
  students: Student[];
}

const StudentsPage: React.FC<StudentsPageProps> = ({ students }) => {
  const { toast } = useToast();

  const handleAddStudent = () => {
    toast({
      title: "Add Student",
      description: "This feature is coming soon.",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Exporting student data...",
    });
  };

  const handleViewDetails = (student: Student) => {
    toast({
      title: "View Details",
      description: `Viewing details for ${student.name}`,
    });
  };

  const handleMessage = (student: Student) => {
    toast({
      title: "Message",
      description: `Sending message to ${student.name}`,
    });
  };

  const handleDelete = (student: Student) => {
    toast({
      title: "Delete Student",
      description: `Are you sure you want to delete ${student.name}?`,
      variant: "destructive",
    });
  };

  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">Student Management</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        </div>
        <div className="flex space-x-2">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            onClick={handleAddStudent}
          >
            <PlusCircle size={16} className="mr-2" />
            Add Student
          </button>
          <button 
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center"
            onClick={handleExport}
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map(student => (
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell>
                  <div className="font-medium text-gray-900">{student.name}</div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{student.progress}%</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{student.lastActive}</div>
                </TableCell>
                <TableCell className="text-right">
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => handleViewDetails(student)}
                  >
                    View Details
                  </button>
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    onClick={() => handleMessage(student)}
                  >
                    Message
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(student)}
                  >
                    <Trash size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentsPage;
