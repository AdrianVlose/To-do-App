import { LoaderCircle } from 'lucide-react';
import './_loadingState.scss';
export function LoadingState() {
  return (
    <>
      <LoaderCircle color='#f5f5f7' size={40} className='loading-icon' />
    </>
  );
}
