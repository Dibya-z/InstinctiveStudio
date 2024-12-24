import { LayoutDashboard, Users, BookOpen, HelpCircle, PieChart, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: Users, label: 'Students', active: true },
  { icon: BookOpen, label: 'Chapter', active: false },
  { icon: HelpCircle, label: 'Help', active: false },
  { icon: PieChart, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
  return (
    <div className="border-r w-60 h-screen">
      <nav className="space-y-2 p-4">
        {items.map((item) => (
          <div
            key={item.label}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              item.active
                ? 'bg-secondary text-foreground'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
}