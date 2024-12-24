import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabase';

interface Course {
  id: string;
  name: string;
  type: string;
}

interface Student {
  id: string;
  name: string;
  cohort: string;
  date_joined: string;
  last_login: string;
  status: boolean;
  courses?: Course[];
}

interface StudentsState {
  items: Student[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StudentsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const { data, error } = await supabase
    .from('students')
    .select(`
      *,
      student_courses (
        course:courses (
          id,
          name,
          type
        )
      )
    `);

  if (error) throw error;

  // Transform the data to match the expected format
  return data.map((student: any) => ({
    ...student,
    courses: student.student_courses?.map((sc: any) => sc.course) || []
  }));
});

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { addStudent } = studentsSlice.actions;
export default studentsSlice.reducer;