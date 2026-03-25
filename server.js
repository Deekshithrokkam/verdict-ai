const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 👉 PUT YOUR KEYS HERE
const MURF_KEY = "ap2_e337bc54-c8d8-4f16-bbf8-b58a52304aef ";
const GEMINI_KEY = "AIzaSyCZSM-od_Tsf_M1llALcaHxJ3sIIfLRCA0";

// 🔊 Murf
app.post("/speak", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.murf.ai/v1/speech/generate",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": MURF_KEY
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.log("MURF ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Murf failed" });
  }
});

// 🧠 Gemini
app.post("/ai", async (req, res) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_KEY}`,
      req.body
    );
    res.json(response.data);
  } catch (err) {
    console.log("GEMINI ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini failed" });
  }
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});