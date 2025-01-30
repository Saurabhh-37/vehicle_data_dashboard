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

// GET API to fetch the average Used MSRP (price)
router.get("/inventory/used-average-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for used units (assuming a field like 'condition' exists)
        const usedUnits = data.filter(item => item.condition.toLowerCase() === 'used'); // Adjust the field name accordingly

        // Calculate the total price and count of used units
        const totalUsedMSRP = usedUnits.reduce((acc, item) => {
            const price = parseFloat(item.price); // Assuming 'price' is the field name in the CSV
            if (!isNaN(price)) {
                return acc + price;
            }
            return acc;
        }, 0);

        // Calculate the average MSRP for used vehicles
        const averageUsedMSRP = usedUnits.length > 0 ? totalUsedMSRP / usedUnits.length : 0;

        res.json({ averageUsedMSRP: averageUsedMSRP.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch used average MSRP data" });
    }
});

// GET API to fetch the total number of CPO units
router.get("/inventory/total-cpo-units", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for CPO units (assuming 'condition' field exists)
        const cpoUnits = data.filter(item => item.condition.toLowerCase() === "cpo"); // Adjust field name if necessary

        // Count the number of CPO units
        const totalCPOUnits = cpoUnits.length;

        res.json({ totalCPOUnits });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch total CPO units data" });
    }
});

// GET API to fetch the total MSRP for CPO units
router.get("/inventory/cpo-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter the data for CPO units (assuming 'condition' field exists)
        const cpoUnits = data.filter(item => item.condition.toLowerCase() === "cpo"); // Adjust field name if necessary

        // Calculate the total MSRP for CPO units
        const totalCpoMsrp = cpoUnits.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

        res.json({ totalCpoMsrp });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch CPO MSRP data" });
    }
});

{/************************************************************************************************************** */}

// Function to get the start of a ten-day period
const getTenDayPeriodStart = (date) => {
    const startDate = new Date(date);
    const dayOfMonth = startDate.getDate();
    const tenDayPeriodStart = Math.floor((dayOfMonth - 1) / 10) * 10 + 1;
    startDate.setDate(tenDayPeriodStart);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
};

// Function to get the start date of the given duration
const getDurationStartDate = (duration) => {
    const currentDate = new Date();
    switch (duration) {
        case "last-month":
            currentDate.setMonth(currentDate.getMonth() - 1);
            currentDate.setDate(1); // Set to the first day of last month
            break;
        case "this-month":
            currentDate.setDate(1); // Set to the first day of the current month
            break;
        case "last-3-months":
            currentDate.setMonth(currentDate.getMonth() - 3);
            currentDate.setDate(1); // Set to the first day of 3 months ago
            break;
        case "last-6-months":
            currentDate.setMonth(currentDate.getMonth() - 6);
            currentDate.setDate(1); // Set to the first day of 6 months ago
            break;
        case "this-year":
            currentDate.setMonth(0); // Set to the first month of the current year
            currentDate.setDate(1); // Set to the first day of the current year
            break;
        case "last-year":
            currentDate.setFullYear(currentDate.getFullYear() - 1);
            currentDate.setMonth(0); // Set to the first month of last year
            currentDate.setDate(1); // Set to the first day of last year
            break;
        default:
            return null; // No valid duration, return null
    }
    return currentDate;
};

// GET API to fetch inventory count for every ten days for new cars with duration filter
router.get("/inventory/ten-day-count", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Get duration from query
        const { duration } = req.query;

        // Determine the start date for the given duration
        let durationStartDate = null;
        if (duration) {
            durationStartDate = getDurationStartDate(duration);
            if (!durationStartDate) {
                return res.status(400).json({ error: "Invalid duration value" });
            }
        }

        // Filter out only new cars based on 'condition'
        const newCars = data.filter(item => item.condition && item.condition.toLowerCase() === "new");

        // Filter cars based on duration
        const filteredCars = newCars.filter(item => {
            if (item.timestamp) {
                const timestampDate = new Date(item.timestamp);
                // Include the car only if the timestamp is after the duration start date
                return timestampDate >= durationStartDate;
            }
            return false;
        });

        // Object to store inventory count per 10-day period
        const tenDayCount = {};

        filteredCars.forEach(item => {
            if (item.timestamp) {
                const date = new Date(item.timestamp);
                if (!isNaN(date)) {
                    // Get the start of the ten-day period
                    const tenDayPeriodStart = getTenDayPeriodStart(date);
                    const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                    
                    tenDayCount[periodKey] = (tenDayCount[periodKey] || 0) + 1;
                }
            }
        });

        // Generate all the ten-day periods based on the range of timestamps
        const allDates = filteredCars.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data
        const formattedResponse = dateRanges.map(period => ({
            period,
            count: tenDayCount[period] || 0
        }));

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory count for every ten days" });
    }
});

