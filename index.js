const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running"
  });
});

app.post("/load-html", (req, res) => {
  try {
    const { mouseX, mouseY } = req.body;

    console.log("Mouse moved:", { mouseX, mouseY });

    const htmlFilePath = path.join(__dirname, "..", "index.html");

    fs.readFile(htmlFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading index.html:", err);
        return res.status(500).json({
          error: "Failed to read HTML file"
        });
      }

      res.json({
        success: true,
        html: data
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
