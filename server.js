const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*"
}));

app.use(express.json());

// 🔑 KEYS (REMOVE EXTRA SPACE!)
const MURF_KEY = "ap2_e337bc54-c8d8-4f16-bbf8-b58a52304aef";
const GEMINI_KEY = "AIzaSyCZSM-od_Tsf_M1llALcaHxJ3sIIfLRCA0";

// 🔊 MURF API
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

// 🧠 GEMINI API (FIXED FORMAT)
app.post("/ai", async (req, res) => {
  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent?key=${GEMINI_KEY}`,
      {
        contents: req.body.contents || req.body
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);

  } catch (err) {
    console.log("GEMINI ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Gemini failed" });
  }
});

// 🚀 START SERVER
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
