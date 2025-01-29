// src/components/HistoryLogSection.js
import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const historyData = [
  { id: 1, action: 'Item added', date: '04/01/24' },
  { id: 2, action: 'Item removed', date: '04/02/24' },
  { id: 3, action: 'Item updated', date: '04/03/24' },
  { id: 4, action: 'Item added', date: '04/04/24' },
  { id: 5, action: 'Item removed', date: '04/05/24' },
];

function HistoryLogSection() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        History Log
      </Typography>

      {/* Table displaying the history log */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="history log table">
          <TableHead>
            <TableRow>
              <TableCell>Action</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.action}</TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default HistoryLogSection;
