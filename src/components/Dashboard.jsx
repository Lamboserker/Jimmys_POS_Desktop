import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import axios from "axios";
import dayjs from "dayjs";

import TopBar from "./TopBar/Topbar";
import MainContainer from "./MainContainer/main";
import { DateContext } from "../DateContext";
import { ItemContext } from "../ItemContext";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Snackbar } from "@mui/material";

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [searchReady, setSearchReady] = useState(false);
  const [totalSales, setTotalSales] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const { selectedItems, setSelectedItems } = useContext(ItemContext);
  const { startDate, setStartDate, endDate, setEndDate } =
    useContext(DateContext);

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL, []);

  const checkSearchReady = useCallback(() => {
    if (startDate && endDate) {
      setSearchReady(true);
    } else {
      setSearchReady(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    checkSearchReady();
  }, [checkSearchReady, selectedItems]);

  const fetchInitialData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const defaultStart = dayjs().subtract(3, "days").startOf("day").toDate();
      const response = await axios.post(
        `${apiUrl}/sales/search`,
        {
          startDate: startDate || defaultStart,
          endDate: endDate || new Date(),
          items: selectedItems,
        },
        axiosConfig
      );

      const sanitizedData = response.data.map((sale) => ({
        ...sale,
        price: sale.price ?? 0,
      }));

      setSalesData(sanitizedData);
      setTotalSales(
        sanitizedData.reduce((acc, curr) => acc + (curr.quantity || 0), 0)
      );
    } catch (error) {
      if (!error.response) {
        setAlert({
          open: true,
          severity: "error",
          message: "Internetprobleme des Clients.",
        });
      } else if (error.response.status >= 500) {
        setAlert({
          open: true,
          severity: "error",
          message: "Serverprobleme.",
        });
      } else {
        setAlert({
          open: true,
          severity: "error",
          message: "Fehlerhafte Eingabe.",
        });
      }
      console.error("Error fetching initial sales data:", error);
    }
  }, [apiUrl, startDate, endDate, selectedItems]);

  useEffect(() => {
    if (searchReady) {
      fetchInitialData();
    } else {
      setAlert({
        open: true,
        severity: "warning",
        message: "Unvollständige Eingabe.",
      });
    }
  }, [searchReady, fetchInitialData]);

  const handleDateChange = useCallback(
    (date, type) => {
      if (type === "start") {
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    },
    [setStartDate, setEndDate]
  );

  const handleItemsSelected = useCallback(
    (items) => {
      setSelectedItems(items);
    },
    [setSelectedItems]
  );

  const handleTodayClick = useCallback(() => {
    setEndDate(new Date());
  }, [setEndDate]);

  const handleCloseAlert = useCallback(() => {
    setAlert({ ...alert, open: false });
  }, [alert]);

  return (
    <div>
      <TopBar
        onDateChange={handleDateChange}
        onItemsSelected={handleItemsSelected}
        onTodayClick={handleTodayClick}
      />
      <MainContainer
        salesData={salesData}
        setSalesData={setSalesData}
        selectedItems={selectedItems}
        totalSales={totalSales}
      />
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          <AlertTitle>
            {alert.severity === "error" ? "Error" : "Warnung"}
          </AlertTitle>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Dashboard;
