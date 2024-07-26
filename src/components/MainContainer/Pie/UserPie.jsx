import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import PropTypes from "prop-types";

const UserSalesPie = ({ selectedUsers = [], startDate, endDate }) => {
  const [percentageData, setPercentageData] = useState([]);

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL, []);

  useEffect(() => {
    const fetchPercentageData = async () => {
      try {
        const token = localStorage.getItem("token");
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(
          `${apiUrl}/sales/sales-percentage-by-users`,
          { userIds: selectedUsers, startDate, endDate },
          axiosConfig
        );

        setPercentageData(response.data);
      } catch (error) {
        console.error("Error fetching sales percentage data:", error);
      }
    };

    if (selectedUsers.length > 0) {
      fetchPercentageData();
    }
  }, [apiUrl, selectedUsers, startDate, endDate]);

  const data = percentageData.map((item) => ({
    id: item.user,
    value: parseFloat(item.percentage),
  }));

  if (data.length === 0) {
    return <Typography variant="body1">Keine Daten verfügbar</Typography>;
  }

  return (
    <div>
      <PieChart
        data={data}
        series={[
          {
            dataKey: "value",
            labelKey: "id",
          },
        ]}
        width={400}
        height={400}
      />
    </div>
  );
};

UserSalesPie.propTypes = {
  selectedUsers: PropTypes.array.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default UserSalesPie;
