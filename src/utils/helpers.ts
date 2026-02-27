import type { Task } from './types/types';

export function convertFirstLetterToUpperCase(text: string) {
  return text.at(0)?.toLocaleUpperCase() + text.slice(1);
}

export function getDateFormatted(date: Date) {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString('ro-Ro');
}

export function isIdFromUrlValid(id: string | undefined) {
  if (!id) {
    return false;
  }
  if (isNaN(parseInt(id))) {
    return false;
  }
  return true;
}

export function filterTasks(
  tasks: Record<number, Task>,
  label: string,
  priority: string,
  type: string,
  isStatusSortActive: boolean,
  isPrioritySortActive: boolean,
  isSortAscending: boolean,
) {
  const filteredTasksByLabel = Object.values(tasks).filter((task) => {
    if (label === 'none') {
      return true;
    }
    return task.label === label;
  });

  const filteredTasksByPriority = filteredTasksByLabel.filter((task) => {
    if (priority === 'none') {
      return true;
    }
    return task.priority === priority;
  });

  const filteredTasksByType = filteredTasksByPriority.filter((task) => {
    if (type === 'none') {
      return true;
    }
    return task.type === type;
  });

  if (isStatusSortActive) {
    filteredTasksByType.sort((a, b) => {
      const firstValue = a.isCompleted ? 1 : 0;
      const secondValue = b.isCompleted ? 1 : 0;
      if (isSortAscending) {
        return firstValue - secondValue;
      } else {
        return secondValue - firstValue;
      }
    });
  }

  if (isPrioritySortActive) {
    filteredTasksByType.sort((a, b) => {
      const firstValue = getValueForPriority(a.priority);
      const secondValue = getValueForPriority(b.priority);
      if (isSortAscending) {
        return firstValue - secondValue;
      } else {
        return secondValue - firstValue;
      }
    });
  }

  return filteredTasksByType;
}

function getValueForPriority(priority: string) {
  switch (priority) {
    case 'urgent':
      return 3;
    case 'high':
      return 2;
    case 'medium':
      return 1;
    default:
      return 0;
  }
}

export function getDueDateStatus(task: Task) {
  if (task.due_date) {
    return getDateFormatted(task.due_date);
  }

  switch (task.type) {
    case 'daily':
      return task.isCompleted ? 'Done Today' : 'To do today';
    case 'monthly':
      return task.isCompleted ? 'Done this month' : 'To do this month';
    case 'yearly':
      return task.isCompleted ? 'Done this year' : 'To do this year';
  }
  return '';
}
