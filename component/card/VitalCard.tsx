import Image from 'next/image';
import React from 'react'

interface IVital {
  name: string;
  value: string;
  remarks: string;
  image: string; 
  color: string;
}
const VitalCard = ({ vital }: { vital: IVital }) => {
  return (
    <div style={{ backgroundColor: vital.color, width: "100%", height: 242 }} className='relative! flex flex-col p-4 rounded-lg w-full'>
        <Image src={vital.image} alt={vital.name} width={96} height={96} className='mb-4' />
        <p className='item'>{vital.name}</p>
        <p className='value'>{vital.value}</p>
        <p className='remark absolute bottom-4 flex items-center gap-2'>{vital.name === "Heart Rate" && <Image src="/vitals/ArrowDown.svg" alt="Heart Rate" style={{width: 10, height: 5}} width={10} height={5} />} {vital.remarks}</p>
    </div>
  )
}

export default VitalCard