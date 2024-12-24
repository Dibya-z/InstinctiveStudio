/*
  # Add RLS policies for students table

  1. Security Changes
    - Add policy for authenticated users to insert data into students table
    - Add policy for authenticated users to read all students data
    - Add policy for authenticated users to update students data
    - Add policy for authenticated users to delete students data

  2. Notes
    - All authenticated users can perform CRUD operations on students
    - Policies are scoped to authenticated users only
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Allow authenticated read access" ON students;

-- Create new policies
CREATE POLICY "Enable read access for authenticated users" ON students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON students
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Enable update access for authenticated users" ON students
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Enable delete access for authenticated users" ON students
  FOR DELETE TO authenticated USING (true);