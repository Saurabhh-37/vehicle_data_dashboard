import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import TitleSection from './TitleSection';
import RecentGatheredSection from './RecentGatheredSection';
import InventoryCountSection from './InventoryCountSection';
import AverageMSRPSection from './AverageMSRPSection';
import HistoryLogSection from './HistoryLogSection';
import FilterDrawer from './FilterDrawer';

function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    vehicleMake: { Ford: false, Cadillac: false, Jeep: false },
    duration: { 'Last month': false, 'This month': false, 'Last 3 months': false, 'Last 6 months': false, 'This year': false, 'Last year': false },
  });

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleCheckboxChange = (category, name, checked) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [name]: checked,
      },
    }));
  };

  const applyFilters = () => {
    console.log('Filters applied:', filters);
  };

  const removeFilters = () => {
    setFilters({
      vehicleMake: { Ford: false, Cadillac: false, Jeep: false },
      duration: { 'Last month': false, 'This month': false, 'Last 3 months': false, 'Last 6 months': false, 'This year': false, 'Last year': false },
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TitleSection onFilterClick={toggleDrawer(true)} />
        </Grid>
        <RecentGatheredSection />
        <Grid item xs={12}>
          <InventoryCountSection />
        </Grid>
        <Grid item xs={12}>
          <AverageMSRPSection />
        </Grid>
        <Grid item xs={12}>
          <HistoryLogSection />
        </Grid>
      </Grid>
      <FilterDrawer
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        filters={filters}
        onCheckboxChange={handleCheckboxChange}
        onApplyFilters={applyFilters}
        onRemoveFilters={removeFilters}
      />
    </Box>
  );
}

export default Dashboard;
