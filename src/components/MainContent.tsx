import { StudentsTable } from './StudentsTable';
import { AddStudentDialog } from './AddStudentDialog';
import { YearSelect } from './YearSelect';
import { ClassSelect } from './ClassSelect';

export function MainContent() {
  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <YearSelect />
          <ClassSelect />
        </div>
        <AddStudentDialog />
      </div>
      <StudentsTable />
    </main>
  );
}