import { hashSync } from 'bcrypt';

/**
 * Hashes a password.
 */
export const hashPassword = (password: string) => hashSync(password, 10);
