/* eslint-disable react/prop-types */
import { X } from 'lucide-react'; // Assuming you're using lucide-react for icons
import clsx from 'clsx';

const Select = ({
  clearable = true,
  onChange,
  options,
  value,
  label,
  prop,
}) => {
  const handleClear = () => {
    onChange(''); // Clear the selected value
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={clsx(
        'relative flex w-full flex-1 items-center rounded text-center',
        prop === 'recent'
          ? 'md:min-w-[125px] md:max-w-[125px]'
          : 'md:min-w-[100px] md:max-w-[100px]'
      )}>
      <select
        className={clsx(
          'w-full flex-1 rounded border-2 border-gray-200 p-2.5 text-center outline-violet-300 focus:border-violet-300 focus:outline-violet-300 dark:border-none dark:bg-primary-dark dark:text-white md:text-left',
          value && 'border-violet-300'
        )}
        onChange={handleChange}
        value={value}>
        {label && (
          <option value='' disabled>
            {label}
          </option>
        )}

        {options.map((text) => (
          <option key={text} value={text}>
            {text}
          </option>
        ))}
      </select>

      {/* Show clear button if there is a value */}
      {clearable && value && (
        <button
          className='absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-red-500 text-xs text-white'
          onClick={handleClear}
          type='button'>
          <X size={9} />
        </button>
      )}
    </div>
  );
};

export default Select;
