import { Link, useRouterState } from '@tanstack/react-router';
import { Home, Plus, BarChart3, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppNav() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'My Goals', icon: Home },
    { path: '/create', label: 'New Goal', icon: Plus },
    { path: '/stats', label: 'Stats', icon: BarChart3 },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="hidden lg:inline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
