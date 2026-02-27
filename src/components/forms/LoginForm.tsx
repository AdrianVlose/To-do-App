import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import './_baseForm.scss';
import { Login, type TLogin } from '../../utils/types/baseForms';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router';
import { type AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { setIsLoggedIn } from '../../store/tasksSlice';

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<TLogin>({
    resolver: zodResolver(Login),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmitContact = async (formValues: TLogin) => {
    if (formValues) {
      const virtualEmail = `${formValues.username}@demo.com`;
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: virtualEmail,
        password: formValues.password,
      });
      reset();

      if (loginError && loginError.message === 'Invalid login credentials') {
        console.log('User not found, creating account...');
        const { error: signUpError } = await supabase.auth.signUp({
          email: virtualEmail,
          password: formValues.password,
        });

        if (signUpError) {
          console.error(signUpError.message);
        } else {
          console.log('Account created');
        }
      }

      dispatch(setIsLoggedIn(true));

      navigate('/dashboard');
    }
  };

  return (
    <section className='form-component'>
      <div className='form-header'>
        <h2>
          Authentication
          <span>
            Securely access your workspace to continue managing your
            productivity
          </span>
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmitContact)} className='form'>
        <h2>Get Started</h2>
        <label className='input-label'>
          <input
            {...register('username')}
            placeholder='Username'
            className='form-input'
            autoComplete='none'
          />
        </label>
        {errors.username && (
          <p className='error-text'>{errors.username.message}</p>
        )}
        <label className='input-label'>
          <input
            {...register('password')}
            placeholder='Password'
            className='form-input'
            type={showPassword ? 'text' : 'password'}
            autoComplete='none'
          />

          <button
            type='button'
            onClick={toggleVisibility}
            className='visibility-button'
          >
            {showPassword ? (
              <EyeOff
                color='#3f3f46'
                size={24}
                style={{ alignSelf: 'center' }}
              />
            ) : (
              <Eye color='#3f3f46' size={24} style={{ alignSelf: 'center' }} />
            )}
          </button>
        </label>
        {errors.password && (
          <p className='error-text'>{errors.password.message}</p>
        )}
        <button type='submit' className='submit-button'>
          Continue
        </button>
      </form>
    </section>
  );
}
