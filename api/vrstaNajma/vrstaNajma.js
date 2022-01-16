const express = require("express")
const { db } = require("../../baza/baza.js")
const router = express.Router()

// Dohvati vrstu najma
router.get("/", (req, res) => {
    db.any(`SELECT * FROM vrsta_najma`)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((error) => {
      res.status(400).json(error)
    })
  })
  module.exports = router;
