import { Menu } from 'lucide-react';
import clsx from 'clsx';

import { useUI } from '../../contexts/UIContext';

const MobileHeader = () => {
  const { isSidebarCollapsed, toggleSidebar } = useUI();

  return (
    <div className='fixed top-0 z-40 flex w-full items-center justify-between gap-3 border-b-4 border-gray-200 bg-white p-4 dark:border-gray-500 dark:bg-primary-dark md:hidden'>
      <span
        className={clsx(
          'border-2 border-dotted border-blue-500 bg-blue-200 p-2 font-bold text-blue-500',
          isSidebarCollapsed && 'h-10 w-10'
        )}>
        {isSidebarCollapsed ? '' : 'Full Logo'}
      </span>

      {/* Close button visible on mobile */}
      <button
        className='flex items-center p-1.5 dark:text-white md:hidden'
        aria-label='Close Sidebar'
        onClick={toggleSidebar}>
        <Menu />
      </button>
    </div>
  );
};

export default MobileHeader;
