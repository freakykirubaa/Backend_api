const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors()); 

app.post("/api/search", async (req, res) => {
  const { origin, destination, cabin } = req.body;

  const headers = {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9,hi;q=0.8",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  };

  const json_data = {
    origin,
    destination,
    partnerPrograms: [
      "Air Canada",
      "United Airlines",
      "KLM",
      "Qantas",
      "American Airlines",
      "Etihad Airways",
      "Alaska Airlines",
      "Qatar Airways",
      "LifeMiles",
    ],
    stops: 2,
    departureTimeFrom: "2024-07-09T00:00:00Z",
    departureTimeTo: "2024-10-07T00:00:00Z",
    isOldData: false,
    limit: 302,
    offset: 0,
    cabinSelection: [cabin],
    date: new Date().toISOString(),
  };

  try {
    const response = await axios.post("https://cardgpt.in/apitest", json_data, {
      headers,
    });

   

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
