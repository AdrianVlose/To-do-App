import { z } from 'zod';

export const Contact = z.object({
  title: z
    .string()
    .min(3, 'Title cannot be shorter than 3 caracters')
    .max(25, 'Title need to have less than 25 characters'),
  description: z
    .string()
    .min(10, 'Description cannot be shorter than 10 characters')
    .max(255, 'Description need to have less than 255 characters'),
});

export const Login = z.object({
  username: z
    .string()
    .min(7, 'Username cannot be shorter than 7 caracters')
    .max(15, 'Username need to have less than 25 characters'),
  password: z
    .string()
    .min(8, 'Password cannot be shorter than 8 characters')
    .max(20, 'Password need to have less than 20 characters')
    .refine(
      (password) => /[A-Z]/.test(password),
      'Password need to have at least one upper case character',
    )
    .refine(
      (password) => /[0-9]/.test(password),
      'Password need to have at least one numeric character',
    ),
});

export type TContact = z.infer<typeof Contact>;
export type TLogin = z.infer<typeof Login>;
