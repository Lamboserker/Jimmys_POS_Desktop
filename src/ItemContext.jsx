import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const value = useMemo(
    () => ({ selectedItems, setSelectedItems }),
    [selectedItems]
  );

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
};

ItemProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
