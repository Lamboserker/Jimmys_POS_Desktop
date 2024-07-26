import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

const UserDropdown = ({ onUsersSelected }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const apiUrl = useMemo(() => import.meta.env.VITE_API_URL, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(`${apiUrl}/users`, axiosConfig);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [apiUrl]);

  const handleUserChange = (event) => {
    setSelectedUsers(event.target.value);
    onUsersSelected(event.target.value);
  };

  return (
    <FormControl
      sx={{ width: "15vw", backgroundColor: "white", borderRadius: 2 }}
    >
      <InputLabel id="user-select-label">Users</InputLabel>
      <Select
        labelId="user-select-label"
        multiple
        value={selectedUsers}
        onChange={handleUserChange}
        renderValue={(selected) =>
          selected
            .map((userId) => users.find((user) => user._id === userId)?.name)
            .join(", ")
        }
      >
        {users.map((user) => (
          <MenuItem key={user._id} value={user._id}>
            <Checkbox checked={selectedUsers.indexOf(user._id) > -1} />
            <ListItemText primary={user.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

UserDropdown.propTypes = {
  onUsersSelected: PropTypes.func.isRequired,
};

export default UserDropdown;
