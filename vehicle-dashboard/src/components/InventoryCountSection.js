// src/components/InventoryCountSection.js
import React, { useState } from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Initial data for all types
const allData = {
  NEW: [
    { name: 'Item 1', value: 4000 },
    { name: 'Item 2', value: 3000 },
    { name: 'Item 3', value: 2000 },
  ],
  USED: [
    { name: 'Item 4', value: 2780 },
    { name: 'Item 5', value: 1890 },
    { name: 'Item 6', value: 2390 },
  ],
  CPO: [
    { name: 'Item 7', value: 3490 },
  ],
};

function InventoryCountSection() {
  // State to manage the selected data type and chart data
  const [selectedDataType, setSelectedDataType] = useState('NEW');
  const [data, setData] = useState(allData.NEW);

  // Handle button click to filter the chart data
  const handleFilterClick = (type) => {
    setSelectedDataType(type);
    setData(allData[type]);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Inventory Count
      </Typography>
      <Typography variant="body1" gutterBottom>
        1234 items
      </Typography>

      {/* Buttons to filter data */}
<Box sx={{ marginBottom: 2 }}>
  <Button
    variant={selectedDataType === "NEW" ? "contained" : "outlined"}
    onClick={() => handleFilterClick("NEW")}
    sx={{
      marginRight: 1,
      backgroundColor: selectedDataType === "NEW" ? "#ff9926" : "transparent",
      color: selectedDataType === "NEW" ? "white" : "#ff9926",
      borderColor: "#ff9926",
      "&:hover": { backgroundColor: "#e6801a", borderColor: "#e6801a" },
    }}
  >
    NEW
  </Button>
  <Button
    variant={selectedDataType === "USED" ? "contained" : "outlined"}
    onClick={() => handleFilterClick("USED")}
    sx={{
      marginRight: 1,
      backgroundColor: selectedDataType === "USED" ? "#ff9926" : "transparent",
      color: selectedDataType === "USED" ? "white" : "#ff9926",
      borderColor: "#ff9926",
      "&:hover": { backgroundColor: "#e6801a", borderColor: "#e6801a" },
    }}
  >
    USED
  </Button>
  <Button
    variant={selectedDataType === "CPO" ? "contained" : "outlined"}
    onClick={() => handleFilterClick("CPO")}
    sx={{
      backgroundColor: selectedDataType === "CPO" ? "#ff9926" : "transparent",
      color: selectedDataType === "CPO" ? "white" : "#ff9926",
      borderColor: "#ff9926",
      "&:hover": { backgroundColor: "#e6801a", borderColor: "#e6801a" },
    }}
  >
    CPO
  </Button>
</Box>


      {/* Bar Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#ff9926" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );

}

export default InventoryCountSection;
