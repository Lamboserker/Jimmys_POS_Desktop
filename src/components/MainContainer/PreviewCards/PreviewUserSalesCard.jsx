import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import UserSalesPie from "../Pie/UserPie"; // Import der UserSalesPie-Komponente
import PropTypes from "prop-types";

const PreviewUserSalesPieCard = ({ selectedUsers, startDate, endDate }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Prozentualer Anteil der Verkäufe nach Benutzern
        </Typography>
        <UserSalesPie
          selectedUsers={selectedUsers}
          startDate={startDate}
          endDate={endDate}
        />
      </CardContent>
    </Card>
  );
};

PreviewUserSalesPieCard.propTypes = {
  selectedUsers: PropTypes.array.isRequired,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default PreviewUserSalesPieCard;
