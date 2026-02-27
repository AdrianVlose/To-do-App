import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import './_paginationBar.scss';
import { getTasks } from '../../store/tasksSlice';

export function PaginationBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfPages = useSelector(
    (state: RootState) => state.tasks.numberOfPages,
  );

  const isLeftArrowDisabled = currentPage === 1;
  const isRightArrowDisabled = numberOfPages === currentPage;

  const handlePageChange = (newCurrentPage: number) => {
    setCurrentPage(newCurrentPage);
    dispatch(getTasks(newCurrentPage));
  };
  return (
    <section className='pagination-bar'>
      <ChevronLeft
        color='#f5f5f7'
        size={42}
        className={isLeftArrowDisabled ? 'arrow disabled' : 'arrow'}
        strokeWidth='1.25px'
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <h3>{currentPage}</h3>
      <ChevronRight
        color='#f5f5f7'
        size={42}
        className={isRightArrowDisabled ? 'arrow disabled' : 'arrow'}
        strokeWidth='1.25px'
        onClick={() => handlePageChange(currentPage + 1)}
      />
    </section>
  );
}
