import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import "./table.css";

const createData = (id, date, product, amount, userName) => ({
  id,
  date,
  product,
  amount,
  userName,
});

const Row = ({ row, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(row.id);
    setConfirmOpen(false);
  };

  const formatPrice = useCallback(
    (price) =>
      new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price),
    []
  );

  const formatTime = useCallback((dateTimeStr) => {
    const time = new Date(dateTimeStr);
    return time.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  }, []);

  const getProductTypeName = useCallback((type) => {
    switch (type) {
      case "cocktail":
        return "Cocktails";
      case "alcoholicDrinks":
        return "Alkoholische Getränke";
      case "nonAlcohol":
        return "Alkoholfreie Cocktails";
      case "rest":
        return "Restliche Getränke";
      case "Pfand":
        return "Pfand";
      default:
        return "Unbekannter Typ";
    }
  }, []);

  const formatDate = useCallback((dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }, []);

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {formatDate(row.date)} {formatTime(row.date)}
        </TableCell>
        <TableCell>{row.product.name}</TableCell>
        <TableCell>{row.amount}</TableCell>
        <TableCell>{row.userName}</TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                sx={{ fontWeight: "bold" }}
                variant="h6"
                gutterBottom
                component="div"
              >
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Produkt-ID</TableCell>
                    <TableCell>Produkt-Typ</TableCell>
                    <TableCell align="right">Preis</TableCell>
                    <TableCell align="right">Bild</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.product._id}>
                    <TableCell>{row.product._id}</TableCell>
                    <TableCell>
                      {getProductTypeName(row.product.type)}
                    </TableCell>
                    <TableCell align="right">
                      {formatPrice(row.product.price)}
                    </TableCell>
                    <TableCell
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      <img
                        src={row.product.image}
                        alt={row.product.name}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Bestätigung"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Möchten Sie diesen Verkauf wirklich löschen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Abbrechen</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    amount: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

const CollapsibleTable = ({ salesData, onDelete }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const apiUrl = import.meta.env.VITE_API_URL;
      const userIds = salesData.map((sale) => sale.user);
      const uniqueUserIds = [...new Set(userIds)];
      const response = await axios.post(`${apiUrl}/users/usernames`, {
        userIds: uniqueUserIds,
      });
      const usernames = response.data;

      const usernameMap = usernames.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {});

      const newRows = salesData.map((sale) =>
        createData(
          sale._id,
          sale.date,
          sale.product,
          sale.amount,
          usernameMap[sale.user] || "Unbekannt"
        )
      );

      setRows(newRows);
    };

    if (salesData.length > 0) {
      fetchUsernames();
    }
  }, [salesData]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const memoizedRows = useMemo(() => {
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: "bold" }}>Datum</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Produkt Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Anzahl</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Benutzer</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Aktion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {memoizedRows.map((row) => (
            <Row key={row.id} row={row} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Zeilen pro Seite:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} von ${count !== -1 ? count : `mehr als ${to}`}`
        }
        backiconbuttontext="Vorherige Seite"
        nexticonbuttontext="Nächste Seite"
        className="no-print"
      />
    </TableContainer>
  );
};

CollapsibleTable.propTypes = {
  salesData: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CollapsibleTable;
