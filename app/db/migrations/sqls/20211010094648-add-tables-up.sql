CREATE TABLE IF NOT EXISTS user_info (
  id VARCHAR PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  salt VARCHAR NOT NULL,
  phone_number VARCHAR,
  payment_pointer VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE school_category AS ENUM (
  'creche',
  'nursery_and_primary',
  'online_school',
  'secondary_school',
  'pre_degree_foundation',
  'tertiary',
  'special_school',
  'business_school'
);

CREATE TABLE IF NOT EXISTS school (
  id VARCHAR PRIMARY KEY,
  name VARCHAR UNIQUE NOT NULL,
  about_us VARCHAR NOT NULL,
  category school_category NOT NULL,
  address VARCHAR NOT NULL,
  state VARCHAR,
  country VARCHAR,
  email VARCHAR NOT NULL,
  phone_number VARCHAR,
  curriculum VARCHAR,
  student_population INT,
  teaching_staff INT,
  non_teaching_staff INT,
  banner VARCHAR NOT NULL,
  website VARCHAR,
  facilities VARCHAR NOT NULL,
  admission_requirements VARCHAR,
  school_fees_range VARCHAR NOT NULL,
  created_by VARCHAR NOT NULL REFERENCES user_info(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS review (
  id VARCHAR PRIMARY KEY,
  subject VARCHAR NOT NULL,
  message VARCHAR NOT NULL,
  reviewer_name VARCHAR NOT NULL,
  reviewer_id VARCHAR NOT NULL,
  rating INT NOT NULL,
  school_id VARCHAR NOT NULL REFERENCES school(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uniq_user_review UNIQUE(reviewer_id, school_id)
);
