import { z } from 'zod';

export const LABELS = [
  'work',
  'personal',
  'shopping',
  'health',
  'social',
  'other',
];

export const PRIORITIES = ['low', 'medium', 'high', 'urgent'];
export const TYPES = ['once', 'daily', 'monthly', 'yearly'];

export const LabelEnum = z.enum([
  'work',
  'personal',
  'shopping',
  'health',
  'social',
  'other',
]);
export const PriorityEnum = z.enum(['low', 'medium', 'high', 'urgent']);
export const TypeEnum = z.enum(['once', 'daily', 'monthly', 'yearly']);

export const CreateTask = z.object({
  title: z
    .string()
    .min(3, 'Title cannot be shorter than 3 caracters')
    .max(25, 'Title need to have less than 25 characters'),
  label: LabelEnum.optional().refine((value) => value !== undefined, {
    message: 'Label was not not selected',
  }),
  priority: PriorityEnum.optional().refine((value) => value !== undefined, {
    message: 'Priority was not not selected',
  }),
  type: TypeEnum.optional().refine((value) => value !== undefined, {
    message: 'Type was not not selected',
  }),
  isCompleted: z.boolean().default(false).optional(),
  due_date: z.coerce
    .date()
    .nullable()
    .refine(
      (date) => {
        if (!date) return true;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today ? date.toISOString().split('T')[0] : null;
      },
      { message: 'Date can not be from the past' },
    ),
});

export const UpdateTask = CreateTask.extend({
  id: z.number(),
  created_at: z.date(),
});

export type TUpdateTask = z.infer<typeof UpdateTask>;
export type TCreateTask = z.infer<typeof CreateTask>;
