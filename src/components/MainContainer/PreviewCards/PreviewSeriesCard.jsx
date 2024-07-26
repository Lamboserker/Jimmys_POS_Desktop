import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Modal,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import SyncHighlight from "../Series/Series";
import { ZoomIn, Fullscreen } from "@mui/icons-material";

const PreviewSeriesCard = ({ salesData }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Aufteilung der Verkäufe
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleOpen}>
            <Fullscreen />
          </IconButton>
          <SyncHighlight salesData={salesData} />
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="full-screen-modal-title"
          aria-describedby="full-screen-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 20,
              width: "80%",
              height: "80%",
              borderRadius: 8,
              overflow: "auto",
            }}
          >
            <IconButton
              onClick={handleClose}
              style={{ position: "absolute", right: 10, top: 10 }}
            >
              <ZoomIn />
            </IconButton>
            <SyncHighlight salesData={salesData} />
          </div>
        </Modal>
      </CardContent>
    </Card>
  );
};

PreviewSeriesCard.propTypes = {
  salesData: PropTypes.array.isRequired,
};

export default PreviewSeriesCard;