// GET API to fetch inventory count for every ten days for used cars with duration filter
router.get("/inventory/used-ten-day-count", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Get duration from query
        const { duration } = req.query;

        // Determine the start date for the given duration
        let durationStartDate = null;
        if (duration) {
            durationStartDate = getDurationStartDate(duration);
            if (!durationStartDate) {
                return res.status(400).json({ error: "Invalid duration value" });
            }
        }

        // Filter out only used cars based on 'condition'
        const usedCars = data.filter(item => item.condition && item.condition.toLowerCase() === "used");

        // Filter cars based on duration
        const filteredCars = usedCars.filter(item => {
            if (item.timestamp) {
                const timestampDate = new Date(item.timestamp);
                // Include the car only if the timestamp is after the duration start date
                return timestampDate >= durationStartDate;
            }
            return false;
        });

        // Object to store inventory count per 10-day period
        const tenDayCount = {};

        filteredCars.forEach(item => {
            if (item.timestamp) {
                const date = new Date(item.timestamp);
                if (!isNaN(date)) {
                    // Get the start of the ten-day period
                    const tenDayPeriodStart = getTenDayPeriodStart(date);
                    const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                    
                    tenDayCount[periodKey] = (tenDayCount[periodKey] || 0) + 1;
                }
            }
        });

        // Generate all the ten-day periods based on the range of timestamps
        const allDates = filteredCars.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data
        const formattedResponse = dateRanges.map(period => ({
            period,
            count: tenDayCount[period] || 0
        }));

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory count for used cars every ten days" });
    }
});

// GET API to fetch inventory count for every ten days for CPO cars with duration filter
router.get("/inventory/cpo-ten-day-count", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Get duration from query
        const { duration } = req.query;

        // Determine the start date for the given duration
        let durationStartDate = null;
        if (duration) {
            durationStartDate = getDurationStartDate(duration);
            if (!durationStartDate) {
                return res.status(400).json({ error: "Invalid duration value" });
            }
        }

        // Filter out only CPO cars based on 'condition'
        const cpoCars = data.filter(item => item.condition && item.condition.toLowerCase() === "cpo");

        // Filter cars based on duration
        const filteredCars = cpoCars.filter(item => {
            if (item.timestamp) {
                const timestampDate = new Date(item.timestamp);
                // Include the car only if the timestamp is after the duration start date
                return timestampDate >= durationStartDate;
            }
            return false;
        });

        // Object to store inventory count per 10-day period
        const tenDayCount = {};

        filteredCars.forEach(item => {
            if (item.timestamp) {
                const date = new Date(item.timestamp);
                if (!isNaN(date)) {
                    // Get the start of the ten-day period
                    const tenDayPeriodStart = getTenDayPeriodStart(date);
                    const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD
                    
                    tenDayCount[periodKey] = (tenDayCount[periodKey] || 0) + 1;
                }
            }
        });

        // Generate all the ten-day periods based on the range of timestamps
        const allDates = filteredCars.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data
        const formattedResponse = dateRanges.map(period => ({
            period,
            count: tenDayCount[period] || 0
        }));

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch inventory count for CPO cars every ten days" });
    }
});

