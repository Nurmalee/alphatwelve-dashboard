import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

import { useUI } from '../../contexts/UIContext';

const RegistrationsChart = () => {
  const { darkMode } = useUI();

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        data: [700, 950, 785, 420, 1000, 580, 820, 390, 820, 625, 980, 600],
        backgroundColor: '#8576ff',
        label: 'Registrations',
      },
    ],
  };

  const gridColor = darkMode
    ? 'rgba(255, 255, 255, 0.2)'
    : 'rgba(0, 0, 0, 0.1)';

  const labelColor = darkMode ? 'white' : 'black';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: labelColor,
        },
      },
      y: {
        grid: {
          color: gridColor,
        },
        ticks: {
          color: labelColor,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: labelColor,
        },
      },
    },
  };

  return (
    <div className='h-full p-2 md:p-5 lg:p-7'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RegistrationsChart;
