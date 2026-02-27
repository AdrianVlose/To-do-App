import { Link, NavLink, useNavigate } from 'react-router';
import './_header.scss';
import { CopyCheck } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import supabase from '../../utils/supabase';
import { type AppDispatch } from '../../store/store';
import { setIsLoggedIn } from '../../store/tasksSlice';

export function Header() {
  const isLoggedIn = useSelector((state: RootState) => state.tasks.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOrLogin = async () => {
    if (isLoggedIn) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error(error);
      }

      dispatch(setIsLoggedIn(false));
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className='header'>
      <Link to={isLoggedIn ? '/dashboard' : '/'} className='title'>
        <CopyCheck color='currentColor' size={48} className='icon-logo' />
        <h1>To Do</h1>
      </Link>
      <ul className='links-list'>
        <li>
          <NavLink to='dashboard' className='link'>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={isLoggedIn ? '/' : 'contact'} className='link'>
            Contact
          </NavLink>
        </li>
      </ul>
      <button
        type='button'
        className='link-to-login'
        onClick={handleSignOrLogin}
      >
        {isLoggedIn ? 'Sign out' : 'Get Started'}
      </button>
    </header>
  );
}
