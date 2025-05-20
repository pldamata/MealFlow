import { Module, UserRole } from '../types';

// Mock modules and submodules
export const mockModules: Module[] = [
  {
    id: 'reserves',
    name: 'Reserves',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    path: '/reserves',
    licensed: true,
    order: 1,
    submodules: [
      {
        id: 'reserve_meals',
        name: 'Meal Management',
        path: '/meals',
        licensed: true,
        order: 1,
      },
      {
        id: 'reserve_plans',
        name: 'Menu Planning',
        path: '/plans',
        licensed: true,
        order: 2,
      },
      {
        id: 'reserve_maps',
        name: 'Reservation Map',
        path: '/maps',
        licensed: true,
        order: 3,
      },
      {
        id: 'reserve_consumers',
        name: 'Consumers',
        path: '/consumers',
        licensed: true,
        order: 4,
      },
      {
        id: 'reserve_microsites',
        name: 'MicroSite',
        path: '/microsites',
        licensed: true,
        order: 5,
      },
      {
        id: 'reserve_kiosks',
        name: 'Kiosks',
        path: '/kiosks',
        licensed: true,
        order: 6,
      },
      {
        id: 'reserve_monitor',
        name: 'Kitchen Monitor',
        path: '/monitor',
        licensed: true,
        order: 7,
      },
    ],
  },
  {
    id: 'stocks',
    name: 'Stock',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12H3"></path><path d="M8 12V8c0-2.2 1.8-4 4-4s4 1.8 4 4v4"></path><path d="M10 12v1c0 1.1.9 2 2 2s2-.9 2-2v-1"></path><path d="M6 20v-2c0-1.1.9-2 2-2s2 .9 2 2v2"></path><path d="M14 20v-2c0-1.1.9-2 2-2s2 .9 2 2v2"></path></svg>',
    path: '/stocks',
    licensed: false,
    order: 2,
    submodules: [
      {
        id: 'stocks_inventory',
        name: 'Inventory',
        path: '/inventory',
        licensed: false,
        order: 1,
      },
      {
        id: 'stocks_suppliers',
        name: 'Suppliers',
        path: '/suppliers',
        licensed: false,
        order: 2,
      },
      {
        id: 'stocks_orders',
        name: 'Purchase Orders',
        path: '/orders',
        licensed: false,
        order: 3,
      },
    ],
  },
  {
    id: 'hr',
    name: 'HR',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line><path d="M17 14h-6"></path><path d="M13 18h-2"></path><path d="M7 14h.01"></path><path d="M7 18h.01"></path></svg>',
    path: '/hr',
    licensed: false,
    order: 3,
    submodules: [
      {
        id: 'hr_schedules',
        name: 'Schedules',
        path: '/schedules',
        licensed: false,
        order: 1,
      },
      {
        id: 'hr_attendance',
        name: 'Attendance',
        path: '/attendance',
        licensed: false,
        order: 2,
      },
    ],
  },
  {
    id: 'haccp',
    name: 'HACCP',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"></path><path d="M14.12 3.88 16 2"></path><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path><path d="M12 20v-9"></path><path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path><path d="M6 13H2"></path><path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path><path d="M22 13h-4"></path><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path></svg>',
    path: '/haccp',
    licensed: false,
    order: 4,
    submodules: [
      {
        id: 'haccp_controls',
        name: 'Control Points',
        path: '/controls',
        licensed: false,
        order: 1,
      },
      {
        id: 'haccp_temperature',
        name: 'Temperature Monitoring',
        path: '/temperature',
        licensed: false,
        order: 2,
      },
      {
        id: 'haccp_audits',
        name: 'Audits',
        path: '/audits',
        licensed: false,
        order: 3,
      },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path><path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"></path><path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12"></path><path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z"></path></svg>',
    path: '/finance',
    licensed: false,
    order: 5,
    submodules: [
      {
        id: 'finance_billing',
        name: 'Billing',
        path: '/billing',
        licensed: false,
        order: 1,
      },
      {
        id: 'finance_reports',
        name: 'Financial Reports',
        path: '/reports',
        licensed: false,
        order: 2,
      },
    ],
  },
];

// Mock permissions by role
export const mockPermissionsByRole = {
  [UserRole.Admin]: {
    modules: mockModules.map(m => m.id),
    operations: ['create', 'read', 'update', 'delete'],
  },
  [UserRole.Supervisor]: {
    modules: ['reserves', 'stocks', 'hr', 'haccp'],
    operations: ['create', 'read', 'update'],
  },
  [UserRole.Manager]: {
    modules: ['reserves', 'stocks'],
    operations: ['create', 'read', 'update'],
  },
  [UserRole.Employee]: {
    modules: ['reserves'],
    operations: ['read', 'update'],
  },
  [UserRole.Specialist]: {
    modules: ['reserves', 'haccp'],
    operations: ['read', 'update'],
  },
  [UserRole.Auditor]: {
    modules: ['reserves', 'stocks', 'haccp', 'finance'],
    operations: ['read'],
  },
};