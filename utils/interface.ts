export interface IPatient {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history: IDiagnosisHistory[];
  diagnostic_list: IDiagnostic[];
  lab_results: string[];
  [key: string]: any;
}

export interface IDiagnosisHistory {
  month: string;
  year: number;
  blood_pressure: IBloodPressure;
  heart_rate: IVitalSign;
  respiratory_rate: IVitalSign;
  temperature: IVitalSign;
}

export interface IBloodPressure {
  systolic: IBloodPressureValue;
  diastolic: IBloodPressureValue;
}

export interface IBloodPressureValue {
  value: number;
  levels: string;
}

export interface IVitalSign {
  value: number;
  levels: string;
}

export interface IDiagnostic {
  name: string;
  description: string;
  status: string;
}