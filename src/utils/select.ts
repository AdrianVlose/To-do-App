import type { StylesConfig } from 'react-select';

export const OPTIONS_CATEGORY = [
  { value: 'none', label: 'All Categories' },
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health' },
  { value: 'social', label: 'Social' },
  { value: 'other', label: 'Other' },
];
export const OPTIONS_PRIORITY = [
  { value: 'none', label: 'All Priorities' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];
export const OPTIONS_TYPE = [
  { value: 'none', label: 'All Types' },
  { value: 'once', label: 'Once' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

export interface Option {
  value: string;
  label: string;
}

export const colourStylesSelect = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#18181b',
    borderColor: isFocused ? '#3f3f46' : '#27272a',
    borderRadius: '8px',
    padding: '2px 8px',
    color: '#ffffff',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3f3f46',
    },
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '8px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    padding: '4px',
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? '#27272a' : 'transparent',
    color: isSelected ? '#0ea5e9' : '#ffffff',
    borderRadius: '6px',
    cursor: 'pointer',
    padding: '8px 12px',
    fontSize: '14px',
    '&:active': {
      backgroundColor: '#3f3f46',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#ffffff',
  }),
  input: (styles) => ({
    ...styles,
    color: '#ffffff',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#71717a',
  }),
} as StylesConfig<Option, false>;
