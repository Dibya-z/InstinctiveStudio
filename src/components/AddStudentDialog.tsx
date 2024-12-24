import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserPlus } from 'lucide-react';
import { addStudent } from '@/store/studentsSlice';
import { supabase } from '@/lib/supabase';
import { CourseSelect } from './CourseSelect';

export function AddStudentDialog() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cohort: '',
    date_joined: new Date().toISOString().split('T')[0],
    last_login: new Date().toISOString().split('T')[0],
    status: true,
    selectedCourses: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('students')
        .insert([{
          name: formData.name,
          cohort: formData.cohort,
          date_joined: formData.date_joined,
          last_login: formData.last_login,
          status: formData.status
        }])
        .select()
        .single();

      if (error) throw error;

      // Add courses for the student
      if (formData.selectedCourses.length > 0) {
        const { error: coursesError } = await supabase
          .from('student_courses')
          .insert(
            formData.selectedCourses.map(courseId => ({
              student_id: data.id,
              course_id: courseId
            }))
          );

        if (coursesError) throw coursesError;
      }

      dispatch(addStudent(data));
      setOpen(false);
      setFormData({
        name: '',
        cohort: '',
        date_joined: new Date().toISOString().split('T')[0],
        last_login: new Date().toISOString().split('T')[0],
        status: true,
        selectedCourses: []
      });
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add new Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cohort">Cohort</Label>
            <Input
              id="cohort"
              value={formData.cohort}
              onChange={(e) => setFormData({ ...formData, cohort: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date_joined">Date Joined</Label>
            <Input
              id="date_joined"
              type="date"
              value={formData.date_joined}
              onChange={(e) => setFormData({ ...formData, date_joined: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_login">Last Login</Label>
            <Input
              id="last_login"
              type="date"
              value={formData.last_login}
              onChange={(e) => setFormData({ ...formData, last_login: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courses">Courses</Label>
            <CourseSelect
              value={formData.selectedCourses}
              onChange={(courses) => setFormData({ ...formData, selectedCourses: courses })}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status}
              onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
            />
            <Label htmlFor="status">Active Status</Label>
          </div>
          <Button type="submit" className="w-full">Add Student</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}