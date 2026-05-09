"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import Image from 'next/image';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface BloodPressureChartProps {
  bloodPressure?: {
    systolic: { value: number; levels: string };
    diastolic: { value: number; levels: string };
  }
}

const BloodPressureChart: React.FC<BloodPressureChartProps> = ({ bloodPressure }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // We build the legend manually to match the UI
    },
    scales: {
      y: {
        min: 60,
        max: 180,
        ticks: { stepSize: 20, color: '#072635' },
        grid: { color: '#CBCAD3' },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: { color: '#072635' }
      }
    },
    elements: {
      line: {
        tension: 0.4, // This creates the smooth "S" curves
        borderWidth: 2,
        cubicInterpolationMode: 'monotone' as const
      },
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF'
      }
    }
  };

  const data = {
    labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
    datasets: [
      {
        label: 'Systolic',
        data: [120, 118, 160, 110, 150, 158],
        borderColor: '#C26EB4', // Pink
        backgroundColor: '#E66FD2',
      },
      {
        label: 'Diastolic',
        data: [110, 65, 108, 90, 70, 78],
        borderColor: '#7E6CAB', // Purple
        backgroundColor: '#8C6FE6',
      }
    ]
  };

  return (
    <div style={{ backgroundColor: '#F4F0FF', padding: '24px', borderRadius: '16px', display: 'flex', gap: '24px' }}>
      {/* Chart Section */}
      <div style={{flex: 2.5}} >
        <div className='flex items-center justify-between mb-1'>
          <p className='header text-lg!'>Blood Pressure</p>
          <span className='flex items-center gap-3 text-[#072635] text-sm'>Last 6 months <Image src="/vitals/expand.svg" height={12} width={12} alt='arrow down' /></span>
        </div>
        <div style={{ height: '250px' }}>
          <Line options={options} data={data} />
        </div>
      </div>

      {/* Stats Section (Manual UI) */}
      <div style={{ flex: 1, borderLeft: '1px solid #CBCAD3', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#E66FD2' }}></span>
            <p className='sys'>Systolic</p>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>{bloodPressure?.systolic.value}</div>
          <div className='higher flex items-center gap-2'><Image src={`/vitals/${bloodPressure?.systolic.levels === "Higher than Average" ? "ArrowUp" : "ArrowDown"}.svg`} height={12} width={12} alt='arrow down' /> {bloodPressure?.systolic.levels}</div>
        </div>
        
        <hr style={{ border: 'none', borderTop: '1px solid #CBCAD3' }} />

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#8C6FE6' }}></span>
            <p className='sys'>Diastolic</p>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0' }}>{bloodPressure?.diastolic.value}</div>
          <div className='higher flex items-center gap-2'><Image src={`/vitals/${bloodPressure?.diastolic.levels === "Higher than Average" ? "ArrowUp" : "ArrowDown"}.svg`} height={12} width={12} alt='arrow down' /> {bloodPressure?.diastolic.levels}</div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressureChart;