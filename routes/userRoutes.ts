// routes/userRoutes.ts

import express, { Request, Response } from 'express';
import { validate as uuidValidate } from 'uuid';

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserPassword,
  deleteUser,
} from '../services/userService';
import { CreateUserDto, UpdatePasswordDto } from '../interfaces/User';

const router = express.Router();

// GET /user
router.get('/', (req: Request, res: Response) => {
  const users = getAllUsers();
  return res.status(200).json(users);
});

// GET /user/:id
router.get('/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = getUserById(userId);

  if (!uuidValidate(userId)) return res.status(400).json({ message: 'Invalid user uuid' });

  if (!user) return res.status(404).json({ message: 'User not found' });

  return res.status(200).json(user);
});

// POST /user
router.post('/', (req: Request, res: Response) => {
  const { login, password }: CreateUserDto = req.body;

  if (!login || !password)
    return res.status(400).json({ message: 'Login and password are required' });

  const newUser = createUser(login, password);
  return res.status(201).json(newUser);
});

// PUT /user/:id
router.put('/:id', (req: Request, res: Response) => {
  const userId: string = req.params.id;
  if (!uuidValidate(userId)) return res.status(400).json({ message: 'Invalid user uuid' });

  const { oldPassword, newPassword }: UpdatePasswordDto = req.body;

  // Check if the user exists
  const user = getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Validate request body
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Old password and new password are required' });
  }

  // Update user password using updateUserPassword function from userService
  const { user: updatedUser, error } = updateUserPassword(userId, oldPassword, newPassword);

  // Handle error if any
  if (error) {
    return res.status(403).json({ message: error });
  }

  // Respond with the updated user object
  return res.status(200).json(updatedUser);
});

// DELETE /user/:id
router.delete('/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!uuidValidate(userId)) return res.status(400).json({ message: 'Invalid user uuid' });
  const deleted = deleteUser(userId);

  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }
  return res.status(204).send();
});

export default router;
