// Core types for the MealFlow application

// Authentication types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  tenant?: string;
  preferences: UserPreferences;
}

export enum UserRole {
  Admin = 'admin',
  Supervisor = 'supervisor',
  Manager = 'manager',
  Employee = 'employee',
  Specialist = 'specialist',
  Auditor = 'auditor',
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  navStyle: 'icons' | 'text' | 'both';
  navDensity: 'compact' | 'comfortable' | 'spacious';
  favoriteModules: string[];
}

// Tenant types
export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  logo: string;
  primaryColor?: string;
  secondaryColor?: string;
}

// Module system types
export interface Module {
  id: string;
  name: string;
  icon: string;
  path: string;
  submodules: Submodule[];
  licensed: boolean;
  order: number;
}

export interface Submodule {
  id: string;
  name: string;
  path: string;
  licensed: boolean;
  order: number;
}

// Restaurant/Refeitório types
export interface DiningHall {
  id: string;
  name: string;
  location: string;
  clientId: string;
  capacity: number;
  mealPeriods: MealPeriod[];
}

export interface MealPeriod {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  capacity: number;
  reserveDeadline: number; // hours before
  maxReservationTime: string; // time when reservations close
  extraReservationTime?: string; // time for late reservations
  extraCost?: number; // additional cost for late reservations
}

// Reservation system types
export interface Meal {
  id: string;
  name: string;
  description: string;
  type: MealType;
  category: MealCategory;
  nutritionalInfo: NutritionalInfo;
  allergens: string[];
  image?: string;
  nutriscore: string; // A to E
}

export enum MealType {
  Meat = 'meat',
  Fish = 'fish',
  Vegetarian = 'vegetarian',
  Diet = 'diet',
}

export enum MealCategory {
  Starter = 'starter',
  MainCourse = 'main',
  Dessert = 'dessert',
  Beverage = 'beverage',
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
}

export interface MealPlan {
  id: string;
  date: string;
  diningHallId: string;
  periodId: string;
  meals: MealOffer[];
}

export interface MealOffer {
  mealId: string;
  category: MealCategory;
  quantity: number;
  reserved: number;
}

export interface Reservation {
  id: string;
  consumerId: string;
  mealPlanId: string;
  mealId: string;
  date: string;
  periodId: string;
  status: ReservationStatus;
  createdAt: string;
  checkedIn?: string;
  rating?: number;
  feedback?: string;
}

export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  CheckedIn = 'checked-in',
  Cancelled = 'cancelled',
  NoShow = 'no-show',
}

// Consumer types
export interface Consumer {
  id: string;
  code: string; // consumer code for authentication
  name: string;
  email?: string;
  departmentId: string;
  clientId: string;
  allergies: string[];
  preferences: string[];
  micrositePassword?: string;
  firstAccess: boolean;
  balance: number;
  cardNumber?: string;
}