import React, { useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

const ActionButtonsCard = () => {
  const handleButtonClick = useCallback((buttonId) => {
    alert(`Button ${buttonId} Clicked`);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Action Buttons
        </Typography>
        <CardActions>
          <Button onClick={() => handleButtonClick("1")} size="small">
            Button 1
          </Button>
          <Button onClick={() => handleButtonClick("2")} size="small">
            Button 2
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ActionButtonsCard;
