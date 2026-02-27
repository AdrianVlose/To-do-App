import { useForm, useWatch } from 'react-hook-form';
import type { TCreateTask, TUpdateTask } from '../../utils/types/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTask, LABELS, PRIORITIES, TYPES } from '../../utils/types/forms';
import './_taskForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../store/store';
import { insertTask, updateTask } from '../../store/tasksSlice';
import {
  convertFirstLetterToUpperCase,
  isIdFromUrlValid,
} from '../../utils/helpers';
import { Plus, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

export function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const idFromParams = id && isIdFromUrlValid(id) ? parseInt(id) : -1;
  const isEditPage = id ? true : false;
  const taskToBeModified = useSelector(
    (state: RootState) => state.tasks.tasks[idFromParams],
  );
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
    setValue,
  } = useForm<TCreateTask>({
    resolver: zodResolver(CreateTask),
    defaultValues: {
      label: id ? taskToBeModified?.label : undefined,
      priority: id ? taskToBeModified?.priority : undefined,
      type: id ? taskToBeModified?.type : undefined,
      due_date: id ? taskToBeModified?.due_date : null,
      isCompleted: id ? taskToBeModified?.isCompleted : false,
      title: id ? taskToBeModified?.title : '',
    },
  });

  const [selectedLabel, selectedPriority, selectedType, selectedDate] =
    useWatch({
      control,
      name: ['label', 'priority', 'type', 'due_date'],
    });

  const onSubmit = async (task: TCreateTask) => {
    if (task) {
      if (isEditPage) {
        const updatedTask: TUpdateTask = {
          ...task,
          id: taskToBeModified.id,
          created_at: taskToBeModified.created_at,
        };
        dispatch(updateTask(updatedTask));
      } else {
        dispatch(insertTask(task));
      }

      reset();
      navigate('/dashboard');
    }
  };

  return (
    <section className='form-page'>
      <form onSubmit={handleSubmit(onSubmit)} className='form'>
        <h2>{isEditPage ? 'Edit Task' : 'Add Task'}</h2>
        <label className='input-label'>
          <input
            {...register('title')}
            placeholder='Title'
            className='form-input'
            autoComplete='none'
          />
          {errors.title && <p>{errors.title.message}</p>}
        </label>
        {!selectedLabel ? (
          <div className='form-categories'>
            {LABELS.map((label, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  className={`option-button ${label}`}
                  onClick={() =>
                    setValue('label', label as TCreateTask['label'], {
                      shouldValidate: true,
                    })
                  }
                >
                  {convertFirstLetterToUpperCase(label)}{' '}
                  <Plus color='currentColor' />
                </button>
              );
            })}
          </div>
        ) : (
          <div className='selected-option'>
            <h3 className={`selected ${selectedLabel}`}>
              {convertFirstLetterToUpperCase(selectedLabel)}
            </h3>
            <X
              color='#8e8e93'
              size={40}
              className='icon-delete'
              onClick={() => setValue('label', undefined)}
            />
          </div>
        )}
        {errors.label && <p className='error-text'>{errors.label.message}</p>}

        {!selectedPriority ? (
          <div className='form-priorities'>
            {PRIORITIES.map((priority, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  className={`option-button ${priority}`}
                  onClick={() =>
                    setValue('priority', priority as TCreateTask['priority'], {
                      shouldValidate: true,
                    })
                  }
                >
                  {convertFirstLetterToUpperCase(priority)}{' '}
                  <Plus color='currentColor' />
                </button>
              );
            })}
          </div>
        ) : (
          <div className='selected-option'>
            <h3 className={`selected ${selectedPriority}`}>
              {convertFirstLetterToUpperCase(selectedPriority)}
            </h3>
            <X
              color='#8e8e93'
              size={40}
              className='icon-delete'
              onClick={() => setValue('priority', undefined)}
            />
          </div>
        )}

        {errors.priority && (
          <p className='error-text'>{errors.priority.message}</p>
        )}

        {!selectedType ? (
          <div className='form-types'>
            {TYPES.map((type, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  className='option-button type'
                  onClick={() =>
                    setValue('type', type as TCreateTask['type'], {
                      shouldValidate: true,
                    })
                  }
                >
                  {convertFirstLetterToUpperCase(type)}{' '}
                  <Plus color='currentColor' />
                </button>
              );
            })}
          </div>
        ) : (
          <div className='selected-option'>
            <h3 className='selected type'>
              {convertFirstLetterToUpperCase(selectedType)}
            </h3>
            {selectedType === 'once' ? (
              <label className='label-date'>
                Choose a due date:
                <input
                  {...register('due_date')}
                  value={selectedDate ? selectedDate : ''}
                  onChange={(e) => setValue('due_date', e.target.value)}
                  type='date'
                  className='date-picker'
                  name='date'
                  min={new Date().toISOString().split('T')[0]}
                />
              </label>
            ) : (
              <></>
            )}
            <X
              color='#8e8e93'
              size={40}
              className='icon-delete'
              onClick={() => {
                setValue('type', undefined);
                setValue('due_date', null);
              }}
            />
          </div>
        )}
        {errors.type && <p className='error-text'>{errors.type.message}</p>}

        <button type='submit' className='submit-button'>
          {isEditPage ? 'Edit' : 'Add'}
        </button>
      </form>
    </section>
  );
}
