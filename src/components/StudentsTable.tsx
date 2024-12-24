import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchStudents } from '@/store/studentsSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export function StudentsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: students, status } = useSelector((state: RootState) => state.students);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
            <TableHead>Cohort</TableHead>
            <TableHead>Courses</TableHead>
            <TableHead>Date Joined</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.cohort}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {student.courses?.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-1 rounded bg-secondary px-2 py-1 text-xs"
                    >
                      <BookOpen className="h-3 w-3" />
                      {course.name}
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell>{new Date(student.date_joined).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(student.last_login).toLocaleDateString()}</TableCell>
              <TableCell>
                <div
                  className={`h-2 w-2 rounded-full ${
                    student.status ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}