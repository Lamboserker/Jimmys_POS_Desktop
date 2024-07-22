import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import Table from "../Table/Table"; // Hier importiere ich die Table-Komponente, die eigentlich CollapsibleTable ist

const PreviewTableCard = ({ salesData, setSalesData, selectedItems }) => {
  const handleDelete = async (id) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.delete(
        `${apiUrl}/sales/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Aktualisiere die salesData nach dem Löschen
      setSalesData((prevData) => prevData.filter((sale) => sale._id !== id));
    } catch (error) {
      console.error("Fehler beim Löschen des Verkaufs:", error);
    }
  };

  return (
    <Card className="h-full overflow-x-auto">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Detaillierte Verkaufsübersicht
        </Typography>
        <Table
          selectedItems={selectedItems}
          salesData={salesData}
          setSalesData={setSalesData} // Added setSalesData prop
          onDelete={handleDelete} // Hier wird die handleDelete-Funktion als Prop übergeben
        />
      </CardContent>
    </Card>
  );
};

PreviewTableCard.propTypes = {
  salesData: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired, // Changed to array
  setSalesData: PropTypes.func.isRequired, // Added setSalesData prop
};

export default PreviewTableCard;
