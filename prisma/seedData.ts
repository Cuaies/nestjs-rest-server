import { TestIds } from '../src/ts/enums/testIds.enum';
import { SeedData } from './ts/types';

/**
 * Seed data for the database.
 */
export const seedData: SeedData = {
  users: [
    {
      id: TestIds.EXISTENT,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password12',
    },
    {
      id: 2,
      name: null,
      email: 'jane@example.com',
      password: 'securePass',
    },
    {
      id: 3,
      name: 'Alice Smith',
      email: 'alice@example.com',
      password: 'p@$$w0rd',
    },
    {
      id: 4,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      password: 'secret123',
    },
    {
      id: 5,
      name: null,
      email: 'susan@example.com',
      password: 'susanPass',
    },
  ],

  bills: [
    {
      id: TestIds.EXISTENT,
      amount: 100.0,
      dueDate: new Date('2023-10-25'),
      details: 'Electricity bill for September',
      userId: 1,
    },
    {
      id: 2,
      amount: 75.5,
      dueDate: new Date('2023-10-24'),
      details: 'Internet bill for October',
      userId: 1,
    },
    {
      id: 3,
      amount: 200.0,
      dueDate: new Date('2023-10-23'),
      details: 'Rent for Apartment A',
      userId: 1,
    },
    {
      id: 4,
      amount: 50.0,
      dueDate: new Date('2023-10-22'),
      details: 'Gas bill for October',
      userId: 2,
    },
    {
      id: 5,
      amount: 150.0,
      dueDate: new Date('2023-10-21'),
      details: 'Grocery expenses for the week',
      userId: 3,
    },
    {
      id: 6,
      amount: 75.0,
      dueDate: new Date('2023-10-20'),
      details: 'Phone bill for October',
      userId: 4,
    },
    {
      id: 7,
      amount: 125.5,
      dueDate: new Date('2023-10-19'),
      details: "Medical expenses - Doctor's appointment",
      userId: 5,
    },
    {
      id: 8,
      amount: 90.0,
      dueDate: new Date('2023-10-18'),
      details: 'Internet bill for October',
      userId: 5,
    },
    {
      id: 9,
      amount: 175.0,
      dueDate: new Date('2023-10-17'),
      details: 'Car loan installment for October',
      userId: 1,
    },
    {
      id: 10,
      amount: 60.0,
      dueDate: new Date('2023-10-16'),
      details: 'Cable TV subscription for October',
      userId: 2,
    },
    {
      id: 11,
      amount: 125.0,
      dueDate: new Date('2023-10-15'),
      details: 'Water bill for October',
      userId: 3,
    },
    {
      id: 12,
      amount: 70.0,
      dueDate: new Date('2023-10-14'),
      details: 'Monthly car insurance premium',
      userId: 4,
    },
    {
      id: 13,
      amount: 110.0,
      dueDate: new Date('2023-10-13'),
      details: 'Dental check-up bill',
      userId: 5,
    },
    {
      id: 14,
      amount: 105.0,
      dueDate: new Date('2023-10-12'),
      details: 'Home maintenance - Roof repair',
      userId: 1,
    },
    {
      id: 15,
      amount: 80.0,
      dueDate: new Date('2023-10-11'),
      details: 'School tuition fee - Child 1',
      userId: 2,
    },
    {
      id: 16,
      amount: 95.0,
      dueDate: new Date('2023-10-10'),
      details: 'Health club membership dues',
      userId: 3,
    },
    {
      id: 17,
      amount: 120.0,
      dueDate: new Date('2023-10-09'),
      details: 'Home improvement - Kitchen remodel',
      userId: 4,
    },
    {
      id: 18,
      amount: 70.0,
      dueDate: new Date('2023-10-08'),
      details: 'Childcare expenses - Child 2',
      userId: 5,
    },
    {
      id: 19,
      amount: 130.0,
      dueDate: new Date('2023-10-07'),
      details: 'Car repair and maintenance',
      userId: 1,
    },
    {
      id: 20,
      amount: 55.0,
      dueDate: new Date('2023-10-06'),
      details: 'Property tax payment',
      userId: 2,
    },
  ],

  invoices: [
    {
      id: TestIds.EXISTENT,
      amount: 300.0,
      dueDate: new Date('2023-10-25'),
      details: 'Web development services - Project A',
      userId: 1,
    },
    {
      id: 2,
      amount: 50.5,
      dueDate: new Date('2023-10-24'),
      details: 'Consulting services - Client B',
      userId: 1,
    },
    {
      id: 3,
      amount: 75.0,
      dueDate: new Date('2023-10-23'),
      details: 'Graphic design work - Project C',
      userId: 2,
    },
    {
      id: 4,
      amount: 120.0,
      dueDate: new Date('2023-10-22'),
      details: 'Software development services - Project D',
      userId: 3,
    },
    {
      id: 5,
      amount: 90.0,
      dueDate: new Date('2023-10-21'),
      details: 'Marketing campaign - Client E',
      userId: 3,
    },
    {
      id: 6,
      amount: 110.0,
      dueDate: new Date('2023-10-20'),
      details: 'Consulting services - Client F',
      userId: 4,
    },
    {
      id: 7,
      amount: 220.0,
      dueDate: new Date('2023-10-19'),
      details: 'Legal services - Case G',
      userId: 5,
    },
    {
      id: 8,
      amount: 45.0,
      dueDate: new Date('2023-10-18'),
      details: 'Advertising campaign - Client H',
      userId: 5,
    },
    {
      id: 9,
      amount: 180.0,
      dueDate: new Date('2023-10-17'),
      details: 'Web development services - Project I',
      userId: 1,
    },
    {
      id: 10,
      amount: 70.0,
      dueDate: new Date('2023-10-16'),
      details: 'Consulting services - Client J',
      userId: 2,
    },
    {
      id: 11,
      amount: 85.0,
      dueDate: new Date('2023-10-15'),
      details: 'Graphic design work - Project K',
      userId: 3,
    },
  ],
};