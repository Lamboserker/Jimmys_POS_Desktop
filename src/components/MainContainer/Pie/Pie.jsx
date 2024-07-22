// import { useEffect, useState } from "react";
// import axios from "axios";
// import { PieChart } from "@mui/x-charts/PieChart";

// const SalesPieChart = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Definiere eine Palette von Farben
//   const colors = [
//     "#FF6384",
//     "#36A2EB",
//     "#FFCE56",
//     "#4BC0C0",
//     "#9966FF",
//     "#FF9F40",
//     "#66FF99",
//     "#FF6666",
//     "#99CCFF",
//     "#FF99CC",
//     "#CCFF99",
//     "#9999FF",
//   ];

//   useEffect(() => {
//     const fetchData = async () => {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       try {
//         const response = await axios.get(
//           `${apiUrl}/sales/total-sales-by-item`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const totalSales = response.data.reduce(
//           (acc, cur) => acc + cur.totalSales,
//           0
//         );
//         const chartData = response.data.map((item, index) => ({
//           label: item.item,
//           value: ((item.totalSales / totalSales) * 100).toFixed(2), // Prozentualer Anteil, auf zwei Dezimalstellen gerundet
//           color: colors[index % colors.length], // Zuweisen von Farben aus der Palette
//         }));
//         setSalesData(chartData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching sales data:", error);
//         setError("Failed to fetch data");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <PieChart
//         series={[
//           {
//             data: salesData,
//             innerRadius: 38,
//             outerRadius: 110,
//             paddingAngle: 5,
//             cornerRadius: 5,
//             startAngle: -90,
//             endAngle: 180,
//             cx: 150,
//             cy: 150,
//             label: {
//               formatter: (value) => `${value}%`,
//             },
//             itemStyle: {
//               color: (params) => params.dataItem.color, // Verwenden der zugeordneten Farben
//             },
//           },
//         ]}
//         style={{ height: "100%", width: "100%" }}
//       />
//     </div>
//   );
// };

// export default SalesPieChart;
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

const SalesPieChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Definiere eine Palette von Farben mit useMemo, um unnötige Neuberechnungen zu vermeiden
  const colors = useMemo(
    () => [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#66FF99",
      "#FF6666",
      "#99CCFF",
      "#FF99CC",
      "#CCFF99",
      "#9999FF",
    ],
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(
          `${apiUrl}/sales/total-sales-by-item`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const totalSales = response.data.reduce(
          (acc, cur) => acc + cur.totalSales,
          0
        );
        const chartData = response.data.map((item, index) => ({
          label: `${item.item} (${item.totalSales.toFixed(2)}€)`,
          value: ((item.totalSales / totalSales) * 100).toFixed(2), // Prozentualer Anteil, auf zwei Dezimalstellen gerundet
          color: colors[index % colors.length], // Zuweisen von Farben aus der Palette
        }));
        setSalesData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [colors]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <PieChart
        series={[
          {
            data: salesData,
            innerRadius: 21,
            outerRadius: 126,
            paddingAngle: 2,
            cornerRadius: 6,
            startAngle: -360,
            endAngle: 180,
            cx: 150,
            cy: 150,
            label: {
              formatter: (value, params) =>
                `${params.dataItem.label} - ${value}%`,
            },
            itemStyle: {
              color: (params) => params.dataItem.color, // Verwenden der zugeordneten Farben
            },
          },
        ]}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
};

export default SalesPieChart;
