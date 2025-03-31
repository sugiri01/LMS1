
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description = `${title} content would appear here.` 
}) => {
  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>This page is under construction</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{description}</p>
          <div className="mt-4 p-6 bg-gray-50 rounded-md flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                  <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
              </div>
              <p className="text-gray-500">Content for this page is coming soon.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
