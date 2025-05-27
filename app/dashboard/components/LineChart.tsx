// import React, { useEffect } from "react";

// import { Bar, Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Legend,
//   Tooltip,
//   Title,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
// } from "chart.js";

// import { useTheme } from "next-themes";

// ChartJS.register(
//   Legend,
//   Tooltip,
//   Title,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement
// );

// const LineChart = () => {
//   //   const { theme, setTheme } = useTheme();

//   //   useEffect(() => {
//   //     if (theme === "dark") {
//   //       ChartJS.defaults.color = " rgb(249 250 251)";
//   //     }
//   //     if (theme === "light") {
//   //       ChartJS.defaults.color = "rgb(3 7 18)";
//   //     }
//   //   }, [theme]);

//   return (
//     <div className="h-full w-full p-4 ">
//       <Line
//         options={{
//           responsive: true,
//           maintainAspectRatio: false,
//           backgroundColor: "rgb(3 7 18)",
//           scales: {
//             // to remove the labels
//             x: {
//               ticks: {
//                 display: false,
//               },

//               // to remove the x-axis grid
//               grid: {
//                 drawBorder: false,
//                 display: false,
//               },
//             },
//             y: {
//               ticks: {
//                 display: false,
//               },

//               // to remove the x-axis grid
//               grid: {
//                 drawBorder: false,
//                 display: false,
//               },
//             },
//           },
//         }}
//         data={{
//           labels: ["January", "February", "March", "April", "May", "June"],
//           datasets: [
//             {
//               label: "Revenue",
//               data: [1200, 900, 1200, 2500, 900, 2000],
//               borderColor: "rgb(16 185 129)",
//             },
//           ],
//         }}
//       />
//     </div>
//   );
// };

// export default LineChart;