// GET API to fetch average MSRP for every ten days for new cars with duration filter
router.get("/inventory/new-ten-day-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Get duration from query
        const { duration } = req.query;

        // Determine the start date for the given duration
        let durationStartDate = null;
        if (duration) {
            durationStartDate = getDurationStartDate(duration);
            if (!durationStartDate) {
                return res.status(400).json({ error: "Invalid duration value" });
            }
        }

        // Filter out only New cars based on 'condition'
        const newCars = data.filter(item => item.condition && item.condition.toLowerCase() === "new");

        // If a duration filter is applied, further filter the cars based on the duration
        const filteredCars = newCars.filter(item => {
            if (item.timestamp) {
                const timestampDate = new Date(item.timestamp);
                // Include the car only if the timestamp is after the duration start date
                return timestampDate >= durationStartDate;
            }
            return false;
        });

        // Object to store sum of price and count per 10-day period
        const tenDayMSRP = {};

        filteredCars.forEach(item => {
            if (item.timestamp && item.price) {
                const date = new Date(item.timestamp);
                const price = parseFloat(item.price);

                if (!isNaN(date) && !isNaN(price)) {
                    // Get the start of the ten-day period
                    const tenDayPeriodStart = getTenDayPeriodStart(date);
                    const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD

                    if (!tenDayMSRP[periodKey]) {
                        tenDayMSRP[periodKey] = { totalMSRP: 0, count: 0 };
                    }

                    tenDayMSRP[periodKey].totalMSRP += price;
                    tenDayMSRP[periodKey].count += 1;
                }
            }
        });

        // Generate all the ten-day periods based on the range of timestamps
        const allDates = filteredCars.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data
        const formattedResponse = dateRanges.map(period => ({
            period,
            averageMSRP: tenDayMSRP[period] ? (tenDayMSRP[period].totalMSRP / tenDayMSRP[period].count) : 0
        }));

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch average MSRP for new cars every ten days" });
    }
});


// GET API to fetch average MSRP for every ten days for used cars
router.get("/inventory/used-ten-day-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter out only Used cars based on 'condition'
        const usedCars = data.filter(item => item.condition && item.condition.toLowerCase() === "used");

        // Object to store sum of price and count per 10-day period
        const tenDayMSRP = {};

        usedCars.forEach(item => {
            if (item.timestamp && item.price) {
                const date = new Date(item.timestamp);
                const price = parseFloat(item.price);

                if (!isNaN(date) && !isNaN(price)) {
                    // Get the start of the ten-day period
                    const tenDayPeriodStart = getTenDayPeriodStart(date);
                    const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD

                    if (!tenDayMSRP[periodKey]) {
                        tenDayMSRP[periodKey] = { totalMSRP: 0, count: 0 };
                    }

                    tenDayMSRP[periodKey].totalMSRP += price;
                    tenDayMSRP[periodKey].count += 1;
                }
            }
        });

        // Generate all the ten-day periods based on the range of timestamps
        const allDates = usedCars.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data
        const formattedResponse = dateRanges.map(period => ({
            period,
            averageMSRP: tenDayMSRP[period] ? (tenDayMSRP[period].totalMSRP / tenDayMSRP[period].count) : 0
        }));

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch average MSRP for used cars every ten days" });
    }
});

// GET API to fetch average MSRP for every ten days for CPO cars
router.get("/inventory/cpo-ten-day-msrp", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter out only CPO cars based on 'condition'
        const cpoCars = data.filter(item => item.condition && item.condition.toLowerCase() === "cpo");

        // Object to store sum of price and count per 10-day period
        const tenDayMSRP = {};

        cpoCars.forEach(item => {
            if (item.timestamp && item.price) {
                const date = new Date(item.timestamp);
                const price = parseFloat(item.price);

                if (!isNaN(date) && !isNaN(price)) {
                    // Get the start of the ten-day period
                    const tenDayPeriodStart = getTenDayPeriodStart(date);
                    const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD

                    if (!tenDayMSRP[periodKey]) {
                        tenDayMSRP[periodKey] = { totalMSRP: 0, count: 0 };
                    }

                    tenDayMSRP[periodKey].totalMSRP += price;
                    tenDayMSRP[periodKey].count += 1;
                }
            }
        });

        // Generate all the ten-day periods based on the range of timestamps
        const allDates = cpoCars.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data
        const formattedResponse = dateRanges.map(period => ({
            period,
            averageMSRP: tenDayMSRP[period] ? (tenDayMSRP[period].totalMSRP / tenDayMSRP[period].count) : 0
        }));

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch average MSRP for CPO cars every ten days" });
    }
});

