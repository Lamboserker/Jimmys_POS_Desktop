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
  const [selectedUsers, setSelectedUsers] = useState([]);

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
          startDate: startDate
            ? dayjs(startDate).format()
            : dayjs(defaultStart).format(),
          endDate: endDate ? dayjs(endDate).format() : dayjs().format(),
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

  const fetchSalesByUsers = useCallback(async () => {
    if (!selectedUsers.length) return;

    try {
      const token = localStorage.getItem("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${apiUrl}/sales/filter-by-users`,
        {
          userIds: selectedUsers,
          startDate: startDate ? dayjs(startDate).format() : undefined,
          endDate: endDate ? dayjs(endDate).format() : undefined,
        },
        axiosConfig
      );

      const sanitizedData = response.data.map((sale) => ({
        ...sale,
        price: sale.price ?? 0,
      }));

      if (sanitizedData.length === 0) {
        setAlert({
          open: true,
          severity: "warning",
          message:
            "Keine Verkäufe für die ausgewählten Benutzer im angegebenen Zeitraum gefunden.",
        });
      }

      setSalesData(sanitizedData);
      setTotalSales(
        sanitizedData.reduce((acc, curr) => acc + (curr.quantity || 0), 0)
      );
    } catch (error) {
      console.error("Error fetching sales by users:", error);
      setAlert({
        open: true,
        severity: "error",
        message: "Fehler beim Abrufen der Verkäufe nach Benutzern.",
      });
    }
  }, [apiUrl, selectedUsers, startDate, endDate]);

  useEffect(() => {
    if ((startDate && endDate) || (!startDate && !endDate)) {
      if (searchReady) {
        fetchInitialData();
      }
    } else {
      setAlert({
        open: true,
        severity: "warning",
        message:
          "Unvollständige Eingabe. Bitte wählen Sie sowohl Start- als auch Enddatum.",
      });
    }
  }, [searchReady, startDate, endDate, fetchInitialData]);

  useEffect(() => {
    fetchSalesByUsers();
  }, [fetchSalesByUsers]);

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

  const handleUsersSelected = useCallback((userIds) => {
    setSelectedUsers(userIds);
  }, []);

  const handleTodayClick = useCallback(() => {
    setEndDate(new Date());
  }, [setEndDate]);

  const handleCloseAlert = useCallback(() => {
    setAlert({ ...alert, open: false });
  }, [alert]);

  return (
    <div className="max-w-screen  overflow-hidden">
      <TopBar
        onDateChange={handleDateChange}
        onItemsSelected={handleItemsSelected}
        onUsersSelected={handleUsersSelected}
      />
      <MainContainer
        salesData={salesData}
        setSalesData={setSalesData}
        selectedItems={selectedItems}
        totalSales={totalSales}
        selectedUsers={selectedUsers}
        startDate={startDate ? dayjs(startDate).format() : undefined}
        endDate={endDate ? dayjs(endDate).format() : undefined}
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
