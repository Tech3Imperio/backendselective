const express = require("express");
const userRouter = require("./Routes/user");
const Dbconnector = require("./DatabaseConnection/user");
const logHistory = require("./Middleware/user");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const dbUri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 3001; // Ensure your backend runs on port 3001

// Database connection
Dbconnector(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected...");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.BASE_URL || "http://localhost:3000", // Dynamically set origin
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
  })
);
app.use(logHistory("log.txt"));

// Routes (Removing '/user')
app.use("/", userRouter); // Root path is now used

// Test route
app.get("/test", (req, res) => {
  res.send("Test route is working");
});

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
