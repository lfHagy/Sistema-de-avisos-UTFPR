const express = require("express");
const router = express.Router();

router.post("", (req, res) => {
  try {
    res.status(200).end();
  } catch (err) {
    console.error("Error no logout:", err);
    res.status(500).end();
  }
});


module.exports = router;
