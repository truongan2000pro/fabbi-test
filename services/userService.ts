// Import the User interface
import { v4 as uuidv4 } from 'uuid';

import { User } from '../interfaces/User';

// Initialize an empty array to store user objects
let users: User[] = [
  {
    id: '1',
    login: 'anbeo',
    password: 'batman',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export function getAllUsers(): Omit<User, 'password'>[] {
  return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
}

export function getUserById(userId: string): Omit<User, 'password'> | undefined {
  const user = users.find((user) => user.id === userId);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return undefined;
}

export function createUser(login: string, password: string): Omit<User, 'password'> {
  const newUser: User = {
    id: uuidv4(),
    login,
    password,
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  users.push(newUser);

  // ignoring the value of the password field
  const { password: _, ...userWithoutPassword } = newUser;

  return userWithoutPassword;
}

export function updateUserPassword(
  userId: string,
  oldPassword: string,
  newPassword: string
): { user?: Omit<User, 'password'>; error?: string } {
  const userIndex = users.findIndex((user) => user.id === userId);

  const user = users[userIndex];
  if (user.password !== oldPassword) {
    return { error: 'Incorrect old password' };
  }

  user.password = newPassword;
  user.version++;
  user.updatedAt = Date.now();

  // ignoring the value of the password field
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword };
}

export function deleteUser(userId: string): boolean {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }

  return false;
}
