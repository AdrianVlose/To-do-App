import { useState } from 'react';
import {
  OPTIONS_TYPE,
  OPTIONS_CATEGORY,
  OPTIONS_PRIORITY,
  type Option,
  colourStylesSelect,
} from '../../utils/select.ts';
import Select, { type SingleValue } from 'react-select';
import './_options.scss';
import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../store/store.ts';
import { setCategory, setPriority, setType } from '../../store/filtersSlice.ts';

export function OptionsBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState(OPTIONS_CATEGORY[0]);
  const [selectedPriority, setSelectedPriority] = useState(OPTIONS_PRIORITY[0]);
  const [selectedType, setSelectedType] = useState(OPTIONS_TYPE[0]);

  const handleCategoryChange = (value: SingleValue<Option>) => {
    if (value) {
      setSelectedCategory(value);
      dispatch(setCategory(value.value));
    }
  };

  const handlePriorityChange = (value: SingleValue<Option>) => {
    if (value) {
      setSelectedPriority(value);
      dispatch(setPriority(value.value));
    }
  };

  const handleTypeChange = (value: SingleValue<Option>) => {
    if (value) {
      setSelectedType(value);
      dispatch(setType(value.value));
    }
  };
  return (
    <div className='options'>
      <section className='filters'>
        <Select
          options={OPTIONS_CATEGORY}
          value={selectedCategory}
          onChange={handleCategoryChange}
          styles={colourStylesSelect}
        />
        <Select
          options={OPTIONS_PRIORITY}
          value={selectedPriority}
          onChange={handlePriorityChange}
          styles={colourStylesSelect}
        />
        <Select
          options={OPTIONS_TYPE}
          value={selectedType}
          onChange={handleTypeChange}
          styles={colourStylesSelect}
        />
      </section>
      <Link to='/add' className='add-task'>
        <Plus color='white' size={24} /> Add
      </Link>
    </div>
  );
}
