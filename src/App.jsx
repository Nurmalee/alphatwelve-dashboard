import EventsHistory from './components/events-history';
import MobileFooter from './components/mobile-footer';
import MobileHeader from './components/mobile-header';
import Statistics from './components/statistics';
import { useUI } from '../contexts/UIContext';
import Sidebar from './components/sidebar';
import Updates from './components/updates';

function App() {
  const { sidebarWidth, onMobile } = useUI();

  return (
    <div className='relative h-screen bg-white dark:bg-[#38343F]'>
      <Sidebar />
      <MobileHeader />
      <MobileFooter />
      <div
        className='dark:bg-base-dark flex min-h-full flex-col gap-6 bg-white p-4 pb-32 pt-24 md:p-8'
        style={{
          width: onMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
          marginLeft: onMobile ? '0' : `${sidebarWidth}px`,
        }}>
        <Statistics />
        <Updates />
        <EventsHistory />
      </div>
    </div>
  );
}

export default App;
