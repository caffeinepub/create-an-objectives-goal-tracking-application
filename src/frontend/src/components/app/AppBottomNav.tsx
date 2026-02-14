import { Link, useRouterState } from '@tanstack/react-router';
import { Settings, User, BarChart3, TrendingUp, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppBottomNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/stats', label: 'Statistics', icon: BarChart3 },
    { path: '/averages', label: 'Averages', icon: TrendingUp },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border shadow-lg">
      <div className="grid grid-cols-5 gap-0.5 px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-1 py-1.5 rounded-md text-xs font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[9px] leading-tight text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
