import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

import Slide1 from '../assets/news-slide-1.png';
import Slide2 from '../assets/news-slide-2.png';
import Slide3 from '../assets/news-slide-3.png';

const news = [
  {
    image: Slide1,
    content:
      'Romnis velit possimus quam. Nam vel quasi aperiam doloribus fugiat repellat maiores dolor dicta voluptates facilis reprehenderit, ea mollitia libero eum magnam, ipsa suscipit eligendi autem atque, laborum vitae temporibus odit facere? Laborum in delectus praesentium.',
  },
  {
    image: Slide2,
    content:
      'Omnis velit possimus quam. Nam vel quasi aperiam doloribus fugiat repellat maiores dolor dicta voluptates facilis reprehenderit, ea mollitia libero eum magnam, ipsa suscipit eligendi autem atque, laborum vitae temporibus odit facere? Laborum in delectus praesentium.',
  },
  {
    image: Slide3,
    content:
      'Tomnis velit possimus quam. Nam vel quasi aperiam doloribus fugiat repellat maiores dolor dicta voluptates facilis reprehenderit, ea mollitia libero eum magnam, ipsa suscipit eligendi autem atque, laborum vitae temporibus odit facere? Laborum in delectus praesentium.',
  },
];

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  // Auto-slide effect for testimonials
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    }, 10000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Handlers for manual slider controls
  const nextSlide = () => {
    setAnimate(true);
    setCurrentIndex((currentIndex + 1) % news.length);
  };

  const prevSlide = () => {
    setAnimate(true);
    setCurrentIndex((currentIndex - 1 + news.length) % news.length);
  };

  // Reset animation state after the transition
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(false);
    }, 300); // Match this duration with the CSS transition duration

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div
      className='relative flex h-full w-full flex-col justify-end rounded bg-cover bg-no-repeat'
      style={{ backgroundImage: `url(${news[currentIndex].image})` }}>
      <div
        className={clsx(
          'm-3 rounded bg-black bg-opacity-20 p-2 transition-all duration-300 ease-in-out',
          animate
            ? 'translate-y-4 transform opacity-0'
            : 'translate-y-0 opacity-100'
        )}>
        <h2 className='mb-3 text-left font-semibold text-white'>
          Latest News & Updates
        </h2>
        <p className='text-left text-sm text-white'>
          {news[currentIndex].content}
        </p>
      </div>

      <div className='mb-4 flex justify-center gap-1'>
        {news.map((_, idx) => (
          <div
            className={clsx(
              'h-0.5 w-4 cursor-pointer',
              idx === currentIndex ? 'bg-white' : 'bg-gray-500'
            )}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to news ${idx + 1}`}
            key={idx}
          />
        ))}
      </div>

      {/* Slider Controls for navigation */}
      <div className='absolute inset-0 flex items-center justify-between p-3'>
        <button
          className='rounded-full bg-white p-0.5 text-3xl text-black focus:outline-none'
          aria-label='Previous News'
          onClick={prevSlide}>
          <ChevronLeft size={20} />
        </button>
        <button
          className='rounded-full bg-white p-0.5 text-3xl text-black focus:outline-none'
          aria-label='Next News'
          onClick={nextSlide}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default NewsSlider;
