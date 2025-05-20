/*
  # Initial database schema for MealFlow

  1. Tables
    - users
    - tenants
    - dining_halls
    - meal_periods
    - meals
    - meal_plans
    - reservations
    - consumers

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  subdomain text UNIQUE NOT NULL,
  logo_url text,
  primary_color text,
  secondary_color text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL,
  avatar_url text,
  preferences jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Dining halls table
CREATE TABLE IF NOT EXISTS dining_halls (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL,
  location text,
  capacity integer NOT NULL,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Meal periods table
CREATE TABLE IF NOT EXISTS meal_periods (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  dining_hall_id uuid REFERENCES dining_halls(id),
  name text NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  capacity integer NOT NULL,
  reserve_deadline interval NOT NULL,
  max_reservation_time time NOT NULL,
  extra_reservation_time time,
  extra_cost decimal(10,2),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Meals table
CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  name text NOT NULL,
  description text,
  type text NOT NULL,
  category text NOT NULL,
  nutritional_info jsonb,
  allergens text[],
  image_url text,
  nutriscore char(1),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Meal plans table
CREATE TABLE IF NOT EXISTS meal_plans (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  dining_hall_id uuid REFERENCES dining_halls(id),
  period_id uuid REFERENCES meal_periods(id),
  date date NOT NULL,
  meals jsonb NOT NULL,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Consumers table
CREATE TABLE IF NOT EXISTS consumers (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id uuid REFERENCES tenants(id),
  code text UNIQUE NOT NULL,
  name text NOT NULL,
  email text,
  department text,
  allergies text[],
  preferences jsonb,
  microsite_password text,
  first_access boolean DEFAULT true,
  balance decimal(10,2) DEFAULT 0,
  card_number text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  consumer_id uuid REFERENCES consumers(id),
  meal_plan_id uuid REFERENCES meal_plans(id),
  meal_id uuid REFERENCES meals(id),
  period_id uuid REFERENCES meal_periods(id),
  status text NOT NULL,
  checked_in_at timestamptz,
  rating smallint,
  feedback text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE dining_halls ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE consumers ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tenant" ON tenants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.tenant_id = tenants.id
      AND users.id = current_user
    )
  );

CREATE POLICY "Users can view their tenant's users" ON users
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM users WHERE id = current_user
    )
  );

CREATE POLICY "Users can view their tenant's dining halls" ON dining_halls
  FOR SELECT USING (
    tenant_id IN (
      SELECT tenant_id FROM users WHERE id = current_user
    )
  );

-- Add indexes for better performance
CREATE INDEX idx_users_tenant_id ON users(tenant_id);
CREATE INDEX idx_dining_halls_tenant_id ON dining_halls(tenant_id);
CREATE INDEX idx_meals_tenant_id ON meals(tenant_id);
CREATE INDEX idx_consumers_tenant_id ON consumers(tenant_id);
CREATE INDEX idx_meal_periods_dining_hall_id ON meal_periods(dining_hall_id);
CREATE INDEX idx_meal_plans_dining_hall_id ON meal_plans(dining_hall_id);
CREATE INDEX idx_reservations_consumer_id ON reservations(consumer_id);
CREATE INDEX idx_reservations_meal_plan_id ON reservations(meal_plan_id);