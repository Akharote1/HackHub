import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const barColors = [
  "#19339b",
  "#19339b",
  "#19339b",
  "#19339b",
] as const;

export const options = {
  backgroundColor: barColors,
  barThickness: 20,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gender Ratio",
    },
  },
};

var data = {
  labels: ["Male", "Female", "Other", "Unknown"],
  data: [
    {
      data: [255, 195, 63, 50],
    },
  ],
};

function Chart1({statistics}) {
  return (
    <Card className="p-2 w-100" style={{height: 320}}>
      <Bar
        className="w-100"
        options={options}
        data={{ labels: data.labels, datasets: [
          {
            data: [
              statistics.gender_counts.male,
              statistics.gender_counts.female,
              statistics.gender_counts.other,
              statistics.gender_counts.unknown,
            ]
          }
        ] }}
      />
    </Card>
  );
}

export default Chart1;
