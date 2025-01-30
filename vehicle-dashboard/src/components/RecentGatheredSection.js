import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, CardContent, CardActionArea, CircularProgress } from "@mui/material";

const API_ENDPOINTS = [
  { label: "# New Units", url: "http://localhost:5000/api/inventory/new-units", key: "totalNewUnits" },
  { label: "New MSRP", url: "http://localhost:5000/api/inventory/new-msrp", key: "totalNewMSRP" },
  { label: "New Avg. MSRP", url: "http://localhost:5000/api/inventory/new-average-msrp", key: "averageNewMSRP" },
  { label: "# Used Units", url: "http://localhost:5000/api/inventory/used-units", key: "totalUsedUnits" },
  { label: "Used MSRP", url: "http://localhost:5000/api/inventory/used-msrp", key: "totalUsedMSRP" },
  { label: "Used Avg. MSRP", url: "http://localhost:5000/api/inventory/used-average-msrp", key: "averageUsedMSRP" },
  { label: "# CPO Units", url: "http://localhost:5000/api/inventory/total-cpo-units", key: "totalCPOUnits" },
  { label: "CPO MSRP", url: "http://localhost:5000/api/inventory/cpo-msrp", key: "totalCpoMsrp" },
];

function RecentGatheredSection() {
  const [data, setData] = useState(Array(API_ENDPOINTS.length).fill(null));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          API_ENDPOINTS.map(async ({ url, key }) => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${key}`);
            const json = await res.json();
            return json[key] ?? "N/A"; // Extracts the correct key value
          })
        );
        setData(responses);
      } catch (err) {
        console.error("Error fetching inventory data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid item xs={12}>
      
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: "medium" }}>
          Recent Gathered Data - 04/01/24
        </Typography>
        {loading ? (
          <Grid container justifyContent="center" sx={{ padding: 3 }}>
            <CircularProgress />
          </Grid>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: "center", padding: 2 }}>
            Failed to load data. Please try again later.
          </Typography>
        ) : (
          <Grid container spacing={1} justifyContent="space-between">
            {API_ENDPOINTS.map(({ label }, index) => (
              <Grid item xs={12} sm={6} md={3} lg={1.5} key={index}>
                <Card
                  sx={{
                    maxWidth: 200,
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
                    "&:hover": { transform: "scale(1.05)", boxShadow: 5 },
                  }}
                >
                  <CardActionArea>
                    <CardContent sx={{ textAlign: "left", padding: 2 }}>
                      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                        {data[index]}
                      </Typography>
                      <Typography variant="body2" color="#ff9926">
                        {label}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

    </Grid>
  );
}

export default RecentGatheredSection;
