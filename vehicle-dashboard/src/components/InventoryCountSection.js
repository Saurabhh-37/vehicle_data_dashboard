import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from '../redux/filtersSlice';


const API_ENDPOINTS = {
  NEW: "http://localhost:5000/api/inventory/ten-day-count",
  USED: "http://localhost:5000/api/inventory/used-ten-day-count",
  CPO: "http://localhost:5000/api/inventory/cpo-ten-day-count",
};

const InventoryCountSection = () => {
  const [selectedDataType, setSelectedDataType] = useState("NEW");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const filters = useSelector(selectFilters);

  useEffect(() => {

    

    fetchData(selectedDataType);
  }, [selectedDataType, filters]);

  const fetchData = async (type) => {
    setLoading(true);
    setError(null);

    // Check if the 'Last month' or 'This month' filter is selected
    let durationParam = null;
    if (filters.duration["Last month"]) {
      durationParam = "last-month";
    } else if (filters.duration["This month"]) {
      durationParam = "this-month";
    } else if (filters.duration["Last 3 Months"]) {
      durationParam = "last-3-months";
    } else if (filters.duration["Last 6 Months"]) {
      durationParam = "last-6-months";
    } else if (filters.duration["This Year"]) {
      durationParam = "this-year";
    } else if (filters.duration["Last Year"]) {
      durationParam = "last-year";
    }

    // Set the appropriate API URL based on the selected data type and filter
    let apiUrl = API_ENDPOINTS[type];
    if (durationParam) {
      apiUrl = `${apiUrl}?duration=${durationParam}`; // Append the duration query parameter
    }
    // console.log(apiUrl);

    try {
      const response = await fetch(apiUrl);
      // console.log("response:", response)
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      // console.log("result:", result);

      // Format data for the chart
      const formattedData = result.map((item) => ({
        name: item.period, // Use 'period' for X-Axis labels
        value: item.count, // Use 'count' as the bar value
      }));

      setData(formattedData);
    } catch (err) {
      setError(err.message);
      setData([]);
    }
    setLoading(false);
  };

  

  return (
    <Paper elevation={3} sx={{ padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        Inventory Count
      </Typography>
      <Box sx={{ marginBottom: 2 }}>
        {Object.keys(API_ENDPOINTS).map((type) => (
          <Button
            key={type}
            variant={selectedDataType === type ? "contained" : "outlined"}
            onClick={() => setSelectedDataType(type)}
            sx={{
              marginRight: 1,
              backgroundColor: selectedDataType === type ? "#ff9926" : "transparent",
              color: selectedDataType === type ? "white" : "#ff9926",
              borderColor: "#ff9926",
              "&:hover": { backgroundColor: "#e6801a", borderColor: "#e6801a" },
            }}
          >
            {type}
          </Button>
        ))}
      </Box>
      {loading ? (
        <Typography variant="body1">Loading data...</Typography>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : (
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
      )}
    </Paper>
  );
};

export default InventoryCountSection;
