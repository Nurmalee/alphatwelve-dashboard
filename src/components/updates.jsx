import RegistrationsChart from './registrations-chart';
import NewsSlider from './latest-news';

const Updates = () => {
  return (
    <div>
      <h1 className='mb-2 text-lg font-semibold dark:text-white md:text-xl'>
        Event Registrations per Month
      </h1>
      <div className='flex flex-col gap-4 lg:grid lg:grid-cols-2'>
        <div className='h-[300px] rounded border-2 border-gray-200 bg-white dark:border-transparent dark:bg-primary-dark dark:text-white xl:h-[350px]'>
          <RegistrationsChart />
        </div>
        <div
          className={`h-[300px] border border-gray-300 dark:border-transparent xl:h-[350px]`}>
          <NewsSlider />
        </div>
      </div>
    </div>
  );
};

export default Updates;
