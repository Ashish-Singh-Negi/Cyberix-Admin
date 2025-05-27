import React, { useEffect } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Legend,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  Legend,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
);

const BarChart = () => {
  const options = {};

  //   const { theme, setTheme } = useTheme();

  //   useEffect(() => {
  //     if (theme === "dark") {
  //       ChartJS.defaults.color = " rgb(249 250 251)";
  //     }
  //     if (theme === "light") {
  //       ChartJS.defaults.color = "rgb(3 7 18)";
  //     }
  //   }, [theme]);

  return (
    <div className="h-[500px] w-full p-4 ">
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          backgroundColor: "rgb(3 7 18)",
        }}
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Revenue",
              data: [
                1200, 2300, 1100, 1000, 2345, 2000, 2800, 900, 1200, 2500, 2400,
                2000,
              ],
              backgroundColor: "rgb(16 185 129)",
            },
          ],
        }}
      />
    </div>
  );
};

export default BarChart;
