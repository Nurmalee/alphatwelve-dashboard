import { cloneElement } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';

import { useUI } from '../../contexts/UIContext';
import { tabs } from '../data/navigation';

import userPlaceholder from '../assets/user-img-placeholder.png';

const ThemeToggler = () => {
  const { isSidebarCollapsed, toggleDarkMode, darkMode } = useUI();

  return (
    <div
      className='flex cursor-pointer items-center justify-start gap-3 px-2 py-1.5'
      onClick={toggleDarkMode}>
      <label className='relative inline-flex cursor-pointer items-center'>
        <input
          onChange={toggleDarkMode}
          className='sr-only'
          checked={darkMode}
          type='checkbox'
        />
        <div className='h-5 w-8 rounded-full bg-gray-300 transition-colors dark:bg-alpha-violet'></div>
        <span className='absolute h-3 w-3 translate-x-1 transform rounded-full bg-white shadow transition-transform duration-200 ease-in-out dark:translate-x-4' />
      </label>
      <span
        className={clsx(
          'dark:text-white',
          isSidebarCollapsed ? 'hidden' : 'block'
        )}>
        {darkMode ? 'Light mode' : 'Dark mode'}
      </span>
    </div>
  );
};

const UserInfo = () => {
  const { isSidebarCollapsed } = useUI();

  return (
    <div className='flex cursor-pointer items-center justify-start gap-3 px-2 py-1.5 dark:text-white'>
      <div className='h-10 w-10 rounded-full'>
        <img
          className='h-full w-full object-cover'
          src={userPlaceholder}
          alt='User placeholder'
        />
      </div>

      <div className={clsx(isSidebarCollapsed ? 'hidden' : 'block')}>
        <p>Nurudeen Lawal</p>
        <p>nurudeen.devi@gmail.com</p>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const {
    toggleCollapseSidebar,
    isSidebarCollapsed,
    changeActiveTab,
    isSidebarOpen,
    toggleSidebar,
    sidebarWidth,
    activeTab,
    onMobile,
  } = useUI();
  const defaultIconSize = 17;

  const onItemClick = (title) => {
    if (title === 'Collapse') toggleCollapseSidebar();
    else changeActiveTab(title);
  };

  const newTabs = onMobile
    ? tabs.filter((tab) => tab.title !== 'Collapse')
    : tabs;

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-50 h-full transform border-r-2 bg-white p-2 transition-transform duration-300 ease-in-out dark:border-transparent dark:bg-primary-dark',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0'
      )}
      style={{ width: `${sidebarWidth}px` }}
      aria-label='Sidebar'>
      <div className='mb-2 flex w-full items-center justify-between gap-3'>
        <span
          className={clsx(
            'my-2 border-2 border-dotted border-blue-500 bg-blue-200 p-2 font-bold text-blue-500',
            isSidebarCollapsed && 'h-10 w-10'
          )}>
          {isSidebarCollapsed ? '' : 'Full Logo'}
        </span>

        {/* Close button visible on mobile */}
        {!isSidebarCollapsed && (
          <button
            className='flex h-8 w-8 items-center rounded-full border p-1.5 dark:text-white md:hidden'
            aria-label='Close Sidebar'
            onClick={toggleSidebar}>
            <X />
          </button>
        )}
      </div>

      <ul
        className={clsx(
          isSidebarCollapsed ? 'items-center gap-3' : 'items-start gap-2',
          'flex w-full flex-col'
        )}>
        {newTabs.map(({ title, icon }) => (
          <li
            className={clsx(
              'flex w-full cursor-pointer items-center gap-3 rounded px-3 py-2 hover:bg-violet-50 hover:text-alpha-violet dark:text-white dark:hover:bg-alpha-violet dark:hover:text-white',
              activeTab === title
                ? 'bg-violet-50 font-semibold text-alpha-violet dark:bg-alpha-violet dark:text-white'
                : 'bg-transparent',
              isSidebarCollapsed ? 'justify-center' : 'justify-start'
            )}
            title={isSidebarCollapsed ? title : ''}
            onClick={() => onItemClick(title)}
            key={title}>
            {cloneElement(icon, { size: defaultIconSize })}
            <span className={clsx(isSidebarCollapsed ? 'hidden' : 'block')}>
              {title}
            </span>
          </li>
        ))}

        <ThemeToggler />
        <UserInfo />
      </ul>
    </aside>
  );
};

export default Sidebar;
