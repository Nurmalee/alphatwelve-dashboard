import { CircleUserRound } from 'lucide-react';
import { cloneElement } from 'react';
import clsx from 'clsx';

import { useUI } from '../../contexts/UIContext';
import { tabs } from '../data/navigation';

const MobileFooter = () => {
  const { changeActiveTab, activeTab } = useUI();
  const defaultIconSize = 25;

  const newTabs = tabs.filter((tab) =>
    ['Home', 'Events', 'Speakers', 'Reports', 'Profile'].includes(tab.title)
  );

  newTabs.push({
    title: 'Profile',
    icon: <CircleUserRound />,
  });

  return (
    <ul className='fixed bottom-0 left-0 z-40 flex w-full items-center justify-between border-t-4 border-gray-200 bg-white px-2 dark:border-gray-500 dark:bg-primary-dark md:hidden'>
      {newTabs.map(({ title, icon }) => (
        <li
          className={clsx(
            'flex flex-col items-center p-3 py-5 dark:text-white',
            activeTab === title &&
              'border-t-4 border-alpha-violet font-semibold text-alpha-violet dark:text-alpha-violet',
            activeTab !== title && 'border-t-4 border-transparent'
          )}
          onClick={() => changeActiveTab(title)}
          key={title}>
          {cloneElement(icon, { size: defaultIconSize })}
          <span>{title}</span>
        </li>
      ))}
    </ul>
  );
};

export default MobileFooter;
