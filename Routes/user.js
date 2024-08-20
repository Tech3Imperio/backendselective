const express = require("express");
const { handelPostData, handleGetJsonData } = require("../Contollers/user");

const router = express.Router();

// This route is now accessible at http://localhost:3001/contact
router.post("/contact", handelPostData);
router.get("/api", handleGetJsonData);

module.exports = router;
