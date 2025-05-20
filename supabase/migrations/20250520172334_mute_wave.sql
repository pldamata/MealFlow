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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_tenant_id ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_dining_halls_tenant_id ON dining_halls(tenant_id);
CREATE INDEX IF NOT EXISTS idx_meals_tenant_id ON meals(tenant_id);
CREATE INDEX IF NOT EXISTS idx_consumers_tenant_id ON consumers(tenant_id);
CREATE INDEX IF NOT EXISTS idx_meal_periods_dining_hall_id ON meal_periods(dining_hall_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_dining_hall_id ON meal_plans(dining_hall_id);
CREATE INDEX IF NOT EXISTS idx_reservations_consumer_id ON reservations(consumer_id);
CREATE INDEX IF NOT EXISTS idx_reservations_meal_plan_id ON reservations(meal_plan_id);

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables
CREATE TRIGGER update_tenants_updated_at
    BEFORE UPDATE ON tenants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dining_halls_updated_at
    BEFORE UPDATE ON dining_halls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_periods_updated_at
    BEFORE UPDATE ON meal_periods
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meals_updated_at
    BEFORE UPDATE ON meals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_meal_plans_updated_at
    BEFORE UPDATE ON meal_plans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consumers_updated_at
    BEFORE UPDATE ON consumers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();