// GET API to fetch History Log ordered by 10-day intervals and show inventory and total MSRP added for each condition
router.get("/inventory/history-log", async (req, res) => {
    try {
        const data = await loadCSVData(FILE_PATH);

        // Filter out entries with a timestamp to represent history logs
        const historyLogs = data.filter(item => item.timestamp && item.price);

        // Sort the logs by the timestamp in descending order (latest first)
        historyLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Object to store inventory counts, total MSRP, and average MSRP for 'new', 'used', and 'cpo' by 10-day period
        const inventoryByPeriod = {};

        historyLogs.forEach(item => {
            if (item.timestamp && item.condition && item.price) {
                const date = new Date(item.timestamp);
                const condition = item.condition.toLowerCase(); // Normalize condition to lowercase
                const price = parseFloat(item.price); // Parse the price field
                const tenDayPeriodStart = getTenDayPeriodStart(date); // Get the start of the 10-day period
                const periodKey = tenDayPeriodStart.toISOString().split("T")[0]; // Format as YYYY-MM-DD

                // Initialize the period if not already in the inventoryByPeriod object
                if (!inventoryByPeriod[periodKey]) {
                    inventoryByPeriod[periodKey] = { new: { count: 0, totalMSRP: 0 }, used: { count: 0, totalMSRP: 0 }, cpo: { count: 0, totalMSRP: 0 } };
                }

                // Increment the inventory count and total MSRP based on the condition
                if (condition === 'new' || condition === 'used' || condition === 'cpo') {
                    inventoryByPeriod[periodKey][condition].count += 1;
                    inventoryByPeriod[periodKey][condition].totalMSRP += price;
                }
            }
        });

        // Generate all the 10-day periods based on the range of timestamps
        const allDates = historyLogs.map(item => new Date(item.timestamp)).sort((a, b) => a - b);
        const startDate = new Date(allDates[0]);
        const endDate = new Date(allDates[allDates.length - 1]);

        // Create an array of all 10-day periods within the date range
        const dateRanges = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const periodKey = getTenDayPeriodStart(currentDate).toISOString().split("T")[0];
            dateRanges.push(periodKey);
            currentDate.setDate(currentDate.getDate() + 10);
        }

        // Prepare the response by adding zeros for periods without data and calculating average MSRP
        const formattedResponse = dateRanges.map(period => {
            const newData = inventoryByPeriod[period] ? inventoryByPeriod[period].new : { count: 0, totalMSRP: 0 };
            const usedData = inventoryByPeriod[period] ? inventoryByPeriod[period].used : { count: 0, totalMSRP: 0 };
            const cpoData = inventoryByPeriod[period] ? inventoryByPeriod[period].cpo : { count: 0, totalMSRP: 0 };

            return {
                period,
                new: {
                    count: newData.count,
                    totalMSRP: newData.totalMSRP,
                    averageMSRP: newData.count > 0 ? newData.totalMSRP / newData.count : 0
                },
                used: {
                    count: usedData.count,
                    totalMSRP: usedData.totalMSRP,
                    averageMSRP: usedData.count > 0 ? usedData.totalMSRP / usedData.count : 0
                },
                cpo: {
                    count: cpoData.count,
                    totalMSRP: cpoData.totalMSRP,
                    averageMSRP: cpoData.count > 0 ? cpoData.totalMSRP / cpoData.count : 0
                }
            };
        });

        res.json(formattedResponse);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch the history log" });
    }
});



// // GET API to fetch the monthly inventory count
// router.get("/inventory/monthly-count", async (req, res) => {
//     try {
//         const data = await loadCSVData(FILE_PATH);

//         // Object to store inventory count per month
//         const monthlyCount = {};

