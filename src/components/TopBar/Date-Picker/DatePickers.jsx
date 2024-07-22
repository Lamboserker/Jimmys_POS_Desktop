import { useCallback, memo } from "react";
import { Container, Box, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import "dayjs/locale/de";
import PropTypes from "prop-types";

const DatePickers = ({ onDateChange }) => {
  const handleDateChange = useCallback(
    (date, type) => {
      onDateChange(date, type);
    },
    [onDateChange]
  );

  const handleTodayClick = useCallback(() => {
    const today = new Date();
    onDateChange(today, "end");
  }, [onDateChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale="de">
      <Box display="flex" alignItems="center">
        <Container sx={{ width: "100%" }}>
          <DatePicker
            onChange={(date) => handleDateChange(date, "start")}
            label="Start-Datum"
            format="DD.MM.YYYY"
            localeText={{ start: "Start-Datum", end: "End-Datum" }}
            sx={{ backgroundColor: "white", borderRadius: 2, marginRight: 2 }}
          />
        </Container>
        <Container sx={{ width: "100%" }}>
          <DatePicker
            onChange={(date) => handleDateChange(date, "end")}
            label="End-Datum"
            format="DD.MM.YYYY"
            localeText={{ start: "Start-Datum", end: "End-Datum" }}
            sx={{ backgroundColor: "white", borderRadius: 2, marginRight: 2 }}
          />
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

DatePickers.propTypes = {
  onDateChange: PropTypes.func.isRequired,
};

const MemoizedDatePickers = memo(DatePickers);
export default MemoizedDatePickers;
