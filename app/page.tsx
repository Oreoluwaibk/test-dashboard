"use client"
import PatientTitle from "@/component/card/PatientTitle";
import VitalCard from "@/component/card/VitalCard";
import Container from "@/component/containers/Container";
import BloodPressureChart from "@/component/graph/BloodPressureGraph";
import { IPatient } from "@/utils/interface";
import { App, Button, Col, Row, Table } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPatientData } from "./api/patient";

const infoList: { info: string; slug: keyof IPatient; icon: string }[] = [
  {info: "Date of Birth", icon: "/patient/BirthIcon.svg", slug: "date_of_birth"},
  {info: "Gender", icon: "/patient/FemaleIcon.svg", slug: "gender"},
  {info: "Contact Info", icon: "/patient/PhoneIcon.svg", slug: "phone_number"},
  {info: "Emergency Contacts", icon: "/patient/PhoneIcon.svg", slug: "emergency_contact"},
  {info: "Insurance Provider", icon: "/patient/InsuranceIcon.svg", slug: "insurance_type"}
]

const columns = [
  {
    title: 'Problem/Diagnosis',
    dataIndex: 'name',
    key: 'problem',
    width: '30%',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    width: '50%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: '20%',
  },
];
export default function Home() {
  const { modal } = App.useApp();
  const [ loading, setLoading] = useState(false);
  const [ patients, setPatients] = useState<IPatient[]>([]);
  const [ selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const [ selectedMonth, setSelectedMonth] = useState({
    "month": "March",
    "year": 2024,
    "blood_pressure": {
      "systolic": {
        "value": 160,
        "levels": "Higher than Average"
      },
      "diastolic": {
        "value": 78,
        "levels": "Lower than Average"
      }
    },
    "heart_rate": {
      "value": 78,
      "levels": "Lower than Average"
    },
    "respiratory_rate": {
      "value": 20,
      "levels": "Normal"
    },
    "temperature": {
      "value": 98.6,
      "levels": "Normal"
    }
  });

  useEffect(() => {
    handleGetPatientData();
  }, []);

  const handleGetPatientData = () => {
  setLoading(true);
  getPatientData()
    .then(res => {
      if (res.status === 200) {
        const allPatients = res.data;
        setPatients(allPatients);
        const jessica = allPatients.find((p:any) => p.name === "Jessica Taylor");
        const initialPatient = jessica || allPatients[0];

        setSelectedPatient(initialPatient);
        if (initialPatient?.diagnosis_history?.length > 0) {
          setSelectedMonth(initialPatient.diagnosis_history[0]);
        }
      }
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      modal.error({
        title: "Error Fetching Patient Data",
        content: err?.response?.data?.message || err?.message || "An error occurred.",
      });
    });
};
  return (
  <Container active="Patients">
    {loading ? (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">Loading patient data...</p>
      </div>
    ) : null}
    {!loading && <Row gutter={[32, 32]} className="m-0! bg-primary!">
      <Col md={12} lg={6} className="bg-background">
        <div className="rounded-[18px] bg-white! flex flex-col">
          <div className="flex items-center justify-between px-5 pt-4">
            <p className="title">Patients</p>

            <Image src="/search.svg" alt="Patients" className="cursor-pointer h-4.5 w-4.5" width={18} height={18} />
          </div>

          <Row gutter={[32, 32]} className="mt-10! h-250 overflow-y-scroll no-scrollbar">
            {patients.map((patient) => (
              <Col span={24} key={patient.phone_number} onClick={() => {
                setSelectedPatient(patient);
                setSelectedMonth(patient.diagnosis_history[0]);
              }}>
                <PatientTitle 
                  patient={patient} 
                  selected={selectedPatient?.phone_number === patient.phone_number} 
                />
              </Col>
            ))}
          </Row>
        </div>
      </Col>

      <Col  md={12} lg={12} className="bg-background">
        <Row gutter={[32, 32]} className="">
          <Col lg={24} sm={24} xs={24} className="bg-white rounded-[18px] p-5">
            <div className="flex items-center justify-between">
              <p className="title">Diagnosis History</p>
            </div>

            <Row gutter={[5, 5]} className="mt-4!">
              <Col lg={24} sm={24} xs={24}>
                <BloodPressureChart bloodPressure={selectedPatient?.diagnosis_history[0]?.blood_pressure} />
              </Col>
            </Row>

            <Row gutter={[16, 16]} className="mt-10!">
             <Col lg={8} sm={8} xs={8}>
              <VitalCard 
                vital={{
                  name: "Respiratory Rate",
                  value: `${selectedMonth.respiratory_rate.value} bpm`,
                  remarks: selectedMonth.respiratory_rate.levels,
                  image: "/vitals/respiratory.svg",
                  color: "#E0F3FA"
                }}
              />
             </Col>

             <Col lg={8} sm={8} xs={8}>
              <VitalCard 
                vital={{
                  name: "Temperature",
                  value: `${selectedMonth.temperature.value} °F`,
                  remarks: selectedMonth.temperature.levels,
                  image: "/vitals/temperature.svg",
                  color: "#FFE6E9"
                }}
              />
             </Col>

             <Col lg={8} sm={8} xs={8}>
              <VitalCard 
                vital={{
                  name: "Heart Rate",
                  value: `${selectedMonth.heart_rate.value} bpm`,
                  remarks: selectedMonth.heart_rate.levels,
                  image: "/vitals/heartBPM.svg",
                  color: "#FFE6F1"
                }}
              />
             </Col>
            </Row>


          </Col>

          <Col lg={24} sm={24} xs={24} className="bg-white rounded-[18px] p-5">
            <div className="flex items-center justify-between mb-10">
              <p className="title">Diagnosis List</p>
            </div>

            <Table
              columns={columns}
              dataSource={selectedPatient?.diagnostic_list}
              pagination={false}
              scroll={{ y: 250 }}
              className="custom-antd-table min-h-81"
            />
          </Col>
        </Row>

      </Col>

      <Col md={12} lg={6} className="bg-primary!">
        <Row gutter={[32, 32]} className="m-0!">
          <Col span={24} className="bg-white p-5! rounded-[18px]">
            {selectedPatient && (
              <div className="flex flex-col items-center">
                <div className="flex flex-col items-center gap-6">
                  <Image src={selectedPatient.profile_picture} alt={selectedPatient.name} style={{height: 200, width: 200, borderRadius: "100%"}} height={200} width={200} />

                  <h2 className="title">{selectedPatient.name}</h2>
                </div>

                <Row gutter={[24, 24]} className="mt-8! mb-10!">
                  {infoList.map((info) => (
                    <Col span={24} key={info.info}>
                      <div className="flex items-center gap-3">
                        <Image src={info.icon} alt={info.info} width={42} height={42} className="h-10.5 w-10.5" />
                        <div className="flex flex-col">
                          <p className="text-sm text-input">{info.info}</p>
                          <p className="header">{selectedPatient[info.slug] || ""}</p>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>

                <Button type="primary"  className="mt-5! h-10.25! w-55! bg-secondary! text-header! font-bold! p-2.75! rounded-[41px]!">Show All Information</Button>
              </div>
            )}
          </Col>

          <Col lg={24} sm={24} xs={24} className="bg-white p-5! rounded-[18px] h-74">
            <div className="flex items-center justify-between">
              <p className="title">Lab Results</p>
            </div>

            <Row gutter={[5, 5]} className="mt-4! h-50 overflow-y-scroll">
              {selectedPatient?.lab_results.map((result, i) => (
                <Col span={24} key={i} className="flex! items-center justify-between py-2! px-4! hover:bg-primary!">
                  <p>{result}</p>
                  <Image src="/patient/download.svg" height={20} width={20} alt="download" style={{height: 20, width: 20}} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>}
  </Container>
  );
}
