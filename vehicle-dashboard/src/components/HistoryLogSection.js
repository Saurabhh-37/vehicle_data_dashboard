import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';

function HistoryLogSection() {
  const [historyData, setHistoryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchHistoryLog = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/inventory/history-log');
        const data = await response.json();
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching history log:', error);
      }
    };

    fetchHistoryLog();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayedRows = historyData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        History Log
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="history log table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>New Inventory</TableCell>
              <TableCell>New Total MSRP</TableCell>
              <TableCell>New Average MSRP</TableCell>
              <TableCell>Used Inventory</TableCell>
              <TableCell>Used Total MSRP</TableCell>
              <TableCell>Used Average MSRP</TableCell>
              <TableCell>CPO Inventory</TableCell>
              <TableCell>CPO Total MSRP</TableCell>
              <TableCell>CPO Average MSRP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.period}</TableCell>
                <TableCell>{row.new.count}</TableCell>
                <TableCell>{row.new.totalMSRP}</TableCell>
                <TableCell>{row.new.averageMSRP}</TableCell>
                <TableCell>{row.used.count}</TableCell>
                <TableCell>{row.used.totalMSRP}</TableCell>
                <TableCell>{row.used.averageMSRP}</TableCell>
                <TableCell>{row.cpo.count}</TableCell>
                <TableCell>{row.cpo.totalMSRP}</TableCell>
                <TableCell>{row.cpo.averageMSRP}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={historyData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}

export default HistoryLogSection;