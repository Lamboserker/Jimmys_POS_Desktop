import { useEffect, useState, useCallback, useMemo, memo } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

const ComboBox = ({ onItemsSelected }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!apiUrl) {
          console.error("API_URL ist nicht richtig konfiguriert:", apiUrl);
          return;
        }

        const response = await axios.get(`${apiUrl}/items`);
        const data = response.data;

        if (
          Array.isArray(data) &&
          data.length > 0 &&
          data[0].name &&
          data[0]._id
        ) {
          const formattedData = data.map((item) => ({
            label: item.name,
            value: item._id,
          }));

          setItems(formattedData);
        } else {
          console.error("Ungültige Datenstruktur von der API erhalten:", data);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Items:", error);
      }
    };

    fetchItems();
  }, [apiUrl]);

  const handleChange = useCallback(
    (event, value) => {
      setSelectedItems(value); // Set the selected items
      onItemsSelected(value.map((item) => item.value)); // Pass IDs to parent component
    },
    [onItemsSelected]
  );

  const renderOption = useCallback(
    ({ key, ...props }, option) => (
      <Box
        component="li"
        sx={{ display: "flex", alignItems: "center" }}
        key={option.value}
        {...props}
      >
        <Typography variant="body1">{option.label}</Typography>
      </Box>
    ),
    []
  );

  const memoizedItems = useMemo(() => items, [items]);

  return (
    <Autocomplete
      multiple
      disablePortal
      id="combo-box-demo"
      options={memoizedItems}
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      value={selectedItems} // Ensure selected items are controlled
      sx={{
        height: "auto",
        width: "60vw",
        backgroundColor: "white",
        borderRadius: 2,
      }}
      renderOption={renderOption}
      renderInput={(params) => <TextField {...params} label="Cocktail" />}
    />
  );
};

ComboBox.propTypes = {
  onItemsSelected: PropTypes.func.isRequired,
};

const MemoizedComboBox = memo(ComboBox);
export default MemoizedComboBox;
