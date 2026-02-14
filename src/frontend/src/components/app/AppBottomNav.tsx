import { Link, useRouterState } from '@tanstack/react-router';
import { Settings, Languages, User, Bell, BarChart3, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppBottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/languages', label: 'Languages', icon: Languages },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/notifications', label: 'Notifications', icon: Bell },
    { path: '/stats', label: 'Statistics', icon: BarChart3 },
    { path: '/averages', label: 'Averages', icon: TrendingUp },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
      <div className="grid grid-cols-6 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-md text-xs font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] leading-tight text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
