import { OptionsBar } from '../bars/OptionsBar';
import { PaginationBar } from '../bars/PaginationBar';
import { TaskTable } from '../tables/TaskTable';
import './_dashboard.scss';

export function Dashboard() {
  return (
    <div className='dashboard'>
      <h2>
        Dashboard <br /> <span>Manage your tasks and stay productive</span>
      </h2>
      <OptionsBar />
      <TaskTable />
      <PaginationBar />
    </div>
  );
}
