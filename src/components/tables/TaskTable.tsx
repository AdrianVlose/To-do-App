import { useDispatch, useSelector } from 'react-redux';
import { TASK_TABLE_COLUMNS } from '../../utils/types/constants.ts';
import type { AppDispatch, RootState } from '../../store/store.ts';
import { useEffect } from 'react';
import { getTasks } from '../../store/tasksSlice.ts';
import { getDateFormatted } from '../../utils/helpers.ts';
export function TaskTable() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  return (
    <section>
      <table>
        <thead>
          <tr>
            {TASK_TABLE_COLUMNS.map((column, index) => {
              return <th key={index}>{column}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Object.values(tasks).map((task, index) => {
            return (
              <tr key={index}>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.label}</td>
                <td>{task.type}</td>
                <td>{getDateFormatted(task.due_date)}</td>
                <td>{task.isCompleted ? 'Completed' : 'Not Completed'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
