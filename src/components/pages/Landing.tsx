import { Link } from 'react-router';
import './_landing.scss';
export function Landing() {
  return (
    <div className='landing-page'>
      <h2 className='main-text'>Master Your Productivity</h2>
      <h3 className='second-text'>
        The minimalist task management platform that helps you focus on what
        matters most. Simple, elegant and incredible powerful.
      </h3>
      <div className='links'>
        <Link to='login' className='link-start'>
          Get Started Free
        </Link>
        <Link to='dashboard' className='link-demo'>
          View Demo
        </Link>
      </div>
    </div>
  );
}
