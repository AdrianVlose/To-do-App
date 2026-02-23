export type Task = {
  id: number;
  created_at?: Date;
  title: string;
  label: TaskLabel;
  priority: TaskPriority;
  type: TaskRecurrence;
  due_date: Date;
  isCompleted: boolean;
};

export type TaskLabel =
  | 'work'
  | 'personal'
  | 'shopping'
  | 'health'
  | 'social'
  | 'other';

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskRecurrence = 'once' | 'daily' | 'weekly' | 'monthly';
