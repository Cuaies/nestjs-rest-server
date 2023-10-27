import { Bill, Invoice, User } from '@prisma/client';

/**
 * Data type representing the seed data.
 */
export type SeedData = { users: User[]; bills: Bill[]; invoices: Invoice[] };
