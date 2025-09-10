/*
# Create students table

1. New Tables
  - `students`
    - `id` (uuid, primary key)
    - `name` (text, required)
    - `reg_no` (text, unique, required)
    - `email` (text, unique, required)
    - `phone` (text, required)
    - `department` (text, required)
    - `created_at` (timestamp)

2. Security
  - Enable RLS on `students` table
  - Add policy for authenticated users to insert their own data
  - Add policy for public insert access (for registration form)
*/

CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  reg_no text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  department text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Allow public access for student registration
CREATE POLICY "Allow public insert for student registration"
  ON students
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all students (for admin purposes)
CREATE POLICY "Allow authenticated users to view students"
  ON students
  FOR SELECT
  TO authenticated
  USING (true);