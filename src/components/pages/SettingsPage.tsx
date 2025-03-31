
import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Mail, 
  HelpCircle,
  Key,
  Check,
  X
} from 'lucide-react';
import { UserRole } from '@/types/courseTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface SettingsPageProps {
  userRole: UserRole;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userRole }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('account');
  
  const handlePasswordChange = () => {
    toast({
      title: "Password Change",
      description: "Password change functionality will be implemented soon.",
    });
  };

  const handleEnable2FA = () => {
    toast({
      title: "Two-Factor Authentication",
      description: "2FA will be implemented soon.",
    });
  };

  const handleDeactivate = () => {
    toast({
      title: "Deactivate Account",
      description: "Are you sure you want to deactivate your account?",
      variant: "destructive",
    });
  };

  const handleConnectAccount = (service: string) => {
    toast({
      title: `Connect ${service}`,
      description: `Connecting to ${service}...`,
    });
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been successfully saved.",
    });
  };

  return (
    <div className="ml-64 p-8">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings Menu</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 px-2">
                <Button 
                  variant={activeTab === 'account' ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('account')}
                >
                  <User size={16} className="mr-2" />
                  Account
                </Button>
                <Button 
                  variant={activeTab === 'notifications' ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell size={16} className="mr-2" />
                  Notifications
                </Button>
                <Button 
                  variant={activeTab === 'privacy' ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('privacy')}
                >
                  <Lock size={16} className="mr-2" />
                  Privacy & Security
                </Button>
                <Button 
                  variant={activeTab === 'email' ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('email')}
                >
                  <Mail size={16} className="mr-2" />
                  Email Preferences
                </Button>
                <Button 
                  variant={activeTab === 'help' ? "secondary" : "ghost"} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('help')}
                >
                  <HelpCircle size={16} className="mr-2" />
                  Help & Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-2">
          {activeTab === 'account' && (
            <>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <div className="flex">
                      <Input 
                        type="email" 
                        className="rounded-r-none"
                        value={userRole === 'student' ? 'alex.j@example.com' : 'prof.davis@example.com'}
                        readOnly
                      />
                      <Button className="rounded-l-none">
                        Change
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Password</label>
                    <Button 
                      variant="outline" 
                      className="text-blue-600 flex items-center"
                      onClick={handlePasswordChange}
                    >
                      <Key size={16} className="mr-1" />
                      Change Password
                    </Button>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Two-Factor Authentication</label>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Add an extra layer of security to your account</p>
                        <p className="text-sm text-red-600">Not enabled</p>
                      </div>
                      <Button onClick={handleEnable2FA}>
                        Enable
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div>
                    <h4 className="text-sm font-medium text-red-600 mb-2">Danger Zone</h4>
                    <Button 
                      variant="outline" 
                      className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                      onClick={handleDeactivate}
                    >
                      Deactivate Account
                    </Button>
                  </div>
                  <Button onClick={handleSaveChanges}>Save Changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Connected Accounts</CardTitle>
                  <CardDescription>Manage your connected services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">G</div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-gray-500">Calendar and Drive integration</p>
                        </div>
                      </div>
                      <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                        <Check size={14} className="mr-1" />
                        Connected
                      </div>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">M</div>
                        <div>
                          <p className="font-medium">Microsoft</p>
                          <p className="text-sm text-gray-500">OneDrive and Office integration</p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleConnectAccount('Microsoft')}
                      >
                        Connect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">S</div>
                        <div>
                          <p className="font-medium">Slack</p>
                          <p className="text-sm text-gray-500">Messaging and notifications</p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => handleConnectAccount('Slack')}
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive email updates about your course</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Assignment Reminders</p>
                      <p className="text-sm text-gray-500">Get notified about upcoming assignments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Discussion Replies</p>
                      <p className="text-sm text-gray-500">Get notified when someone replies to your posts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Announcements</p>
                      <p className="text-sm text-gray-500">Receive notifications about course announcements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Profile Visibility</p>
                      <p className="text-sm text-gray-500">Allow others in the course to see your profile</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Learning Progress</p>
                      <p className="text-sm text-gray-500">Share your learning progress with instructors</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Collection</p>
                      <p className="text-sm text-gray-500">Allow us to collect usage data to improve the platform</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'email' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email Preferences</CardTitle>
                <CardDescription>Manage what emails you receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-gray-500">Receive a weekly summary of your course activity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-gray-500">Receive information about other courses and updates</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Newsletter</p>
                      <p className="text-sm text-gray-500">Receive our monthly newsletter</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === 'help' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Help & Support</CardTitle>
                <CardDescription>Get help with our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Frequently Asked Questions</h4>
                    <p className="text-sm text-gray-500 mb-3">Find answers to common questions</p>
                    <Button variant="outline">Browse FAQ</Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Contact Support</h4>
                    <p className="text-sm text-gray-500 mb-3">Get help from our support team</p>
                    <Button variant="outline">Contact Support</Button>
                  </div>
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">Documentation</h4>
                    <p className="text-sm text-gray-500 mb-3">Browse our documentation</p>
                    <Button variant="outline">View Documentation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
