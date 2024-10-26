import { Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileSettings } from './_components/profile-settings';
import { SiteSettings } from './_components/site-settings';
import { ThemeSettings } from './_components/theme-settings';

export const metadata: Metadata = {
  title: 'Settings - Blog Management',
  description: 'Manage your blog settings',
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="site">Site</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <ProfileSettings />
        </TabsContent>
        <TabsContent value="site" className="space-y-4">
          <SiteSettings />
        </TabsContent>
        <TabsContent value="theme" className="space-y-4">
          <ThemeSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}