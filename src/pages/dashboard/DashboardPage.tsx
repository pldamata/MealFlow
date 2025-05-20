import React from 'react';
import { Utensils, Users, Clock, PieChart, ArrowRight, CreditCard, ShoppingCart, ChefHat } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const DashboardPage: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{today}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            Export Report
          </Button>
          <Button size="sm">
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-emerald-100 p-3 dark:bg-emerald-900/20">
              <Utensils className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Meals</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">384</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">+4.6%</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">from yesterday</span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-blue-100 p-3 dark:bg-blue-900/20">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Consumers</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">295</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">+2.3%</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">from last week</span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-purple-100 p-3 dark:bg-purple-900/20">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Serving Time</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">5.2m</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-red-600 dark:text-red-500">+0.8m</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">from average</span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white p-5 shadow transition-all hover:shadow-md dark:bg-gray-800">
          <div className="flex items-center">
            <div className="rounded-md bg-amber-100 p-3 dark:bg-amber-900/20">
              <PieChart className="h-6 w-6 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Satisfaction Rate</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">92%</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600 dark:text-green-500">+1.2%</span>
              <span className="ml-1.5 text-xs text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Next Period: Lunch</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reserved</p>
                <p className="text-xl font-medium text-gray-900 dark:text-white">187 / 250</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/20">
                <CreditCard className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">75% Capacity</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-500">63 slots remaining</span>
            </div>
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />} fullWidth>
              View Meal Plan
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Today's Menu</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Main Courses</p>
                <p className="text-xl font-medium text-gray-900 dark:text-white">4 Options</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                <Utensils className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                Beef Stroganoff with Rice
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                Grilled Salmon with Vegetables
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                Vegetable Lasagna
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                Turkey and Quinoa Salad
              </li>
            </ul>
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />} fullWidth>
              View Full Menu
            </Button>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-5 shadow dark:bg-gray-800">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Kitchen Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Production</p>
                <p className="text-xl font-medium text-gray-900 dark:text-white">On Schedule</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                <ChefHat className="h-6 w-6 text-purple-600 dark:text-purple-500" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Meat Options</span>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">100% Ready</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Fish Options</span>
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">100% Ready</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Vegetarian Options</span>
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-500">80% Ready</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div className="h-full rounded-full bg-yellow-500" style={{ width: '80%' }}></div>
              </div>
            </div>
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />} fullWidth>
              View Monitor
            </Button>
          </div>
        </div>
      </div>

      {/* Activity & Alerts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-blue-100 p-2 dark:bg-blue-900/20">
                <Users className="h-4 w-4 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">12 new consumers registered</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">20 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-emerald-100 p-2 dark:bg-emerald-900/20">
                <Utensils className="h-4 w-4 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Menu for next week published</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-amber-100 p-2 dark:bg-amber-900/20">
                <ShoppingCart className="h-4 w-4 text-amber-600 dark:text-amber-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Inventory alert: Low stock on 3 items</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-purple-100 p-2 dark:bg-purple-900/20">
                <PieChart className="h-4 w-4 text-purple-600 dark:text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Monthly report generated</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alerts & Notifications */}
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Alerts & Notifications</h2>
            <Button variant="ghost" size="sm">Settings</Button>
          </div>
          <div className="space-y-4">
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Capacity exceeded for Lunch period</h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>Current reservations: 253/250. Please adjust capacity or contact administrator.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">High no-show rate detected</h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                    <p>No-show rate has increased to 12% this week. Consider implementing reservation reminders.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">System maintenance scheduled</h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    <p>System will be under maintenance on Sunday, June 20, from 2:00 AM to 4:00 AM.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};