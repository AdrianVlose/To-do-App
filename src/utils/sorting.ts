const IS_SORTING_BY_STATUS_KEY = 'is_sorting_by_status_v1';
const IS_SORTING_BY_PRIORITY_KEY = 'is_sorting_by_priority_v1';
const IS_SORTING_ASCENDING_KEY = 'is_sorting_ascending_v1';

export function setStatusInStorage(value: boolean) {
  sessionStorage.setItem(IS_SORTING_BY_STATUS_KEY, JSON.stringify(value));
}

export function getStatusFromStorage() {
  const statusFromStorage = sessionStorage.getItem(IS_SORTING_BY_STATUS_KEY);
  if (!statusFromStorage) {
    return false;
  }
  let valueParsed: boolean;
  try {
    valueParsed = JSON.parse(statusFromStorage);
  } catch (error) {
    console.error(error);
    return false;
  }

  return valueParsed;
}

export function setPriorityInStorage(value: boolean) {
  sessionStorage.setItem(IS_SORTING_BY_PRIORITY_KEY, JSON.stringify(value));
}

export function getPriorityFromStorage() {
  const statusFromStorage = sessionStorage.getItem(IS_SORTING_BY_PRIORITY_KEY);
  if (!statusFromStorage) {
    return false;
  }
  let valueParsed: boolean;
  try {
    valueParsed = JSON.parse(statusFromStorage);
  } catch (error) {
    console.error(error);
    return false;
  }

  return valueParsed;
}

export function setAscendingInStorage(value: boolean) {
  sessionStorage.setItem(IS_SORTING_ASCENDING_KEY, JSON.stringify(value));
}

export function getAscendingFromStorage() {
  const statusFromStorage = sessionStorage.getItem(IS_SORTING_ASCENDING_KEY);
  if (!statusFromStorage) {
    return false;
  }
  let valueParsed: boolean;
  try {
    valueParsed = JSON.parse(statusFromStorage);
  } catch (error) {
    console.error(error);
    return false;
  }

  return valueParsed;
}
