import Image from 'next/image';
import React from 'react'

interface IPatient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  selected?: boolean;
}
const PatientTitle = ({ patient, selected }: { patient: IPatient, selected: boolean }) => {
  return (
  <div className={`flex items-center justify-between gap-4 px-5 py-4 ${selected ? 'selected' : ''}`}>
    <div className='flex items-center gap-3'>
      <Image src={patient.profile_picture} alt={patient.name} style={{height: 48, width: 48, borderRadius: "100%"}} height={48} width={48} />

      <div className='flex flex-col'>
          <h2 className='header m-0!'>{patient.name}</h2>
          <p className='text-sm text-text'>{patient.gender}, {patient.age}</p>
      </div>
    </div>

    <Image src="/more.svg" alt="More" style={{height: 4, width: 18}} height={4} width={18} />
  </div>
  )
}

export default PatientTitle