/*
  # Create students and courses tables

  1. New Tables
    - `students`
      - `id` (uuid, primary key)
      - `name` (text)
      - `cohort` (text)
      - `date_joined` (timestamp)
      - `last_login` (timestamp)
      - `status` (boolean)
    - `courses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
    - `student_courses`
      - Junction table for many-to-many relationship between students and courses
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  cohort text NOT NULL,
  date_joined timestamptz DEFAULT now(),
  last_login timestamptz DEFAULT now(),
  status boolean DEFAULT true
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL
);

-- Create junction table for student-course relationship
CREATE TABLE IF NOT EXISTS student_courses (
  student_id uuid REFERENCES students(id),
  course_id uuid REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);

-- Enable RLS
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_courses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read access" ON students
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON courses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read access" ON student_courses
  FOR SELECT TO authenticated USING (true);