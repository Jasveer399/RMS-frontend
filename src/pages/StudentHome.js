import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import StudentNavBar from "../components/StudentNavBar";
import DefaultLayout from "../components/DefaultLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar, Pie} from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudentHome = () => {
  const options = {
    
  }
  const data = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4'],
    datasets: [
      {
        label: 'Mathematics',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [80, 65, 75, 90],
      },
      {
        label: 'Science',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.7)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: [70, 85, 60, 75],
      },
    ],
  };
  const pieData = {
    labels: ['Test 1', 'Test 2', 'Test 3', 'Test 4', ],
    datasets: [
      {
        label: 'Demo Dataset',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };

  // Options for the pie chart
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Ensures the chart maintains its aspect ratio
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <div className="d-flex flex-col">
        <StudentNavBar className='flex-grow-1'></StudentNavBar>  
        <div className="chart-container" style={{ width: '45%', height: '500px', display:'inline' }}>
          <Bar data={data} options={options} />
        </div>
        <div className="chart-container" style={{ width: '45%', height: '400px', display:'inline' }}>
        <Pie data={pieData} options={pieOptions} />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default StudentHome