//         data.forEach(item => {
//             if (item.timestamp) {
//                 const date = new Date(item.timestamp);
//                 if (!isNaN(date)) {
//                     const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//                     monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1;
//                 }
//             }
//         });

//         // Convert the object into an array of { month, count } objects
//         const formattedResponse = Object.keys(monthlyCount).map(month => ({
//             month,
//             count: monthlyCount[month]
//         }));

//         // Sort by month in ascending order
//         formattedResponse.sort((a, b) => new Date(a.month) - new Date(b.month));

//         res.json(formattedResponse);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch monthly inventory count" });
//     }
// });

// // GET API to fetch the monthly inventory count for new cars
// router.get("/inventory/monthly-count/new", async (req, res) => {
//     try {
//         const data = await loadCSVData(FILE_PATH);

//         // Object to store inventory count per month for new cars
//         const monthlyCount = {};

//         data.forEach(item => {
//             if (item.timestamp && item.condition && item.condition.toLowerCase() === "new") {
//                 const date = new Date(item.timestamp);
//                 if (!isNaN(date)) {
//                     const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//                     monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1;
//                 }
//             }
//         });

//         // Convert the object into an array of { month, count } objects
//         const formattedResponse = Object.keys(monthlyCount).map(month => ({
//             month,
//             count: monthlyCount[month]
//         }));

//         // Sort by month in ascending order
//         formattedResponse.sort((a, b) => new Date(a.month) - new Date(b.month));

//         res.json(formattedResponse);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch monthly inventory count for new cars" });
//     }
// });

// // GET API to fetch the monthly inventory count for used cars
// router.get("/inventory/monthly-count/used", async (req, res) => {
//     try {
//         const data = await loadCSVData(FILE_PATH);

//         // Object to store inventory count per month for used cars
//         const monthlyCount = {};

//         data.forEach(item => {
//             if (item.timestamp && item.condition && item.condition.toLowerCase() === "used") {
//                 const date = new Date(item.timestamp);
//                 if (!isNaN(date)) {
//                     const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//                     monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1;
//                 }
//             }
//         });

//         // Convert the object into an array of { month, count } objects
//         const formattedResponse = Object.keys(monthlyCount).map(month => ({
//             month,
//             count: monthlyCount[month]
//         }));

//         // Sort by month in ascending order
//         formattedResponse.sort((a, b) => new Date(a.month) - new Date(b.month));

//         res.json(formattedResponse);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch monthly inventory count for used cars" });
//     }
// });

// // GET API to fetch the monthly inventory count for CPO cars (with zero-count months)
// router.get("/inventory/monthly-count/cpo", async (req, res) => {
//     try {
//         const data = await loadCSVData(FILE_PATH);

//         // Object to store inventory count per month for CPO cars
//         const monthlyCount = {};

//         // Get the current date
//         const currentDate = new Date();
//         const currentYear = currentDate.getFullYear();
//         const currentMonth = currentDate.getMonth() + 1; // JS months are 0-based

//         // Initialize all months of the last two years with 0 count
//         for (let year = currentYear - 1; year <= currentYear; year++) {
//             for (let month = 1; month <= 12; month++) {
//                 const monthYear = `${year}-${String(month).padStart(2, "0")}`;
//                 monthlyCount[monthYear] = 0;
//             }
//         }

//         // Process data to count CPO cars per month
//         data.forEach(item => {
//             if (item.timestamp && item.condition && item.condition.toLowerCase() === "cpo") {
//                 const date = new Date(item.timestamp);
//                 if (!isNaN(date)) {
//                     const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
//                     if (monthlyCount[monthYear] !== undefined) {
//                         monthlyCount[monthYear] += 1;
//                     }
//                 }
//             }
//         });

//         // Convert the object into an array of { month, count } objects
//         const formattedResponse = Object.keys(monthlyCount).map(month => ({
//             month,
//             count: monthlyCount[month]
//         }));

//         // Sort by month in ascending order
//         formattedResponse.sort((a, b) => new Date(a.month) - new Date(b.month));

//         res.json(formattedResponse);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch monthly inventory count for CPO cars" });
//     }
// });

module.exports = router;