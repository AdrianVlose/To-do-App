export type Task = {
  id: number;
  created_at: Date;
  title: string;
  label: TaskLabel;
  priority: TaskPriority;
  type: TaskRecurrence;
  due_date: Date | null;
  isCompleted: boolean;
};

export type TaskToggleCompleted = Pick<Task, 'isCompleted' | 'id'>;

export type TaskLabel =
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'social'
  | 'other';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskRecurrence = 'once' | 'daily' | 'monthly' | 'yearly';
