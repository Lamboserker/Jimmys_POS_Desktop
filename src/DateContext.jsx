import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const value = useMemo(
    () => ({
      startDate,
      setStartDate,
      endDate,
      setEndDate,
    }),
    [startDate, endDate]
  );

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

DateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
