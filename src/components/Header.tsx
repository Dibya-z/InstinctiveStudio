import { Search, HelpCircle, LayoutGrid, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex items-center gap-2">
            <svg className="h-8 w-8" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M13.5,2L13.5,2c0,0.8-0.7,1.5-1.5,1.5S10.5,2.8,10.5,2v0C10.5,0.9,11.4,0,12.5,0h0C13.6,0,14.5,0.9,14.5,2z M20.5,5
                c-0.4-0.4-1-0.4-1.4,0L17,7.1c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l2.1-2.1C20.9,6,20.9,5.4,20.5,5z M3.5,5
                c0.4-0.4,1-0.4,1.4,0L7,7.1c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L3.5,6.4C3.1,6,3.1,5.4,3.5,5z M12,6
                c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6S8.7,6,12,6z"
              />
            </svg>
            <span className="text-2xl font-bold">Quyl.</span>
          </div>
          <div className="flex-1 relative max-w-xl">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your course"
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <HelpCircle className="h-6 w-6" />
          <LayoutGrid className="h-6 w-6" />
          <div className="relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              4
            </span>
          </div>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&dpr=2&q=80" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}