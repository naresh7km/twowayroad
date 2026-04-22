const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors({
  origin: "https://twowayroad.d2ebm96w5vip5m.amplifyapp.com",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running"
  });
});

app.post("/load-html", (req, res) => {
  const { mouseX, mouseY } = req.body || {};

  console.log("Mouse request received:", { mouseX, mouseY });

  const htmlFilePath = path.join(__dirname, "dmc1.html");

  fs.readFile(htmlFilePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error reading dmc1.html:", err);
      return res.status(500).json({
        success: false,
        error: "Failed to read dmc1.html"
      });
    }

    res.json({
      success: true,
      html: htmlData
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
