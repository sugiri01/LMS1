
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const NotFound: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Button asChild variant="outline">
          <Link to={user ? '/' : '/login'}>
            {user ? 'Go to Dashboard' : 'Go to Login'}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
