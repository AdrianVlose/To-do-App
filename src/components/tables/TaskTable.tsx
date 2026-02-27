import { useDispatch, useSelector } from 'react-redux';
import { TASK_TABLE_COLUMNS } from '../../utils/types/constants.ts';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { useEffect, useMemo, useState } from 'react';
import { deleteTask, updateIsTaskCompleted } from '../../store/tasksSlice.ts';
import {
  convertFirstLetterToUpperCase,
  filterTasks,
  getDueDateStatus,
} from '../../utils/helpers.ts';
import './_taskTable.scss';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  getAscendingFromStorage,
  getPriorityFromStorage,
  getStatusFromStorage,
  setAscendingInStorage,
  setPriorityInStorage,
  setStatusInStorage,
} from '../../utils/sorting.ts';
import { LoadingState } from '../loading/LoadingState.tsx';

export function TaskTable() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);
  const isLoadingState = useSelector(
    (state: RootState) => state.tasks.isLoading,
  );

  const category = useSelector((state: RootState) => state.filters.category);
  const priority = useSelector((state: RootState) => state.filters.priority);
  const type = useSelector((state: RootState) => state.filters.type);
  const [isSortedByStatus, setIsSortedByStatus] = useState(
    getStatusFromStorage(),
  );
  const [isSortedByPriority, setIsSortedByPriority] = useState(
    getPriorityFromStorage(),
  );
  const [isSortingAsc, setIsSortingAsc] = useState(getAscendingFromStorage());

  const handleSorting = (column: string) => {
    const isStatusColumn = column === 'Status';
    if (isStatusColumn) {
      if (isSortedByStatus) {
        if (!isSortingAsc) {
          setIsSortedByPriority(false);
          setIsSortedByStatus(false);
        } else {
          setIsSortingAsc(false);
        }
      } else {
        setIsSortedByPriority(false);
        setIsSortedByStatus(true);
        setIsSortingAsc(true);
      }
    } else {
      if (isSortedByPriority) {
        if (!isSortingAsc) {
          setIsSortedByPriority(false);
          setIsSortedByStatus(false);
        } else {
          setIsSortingAsc(false);
        }
      } else {
        setIsSortedByPriority(true);
        setIsSortedByStatus(false);
        setIsSortingAsc(true);
      }
    }
  };

  const sortingIcon = (column: string) => {
    if (
      (!isSortedByStatus && column === 'Status') ||
      (!isSortedByPriority && column === 'Priority')
    ) {
      return (
        <ChevronsUpDown
          color='currentColor'
          size={24}
          className='icon-header'
        />
      );
    }
    return isSortingAsc ? (
      <ArrowUpNarrowWide
        color='currentColor'
        size={24}
        className='icon-header'
      />
    ) : (
      <ArrowDownWideNarrow
        color='currentColor'
        size={24}
        className='icon-header'
      />
    );
  };

  const filteredTasks = useMemo(() => {
    return filterTasks(
      tasks,
      category,
      priority,
      type,
      isSortedByStatus,
      isSortedByPriority,
      isSortingAsc,
    );
  }, [
    tasks,
    category,
    priority,
    type,
    isSortedByPriority,
    isSortedByStatus,
    isSortingAsc,
  ]);

  useEffect(() => {
    return () => {
      setStatusInStorage(isSortedByStatus);
      setPriorityInStorage(isSortedByPriority);
      setAscendingInStorage(isSortingAsc);
    };
  }, [isSortedByPriority, isSortedByStatus, isSortingAsc]);

  return (
    <section className='task-table'>
      {!isLoadingState ? (
        filteredTasks.length === 0 ? (
          <h2 className='empty-text'>No tasks to be displayed</h2>
        ) : (
          <table className='table'>
            <thead className='table-header'>
              <tr className='table-row'>
                {TASK_TABLE_COLUMNS.map((column, index) => {
                  return (
                    <th
                      key={index}
                      className={`${column}`}
                      onClick={() => {
                        if (column === 'Status' || column === 'Priority')
                          handleSorting(column);
                      }}
                    >
                      <p>
                        {column}{' '}
                        {column === 'Status' || column === 'Priority' ? (
                          sortingIcon(column)
                        ) : (
                          <></>
                        )}
                      </p>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className='table-body'>
              {filteredTasks.map((task, index) => {
                return (
                  <tr key={index} className='table-row'>
                    <td>
                      <label>
                        <input
                          type='checkbox'
                          checked={task.isCompleted}
                          className={
                            isLoggedIn ? 'checkbox' : 'checkbox disabled'
                          }
                          onChange={() => {
                            dispatch(
                              updateIsTaskCompleted({
                                isCompleted: !task.isCompleted,
                                id: task.id,
                              }),
                            );
                          }}
                        />
                      </label>
                    </td>
                    <td
                      className={`title ${task.isCompleted ? 'completed' : ''}`}
                    >
                      {task.title}
                    </td>
                    <td>
                      <p className={`label-${task.label}`}>
                        {convertFirstLetterToUpperCase(task.label)}
                      </p>
                    </td>
                    <td>
                      <p className={`label-${task.priority}`}>
                        {convertFirstLetterToUpperCase(task.priority)}
                      </p>
                    </td>
                    <td>{convertFirstLetterToUpperCase(task.type)}</td>
                    <td>{getDueDateStatus(task)}</td>
                    <td>
                      <Pencil
                        color='#8e8e93'
                        size={40}
                        className={
                          isLoggedIn ? 'edit-icon' : 'edit-icon disabled'
                        }
                        onClick={() => {
                          navigate(`/edit/${task.id}`);
                        }}
                      />
                      <Trash2
                        color='#ff3b30'
                        size={40}
                        className={
                          isLoggedIn ? 'delete-icon' : 'delete-icon disabled'
                        }
                        onClick={() => {
                          dispatch(deleteTask(task.id));
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : (
        <LoadingState />
      )}
    </section>
  );
}
