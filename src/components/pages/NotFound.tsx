import { Link } from 'react-router';
import './_notFound.scss';

export function NotFound() {
  return (
    <div className='page-not-found'>
      <section>
        <h1>The page you are looking is currently unavailable</h1>
        <Link to='/' className='home-link'>
          Back to home page
        </Link>
      </section>
    </div>
  );
}
