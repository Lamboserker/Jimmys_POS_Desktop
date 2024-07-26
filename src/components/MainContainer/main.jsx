import React, { memo, useMemo } from "react";
import { Grid, Container, Box } from "@mui/material";
import PreviewTableCard from "./PreviewCards/PreviewTableCard";
import PreviewSeriesCard from "./PreviewCards/PreviewSeriesCard";
import PreviewPie from "./PreviewCards/PreviewPieCard";
import PropTypes from "prop-types";
import PreviewUserSalesPieCard from "./PreviewCards/PreviewUserSalesCard";

const MainContainer = ({
  salesData = [],
  setSalesData,
  selectedItems = [],
  totalSales = 0,
  selectedUsers = [],
  startDate,
  endDate,
}) => {
  const memoizedSalesData = useMemo(() => salesData, [salesData]);
  const memoizedSelectedItems = useMemo(() => selectedItems, [selectedItems]);
  const memoizedTotalSales = useMemo(() => totalSales, [totalSales]);

  return (
    <Box
      sx={{
        width: "100vw",
        marginTop: "64px", // Hier wird sichergestellt, dass die Tabelle nicht von der TopBar verdeckt wird
        background: "#233142",
        padding: 2,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Container sx={{ maxWidth: "100%" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <PreviewTableCard
              salesData={memoizedSalesData}
              setSalesData={setSalesData}
              selectedItems={memoizedSelectedItems}
            />
          </Grid>
          <Grid item xs={12}>
            <PreviewSeriesCard
              salesData={memoizedSalesData}
              totalSales={memoizedTotalSales}
            />
          </Grid>
          <Grid item xs={12}>
            <PreviewUserSalesPieCard
              selectedUsers={selectedUsers}
              startDate={startDate}
              endDate={endDate}
            />
          </Grid>
          <Grid item xs={12}>
            <PreviewPie totalSales={memoizedTotalSales} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

MainContainer.propTypes = {
  salesData: PropTypes.array.isRequired,
  setSalesData: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  totalSales: PropTypes.number.isRequired,
  selectedUsers: PropTypes.array,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default memo(MainContainer);
