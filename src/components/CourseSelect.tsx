import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  name: string;
}

interface CourseSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function CourseSelect({ value, onChange }: CourseSelectProps) {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await supabase
        .from('courses')
        .select('id, name');
      if (data) {
        setCourses(data);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value.length === 0
            ? "Select courses..."
            : `${value.length} course${value.length === 1 ? '' : 's'} selected`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search courses..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses.map((course) => (
              <CommandItem
                key={course.id}
                onSelect={() => {
                  onChange(
                    value.includes(course.id)
                      ? value.filter((id) => id !== course.id)
                      : [...value, course.id]
                  );
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value.includes(course.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                {course.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}