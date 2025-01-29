const express = require("express");
const router = express.Router();
const { loadCSVData } = require("../utils/dataLoader");

const FILE_PATH = "data/sample-data-v2.csv"; // CSV file path

// GET API to fetch and filter vehicle data
router.get("/inventory", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Get filter parameters
        const { make, duration } = req.query;

        let filteredData = [...data];

        // Filter by Vehicle Make
        if (make) {
            filteredData = filteredData.filter(item => item.brand.toLowerCase() === make.toLowerCase());
        }

        // Filter by Duration (Mock Implementation)
        if (duration) {
            const currentDate = new Date();
            const durationMapping = {
                "last-month": 30,
                "this-month": 30,
                "last-3-months": 90,
                "last-6-months": 180,
                "this-year": 365,
                "last-year": 730
            };

            const days = durationMapping[duration];
            if (days) {
                filteredData = filteredData.slice(0, days); // Mocking by slicing recent entries
            }
        }

        res.json(filteredData);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory data" });
    }
});

// GET API to fetch the total number of new units
router.get("/inventory/new-units", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for new units (assuming a field like 'condition' or 'status' exists)
        const newUnits = data.filter(item => item.condition.toLowerCase() === 'new'); // Adjust the field name accordingly

        res.json({ totalNewUnits: newUnits.length });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch new units data" });
    }
});

// GET API to fetch the total number of used units
router.get("/inventory/used-units", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for used units (assuming a field like 'condition' or 'status' exists)
        const usedUnits = data.filter(item => item.condition.toLowerCase() === 'used'); // Adjust the field name accordingly

        res.json({ totalUsedUnits: usedUnits.length });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch used units data" });
    }
});

// GET API to fetch the total New MSRP (price)
router.get("/inventory/new-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for new units (assuming a field like 'condition' or 'status' exists)
        const newUnits = data.filter(item => item.condition.toLowerCase() === 'new'); // Adjust the field name accordingly

        // Calculate the total price (MSRP) of new units
        const totalNewMSRP = newUnits.reduce((acc, item) => {
            const price = parseFloat(item.price); // Assuming 'price' is the field name in the CSV
            if (!isNaN(price)) {
                return acc + price;
            }
            return acc;
        }, 0);

        res.json({ totalNewMSRP: totalNewMSRP.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch new MSRP data" });
    }
});

// GET API to fetch the New Average MSRP
router.get("/inventory/new-average-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for new units (assuming a field like 'condition' or 'status' exists)
        const newUnits = data.filter(item => item.condition.toLowerCase() === 'new'); // Adjust the field name accordingly

        // Calculate the total price and the number of new units
        const totalNewPrice = newUnits.reduce((acc, item) => {
            const price = parseFloat(item.price); // Assuming 'price' is the field name in the CSV
            if (!isNaN(price)) {
                return acc + price;
            }
            return acc;
        }, 0);

        const averageNewPrice = newUnits.length > 0 ? totalNewPrice / newUnits.length : 0;

        res.json({ averageNewMSRP: averageNewPrice.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch new average MSRP data" });
    }
});

// GET API to fetch the total Used MSRP (price)
router.get("/inventory/used-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for used units (assuming a field like 'condition' or 'status' exists)
        const usedUnits = data.filter(item => item.condition.toLowerCase() === 'used'); // Adjust the field name accordingly

        // Calculate the total price (MSRP) of used units
        const totalUsedMSRP = usedUnits.reduce((acc, item) => {
            const price = parseFloat(item.price); // Assuming 'price' is the field name in the CSV
            if (!isNaN(price)) {
                return acc + price;
            }
            return acc;
        }, 0);

        res.json({ totalUsedMSRP: totalUsedMSRP.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch used MSRP data" });
    }
});


module.exports = router;
