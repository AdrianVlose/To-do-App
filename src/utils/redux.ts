import type { Task } from './types/types';

export function convertListWithTaskToRecord(tasks: unknown) {
  const tasksRecord: Record<number, Task> = {};
  if (!tasks) {
    return tasksRecord;
  }
  if (!Array.isArray(tasks)) {
    return tasksRecord;
  }
  const tasksList = tasks as Task[];
  tasksList.forEach((task) => {
    tasksRecord[task.id] = task;
  });
  return tasksRecord;
}
