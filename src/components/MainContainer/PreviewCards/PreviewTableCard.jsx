import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  Button,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PrintIcon from "@mui/icons-material/Print";
import PropTypes from "prop-types";
import Table from "../Table/Table";
import "../Table/table.css";
import { useState } from "react";

const PreviewTableCard = ({ salesData, setSalesData, selectedItems }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Card className="previewTableCard">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Detaillierte Verkaufsübersicht
            <IconButton onClick={handleOpen} style={{ float: "right" }}>
              <FullscreenIcon />
            </IconButton>
          </Typography>
          <Table
            selectedItems={selectedItems}
            salesData={salesData}
            setSalesData={setSalesData}
            onDelete={() => {}}
          />
        </CardContent>
      </Card>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="full-screen-table"
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Detaillierte Verkaufsübersicht
            <IconButton onClick={handleClose} style={{ float: "right" }}>
              <FullscreenIcon />
            </IconButton>
          </Typography>
          <Button
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            sx={{ margin: 2 }}
            className="no-print"
          >
            Drucken
          </Button>
          <Table
            selectedItems={selectedItems}
            salesData={salesData}
            setSalesData={setSalesData}
            onDelete={() => {}}
          />
        </CardContent>
      </Dialog>
    </>
  );
};

PreviewTableCard.propTypes = {
  salesData: PropTypes.array.isRequired,
  selectedItems: PropTypes.array.isRequired,
  setSalesData: PropTypes.func.isRequired,
};

export default PreviewTableCard;
