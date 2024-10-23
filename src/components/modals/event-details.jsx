/* eslint-disable react/prop-types */
import { X } from 'lucide-react';

import avatar1 from '../../assets/avatar-1.png';
import avatar2 from '../../assets/avatar-2.png';
import avatar3 from '../../assets/avatar-3.png';

const EventDetails = ({ isOpen, onClose, event }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75'
      onClick={onClose}>
      <div
        className='relative m-2 flex w-full max-w-xl flex-col gap-12 rounded bg-white shadow-lg dark:bg-primary-dark'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col gap-6 p-6 dark:text-white'>
          <span
            className='absolute right-4 top-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-black dark:bg-[#ADA9BB]'
            onClick={onClose}>
            <X size={15} />
          </span>
          <div>
            <p className='text-lg font-bold md:text-xl'>{event.name}</p>
            <span>{event.date}</span>
          </div>

          <p>{event.description}</p>

          <div>
            <div className='mb-2 flex items-center'>
              <div className='h-12 w-12 overflow-hidden rounded-full bg-[#F4E9C9]'>
                <img
                  className='h-full w-full object-cover'
                  src={avatar1}
                  alt='Avatar 1'
                />
              </div>
              <div className='-ml-2 h-12 w-12 overflow-hidden rounded-full bg-[#F4C9C9]'>
                <img
                  className='h-full w-full object-cover'
                  src={avatar2}
                  alt='Avatar 2'
                />
              </div>
              <div className='-ml-2 h-12 w-12 overflow-hidden rounded-full bg-[#C9D8F4]'>
                <img
                  className='h-full w-full object-cover'
                  src={avatar3}
                  alt='Avatar 3'
                />
              </div>
            </div>

            <p>
              <span className='font-semibold'>
                {event.speakers.guests.length} Guest speakers:
              </span>

              <span className='ml-2'>{event.speakers.guests.join(', ')}</span>
            </p>
            <p>{event.attendees} Attendees</p>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-2 border-t-2 border-gray-200 bg-gray-100 px-6 py-4 dark:border-gray-500 dark:bg-[#ADA9BB] md:flex-row'>
          <button className='w-full rounded border bg-white p-2 px-4 md:w-auto'>
            Edit
          </button>

          <div className='flex w-full flex-col gap-2 md:w-auto md:flex-row'>
            <button className='w-full rounded bg-red-500 p-2 px-4 text-white md:w-auto'>
              Delete
            </button>
            <button className='w-full rounded bg-alpha-violet p-2 px-4 text-white md:w-auto'>
              Mark as Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
