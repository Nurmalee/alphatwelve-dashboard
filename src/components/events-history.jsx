import { useState } from 'react';
import clsx from 'clsx';
import {
  EllipsisVertical,
  ChevronRight,
  ChevronLeft,
  Download,
  Search,
} from 'lucide-react';
import {
  AccordionContent,
  AccordionTitle,
  Accordion,
  Icon,
} from 'semantic-ui-react';

import EventDetails from './modals/event-details';
import { events } from '../data/events';
import Select from './ui/select';

// Get unique event property options (e.g., dates, statuses)
const getEventPropOptions = (type) => [
  ...new Set(events.map((event) => event[type])),
];

const EventsHistory = () => {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsPerPage, setEventsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState('');
  const [eventFilters, setEventFilters] = useState({
    speaker: '',
    status: '',
    name: '',
    date: '',
  });

  let filteredEvents = events.filter((event) => {
    return (
      (searchValue === '' ||
        event.name.toLowerCase().includes(searchValue.toLowerCase())) &&
      (eventFilters.date === '' || event.date.includes(eventFilters.date)) &&
      (eventFilters.name === '' ||
        event.name.toLowerCase().includes(eventFilters.name.toLowerCase())) &&
      // (eventFilters.speaker === '' ||
      // 	event.speakers.main
      // 		.toLowerCase()
      // 		.includes(eventFilters.speaker.toLowerCase())) &&
      (eventFilters.status === '' ||
        event.status.toLowerCase().includes(eventFilters.status.toLowerCase()))
    );
  });

  const sortedEvents = () => {
    if (orderBy === 'Descending') {
      return filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (orderBy === 'Ascending') {
      return filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return filteredEvents; // Return unsorted if no order is specified
  };

  filteredEvents = sortedEvents();

  // Calculate total pages
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Get the events for the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handleChangePage = (page) => {
    setCurrentPage(page);
    setActiveAccordionIndex(-1);
  };

  const handleClickAccordion = (e, { index }) => {
    const newIndex = activeAccordionIndex === index ? -1 : index;
    setActiveAccordionIndex(newIndex);
  };

  const handleFilterEvents = (type) => (newValue) => {
    setEventFilters((prev) => ({ ...prev, [type]: newValue }));
    setCurrentPage(1);
  };

  const handleChangeEventsPerPage = (value) => {
    setEventsPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchEvents = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(1);
  };

  const handleOrderByDate = (order) => {
    setOrderBy(order);
    setCurrentPage(1);
  };

  const handleOpenEventDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleGownloadCSV = () => {
    const headers = ['Name', 'Speaker', 'Date', 'Attendees', 'Status'];

    // Convert data into a CSV string
    const csvData = [
      headers.join(','), // Add header row
      ...events.map((event) =>
        [
          event.name,
          event.speakers.main,
          event.date,
          event.attendees,
          event.status,
        ].join(',')
      ),
    ].join('\n');

    // Create a blob from the CSV string
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'events.csv'); // File name
    document.body.appendChild(link);

    // Programmatically click the link to trigger download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };

  // Custom Pagination Component Logic
  const renderPaginationButtons = () => {
    const paginationButtons = [];

    paginationButtons.push(
      <button
        className='flex h-10 w-10 items-center justify-center rounded border border-gray-300 p-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 dark:border-none dark:bg-primary-dark dark:text-white dark:hover:bg-[#6A6676] dark:disabled:text-gray-500'
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1 || !totalPages}
        aria-label='Previous Page'
        key='prev'>
        <ChevronLeft size={15} />
      </button>
    );

    // Determine the range of page numbers to show (max 3 pages)
    let startPage = Math.max(1, currentPage - 1); // At least 1
    let endPage = Math.min(totalPages, currentPage + 1); // No more than totalPages

    // If we're on the first page, adjust to show the next two pages
    if (currentPage === 1) {
      endPage = Math.min(3, totalPages); // Make sure not to exceed totalPages
    }

    // If we're on the last page, adjust to show the previous two pages
    if (currentPage === totalPages && totalPages > 2) {
      startPage = totalPages - 2; // Make sure not to go below page 1
    }

    // Loop through the pages and render the page buttons
    for (let i = startPage; i <= endPage; i++) {
      paginationButtons.push(
        <button
          className={clsx(
            'flex h-7 w-7 items-center justify-center rounded-full p-2 text-sm font-semibold dark:text-white',
            currentPage === i
              ? 'bg-alpha-violet text-white'
              : 'dark:bg-transparent'
          )}
          onClick={() => handleChangePage(i)}
          aria-label={`Page ${i}`}
          key={i}>
          {i}
        </button>
      );
    }

    paginationButtons.push(
      <button
        className='flex h-10 w-10 items-center justify-center rounded border border-gray-300 p-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-400 dark:border-none dark:bg-primary-dark dark:text-white dark:hover:bg-[#6A6676] dark:disabled:text-gray-500'
        disabled={currentPage === totalPages || !totalPages}
        onClick={() => handleChangePage(currentPage + 1)}
        aria-label='Next Page'
        key='next'>
        <ChevronRight size={15} />
      </button>
    );

    return paginationButtons;
  };

  return (
    <>
      <div>
        <h1 className='mb-2 text-lg font-semibold dark:text-white md:text-xl'>
          Events History
        </h1>

        {/* DATA FILTERS */}
        <div className='mb-5 flex flex-col flex-wrap items-start justify-between gap-5 md:flex-row md:items-center'>
          <div className='flex w-full flex-col flex-wrap items-center gap-2 md:w-fit md:flex-row'>
            <div className='flex w-full min-w-[200px] flex-1 items-center rounded border-2 border-gray-200 p-2.5 focus:border-violet-300 dark:border-none dark:bg-primary-dark dark:text-white'>
              <Search size={17} />
              <input
                className='h-full w-full rounded border-none bg-transparent px-2 outline-none'
                onChange={handleSearchEvents}
                aria-label='Search events'
                placeholder='Search...'
                value={searchValue}
              />
            </div>

            <Select
              options={getEventPropOptions('date')}
              onChange={handleFilterEvents('date')}
              value={eventFilters.date}
              label='Date'
            />
            <Select
              options={getEventPropOptions('status')}
              onChange={handleFilterEvents('status')}
              value={eventFilters.status}
              label='Status'
            />
            <Select
              options={getEventPropOptions('name')}
              onChange={handleFilterEvents('name')}
              value={eventFilters.name}
              label='Name'
            />

            <p className='mr-auto font-semibold dark:text-white'>
              Displaying {filteredEvents.length} results
            </p>
          </div>

          <div className='flex w-full flex-col gap-2 md:w-fit md:flex-row md:items-center'>
            <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
              <span className='dark:text-white'>Sort:</span>
              <Select
                options={['Ascending', 'Descending']}
                onChange={handleOrderByDate}
                label='Most Recent'
                value={orderBy}
                prop='recent'
              />
            </div>

            <div className='flex items-center justify-between gap-2'>
              <button className='m-0 rounded border-2 border-gray-200 p-2.5 dark:border-none dark:bg-primary-dark dark:text-white'>
                <EllipsisVertical size={15} />
              </button>
              <button
                className='m-0 flex min-w-[100px] items-center justify-center gap-2 rounded border-2 border-gray-200 px-2.5 py-2 dark:border-none dark:bg-primary-dark dark:text-white'
                aria-label='Download events as CSV'
                onClick={handleGownloadCSV}
                type='button'>
                <Download size={15} /> Export
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className='hidden overflow-auto rounded border dark:border-none md:block'>
          <table className='min-w-full'>
            <thead className='bg-gray-100 dark:bg-[#6A6676]'>
              <tr>
                <th className='th-row'>Event</th>
                <th className='th-row'>Date</th>
                <th className='th-row'>Speaker</th>
                <th className='th-row'>Status</th>
              </tr>
            </thead>
            <tbody className='bg-white dark:bg-primary-dark'>
              {currentEvents.map((event, index) => (
                <tr
                  className='cursor-pointer hover:bg-gray-100 dark:hover:bg-[#6A6676]'
                  onClick={() => handleOpenEventDetails(event)}
                  key={index}>
                  <td className='td-row'>{event.name}</td>
                  <td className='td-row'>{event.date}</td>
                  <td className='td-row'>{event.speakers.main}</td>
                  <td className='td-row'>
                    <button
                      className={clsx(
                        'flex items-center justify-between gap-2 rounded-xl border px-3 py-0.5 text-sm font-semibold capitalize',
                        event.status === 'Completed'
                          ? 'border-green-200 bg-green-200 text-[#10B981] dark:border-green-600 dark:bg-transparent'
                          : 'border-blue-200 bg-blue-200 text-[#3B82F6] dark:border-blue-400 dark:bg-transparent'
                      )}>
                      {/* #65DDB5 */}
                      <span
                        className={clsx(
                          'block h-1.5 w-1.5 rounded-full border border-none bg-black',
                          event.status === 'Completed'
                            ? 'bg-green-600'
                            : 'bg-blue-400'
                        )}
                      />
                      {event.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE TABLE */}
      <div className='md:hidden'>
        <div className='flex items-center justify-between gap-3 bg-gray-100 p-2 py-4 font-bold dark:bg-[#6A6676] dark:text-white'>
          <span>Event name</span>
          <span>Status</span>
        </div>
        <Accordion>
          {currentEvents.map((event, index) => (
            <div key={index} className='dark:bg-primary-dark'>
              <AccordionTitle
                active={activeAccordionIndex === index}
                onClick={handleClickAccordion}
                index={index}>
                <div className='flex items-center justify-between gap-3 py-2 dark:text-white'>
                  <div>
                    <Icon name='dropdown' />
                    <span>{event.name}</span>
                  </div>

                  <div>
                    <button
                      className={clsx(
                        'flex items-center justify-between gap-2 rounded-xl border px-3 py-0.5 text-sm font-semibold capitalize',
                        event.status === 'Completed'
                          ? 'border-green-600 bg-green-600 text-white md:border-green-200 md:bg-green-200 md:text-green-600 md:dark:border-green-600 md:dark:bg-transparent md:dark:text-green-500'
                          : 'border-blue-500 bg-blue-500 text-white md:border-blue-200 md:bg-blue-200 md:text-blue-500 md:dark:border-blue-400 md:dark:bg-transparent md:dark:text-blue-400'
                      )}>
                      <span
                        className={clsx(
                          'hidden h-1.5 w-1.5 rounded-full border border-none bg-black md:block',
                          event.status === 'Completed'
                            ? 'bg-green-600'
                            : 'bg-blue-400'
                        )}
                      />
                      {event.status}
                    </button>
                  </div>
                </div>
              </AccordionTitle>
              <AccordionContent
                onClick={() => handleOpenEventDetails(event)}
                active={activeAccordionIndex === index}>
                <div className='dark:bg-base-dark flex items-center justify-between gap-3 bg-gray-100 p-2 py-4 dark:text-white'>
                  <span>{event.speakers.main}</span>
                  <span>{event.date}</span>
                </div>
              </AccordionContent>
            </div>
          ))}
        </Accordion>
      </div>

      {/* PAGINATION */}
      <div className='flex flex-wrap items-center justify-between gap-5'>
        <div className='flex items-center justify-center space-x-3'>
          {renderPaginationButtons()}
        </div>

        <div className='flex items-center gap-2'>
          <span className='hidden dark:text-white md:block'>Show:</span>
          <Select
            onChange={handleChangeEventsPerPage}
            options={[10, 20, 50, 100]}
            value={eventsPerPage}
            clearable={false}
          />
        </div>
      </div>

      <EventDetails
        onClose={() => setIsModalOpen(false)}
        event={selectedEvent}
        isOpen={isModalOpen}
      />
    </>
  );
};

export default EventsHistory;
