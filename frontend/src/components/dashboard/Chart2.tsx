import React from "react";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
const barColors = [
  "#19339b",
  "#19339b",
  "#19339b",
  "#19339b",
] as const;

export const data = {
  labels: ['AI/ML', 'Web Development', 'App Development', 'Blockchain', 'AR/VR', 'IOT', 'Cloud'],
  datasets: [
    {
      label: '# of Participants',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function Chart2() {
  return (
    <Card className="p-2 d-flex align-items-center justify-items-center"
      style={{height: 320}}
    >
      <div 
      >
        <Pie
          options={{
            plugins: {
              legend: {
                display: true,
                position: "right" as const,
              },
              title: {
                display: true,
                text: "Participants by Domain Knowledge",
              },
            },
          }}
          data={data}
        />
      </div>
    </Card>
  );
}

export default Chart2;
