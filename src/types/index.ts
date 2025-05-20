export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logo: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  tenantId: string;
}

export interface DiningHall {
  id: string;
  name: string;
  clientId: string;
  address: string;
  capacity: number;
}

export interface MealPeriod {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  diningHallId: string;
  maxReservationTime: string;
  extraReservationTime?: string;
  extraCost?: number;
}

export interface MealType {
  id: string;
  name: string;
  description: string;
}

export interface MealCategory {
  id: string;
  name: string;
  description: string;
}

export interface Meal {
  id: string;
  name: string;
  description: string;
  typeId: string;
  categoryId: string;
  nutritionalInfo: string;
  allergens: string[];
  image?: string;
  nutriscore: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface Consumer {
  id: string;
  code: string;
  name: string;
  email?: string;
  departmentId: string;
  clientId: string;
  allergies: string[];
  preferences: string[];
  micrositePassword: string;
  firstAccess: boolean;
}

export interface Reservation {
  id: string;
  consumerId: string;
  mealId: string;
  periodId: string;
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'consumed';
  rating?: number;
  feedback?: string;
}
