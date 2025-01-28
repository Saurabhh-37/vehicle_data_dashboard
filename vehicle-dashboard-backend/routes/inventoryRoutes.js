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

module.exports = router;
