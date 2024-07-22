import * as React from "react";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

import PropTypes from "prop-types";

export default function SyncHighlight({ salesData }) {
  SyncHighlight.propTypes = {
    salesData: PropTypes.array.isRequired,
  };
  const [highlightedItem, setHighLightedItem] = React.useState(null);

  // Transform salesData into the format needed for the charts
  const transformedData = transformSalesData(salesData);

  const barChartsProps = {
    series: [
      {
        data: transformedData.barData,
        id: "sync",
        highlightScope: { highlighted: "item", faded: "global" },
      },
    ],
    xAxis: [{ scaleType: "band", data: transformedData.labels }],
    height: 400,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  const pieChartProps = {
    series: [
      {
        id: "sync",
        data: transformedData.pieData,
        highlightScope: { highlighted: "item", faded: "global" },
      },
    ],
    height: 400,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  return (
    <Stack
      direction={{ xs: "column", xl: "row" }}
      spacing={1}
      sx={{ width: "100%" }}
    >
      <BarChart
        {...barChartsProps}
        highlightedItem={highlightedItem}
        onHighlightChange={setHighLightedItem}
      />
      <PieChart
        {...pieChartProps}
        highlightedItem={highlightedItem}
        onHighlightChange={setHighLightedItem}
      />
    </Stack>
  );
}

function transformSalesData(salesData) {
  // Group data by product name and calculate total sales amount for each product
  const productSales = salesData.reduce((acc, sale) => {
    const productName = sale.product.name;
    if (!acc[productName]) {
      acc[productName] = 0;
    }
    acc[productName] += sale.amount;
    return acc;
  }, {});

  // Prepare data for BarChart and PieChart
  const labels = Object.keys(productSales);
  const barData = labels.map((label) => productSales[label]);
  const pieData = labels.map((label) => ({
    value: productSales[label],
    label: label,
    id: label,
  }));

  return { labels, barData, pieData };
}
