import { zodResolver } from '@hookform/resolvers/zod';
import { Contact, type TContact } from '../../utils/types/baseForms';
import { useForm } from 'react-hook-form';
import './_baseForm.scss';

export function ContactForm() {
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<TContact>({
    resolver: zodResolver(Contact),
    mode: 'onChange',
  });

  const onSubmitContact = async (formValues: TContact) => {
    if (formValues) {
      console.log(formValues);
      reset();
    }
  };

  return (
    <section className='form-component'>
      <div className='form-header'>
        <h2>
          Support Hub
          <span>
            Have a question or feedback? Reach out and our team will assist you
            shortly
          </span>
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmitContact)} className='form'>
        <h2>Contact Us</h2>
        <label className='input-label'>
          <input
            {...register('title')}
            placeholder='Subject'
            className='form-input'
            autoComplete='none'
          />
        </label>
        {errors.title && <p className='error-text'>{errors.title.message}</p>}
        <label className='input-label'>
          <textarea
            {...register('description')}
            placeholder='Please provide a brief description of why you are you reaching out today ...'
            className='form-textarea'
            rows={10}
            autoComplete='none'
          />
        </label>
        {errors.description && (
          <p className='error-text'>{errors.description.message}</p>
        )}
        <button type='submit' className='submit-button'>
          Send
        </button>
      </form>
    </section>
  );
}
