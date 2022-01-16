const express = require("express");
const { db } = require("../../baza/baza.js");
const router = express.Router();

// Dohvati sve korisnike
router.get("/", (req, res) => {
  db.any(`SELECT * FROM korisnici`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// dohvati jednog korisnika po emailu
router.get("/:email", (req, res) => {
  let email = req.params.email;

  db.any(`SELECT * FROM korisnici WHERE "email" = '${email}'`)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// dodavanje korisnika
router.post("/", (req, res) => {
  let ime = req.body.ime;
  let prezime = req.body.prezime;
  let brojMobitela = req.body.brojMobitela;
  let ulogaKorisnika = 2;
  let lozinka = req.body.lozinka;
  let email = req.body.email;

  db.one(
    `INSERT INTO "korisnici" (ime, prezime, "brojMobitela", "ulogaKorisnika", lozinka, email ) 
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING "idKorisnika"`,
    [ime, prezime, brojMobitela, ulogaKorisnika, lozinka, email]
  )
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});

module.exports = router;
