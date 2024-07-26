import React, { useState } from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DatePickers from "./Date-Picker/DatePickers";
import ComboBox from "./Searchbar/SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/Sidebar";
import PropTypes from "prop-types";
import UserDropdown from "./UserDropdown/UserDropdown"; // Import der neuen Komponente

const TopBarContainer = styled("div")({
  display: "flex",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 10,
  background: "#00204a",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "10px 20px",
  justifyContent: "space-between",
  alignItems: "center",
  height: "64px",
  padding: "20px",
});

const TopBarItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginRight: "20px",
  height: "100%",
});

const SearchBarContainer = styled(Box)({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "100%",
});

const TopBar = ({ onDateChange, onItemsSelected, onUsersSelected }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleDateChange = (date, type) => {
    onDateChange(date, type);
  };

  const handleItemsSelected = (items) => {
    onItemsSelected(items);
  };

  return (
    <TopBarContainer>
      <TopBarItem sx={{ height: "64px" }}>
        <Button
          onClick={openSidebar}
          sx={{
            color: "white",
            ":hover": { backgroundColor: "", color: "white" },
            height: "100%",
            width: "100%",
          }}
        >
          <MenuIcon sx={{ fontSize: "50px", borderRadius: "10%" }} />
        </Button>
      </TopBarItem>
      <TopBarItem sx={{ height: "100%" }}>
        <DatePickers onDateChange={handleDateChange} />
      </TopBarItem>
      <TopBarItem sx={{ height: "100%" }}>
        <UserDropdown onUsersSelected={onUsersSelected} />
      </TopBarItem>
      <SearchBarContainer sx={{ height: "100%" }}>
        <ComboBox onItemsSelected={handleItemsSelected} />
      </SearchBarContainer>
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
    </TopBarContainer>
  );
};

TopBar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onItemsSelected: PropTypes.func.isRequired,
  onUsersSelected: PropTypes.func.isRequired,
};

export default TopBar;
