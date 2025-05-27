import React from "react";

import { Pie } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Legend,
  Tooltip,
  PointElement,
  Title,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Legend,
  Tooltip,
  Title,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale
);

const PieChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="h-[500px] w-full p-4">
      <Pie
        options={options}
        data={{
          labels: [
            "Mobile",
            "Laptop",
            "Mouse",
            "CPU",
            "Graphic Card",
            "Headphones",
          ],
          datasets: [
            {
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
};

export default PieChart;
