import { Card, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Pie from "../Pie/Pie";

const PreviewTableCard = ({ salesData, selectedItems }) => {
  return (
    <Card className="h-full overflow-x-auto">
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Detaillierte Verkaufsübersicht
        </Typography>
        <Pie selectedItems={selectedItems} salesData={salesData} />
      </CardContent>
    </Card>
  );
};

PreviewTableCard.propTypes = {
  salesData: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired, // Changed to array
};

export default PreviewTableCard;
