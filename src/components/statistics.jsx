/* eslint-disable react/prop-types */
import { CircleAlert } from 'lucide-react';
import clsx from 'clsx';

const data = [
  {
    title: 'Total Events',
    value: '100,000',
    diff: '+5.0',
  },
  {
    title: 'Active Speakers',
    value: '25',
    diff: '-5.0',
  },
  {
    title: 'Total Registrations',
    value: '300',
    diff: '+5.0',
  },
  {
    title: 'Total Revenue',
    value: '$500,000',
    diff: '+5.0',
  },
];

const StatCard = ({ title, value, diff }) => {
  return (
    <div className='flex flex-col rounded border-2 border-gray-200 bg-white px-4 py-5 dark:border-transparent dark:bg-primary-dark dark:text-white'>
      <p className='flex items-center gap-2 font-semibold leading-tight text-gray-600 dark:text-white'>
        {title} <CircleAlert size={12} />
      </p>
      <div className='flex items-center gap-2'>
        <p className='text-lg font-bold'>{value}</p>
        <span
          className={clsx(
            'flex gap-2 text-xs font-semibold',
            diff >= 5 ? 'text-green-500' : 'text-red-500'
          )}>
          {diff >= 5 ? '↗' : '↘'} {diff}%
        </span>
      </div>
    </div>
  );
};

const Statistics = () => {
  return (
    <div>
      <h1 className='mb-2 text-lg font-semibold dark:text-white md:text-2xl'>
        Welcome! Here&apos;s Your Summary
      </h1>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {data.map(({ title, value, diff }) => (
          <StatCard key={title} title={title} value={value} diff={diff} />
        ))}
      </div>
    </div>
  );
};

export default Statistics;
