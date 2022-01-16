const express = require("express")
const {
    json
} = require("express/lib/response")
const {
    db
} = require("../../baza/baza.js")
const router = express.Router()

// Dohvati sve najmove TODO
router.get("/", (req, res) => {
    db.any(`SELECT * FROM najmovi`)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

// Dohvati sve najmove za trenutnog korisnika
router.get("/user/:email", (req, res) => {
    db.func(`DohvatiSveNajmoveZaKorisnika`, [req.params.email])
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(400).json(error)
        })
})

// Dohvati podatke o jednom najmu sa IDjem 
router.get("/:id", (req, res) => {
    let userID = req.params.id
    db.any(`SELECT "idNajma", "nazivNajma", "placanjeNajma" ,"datumSklapanjaUgovora", "trajanjeUgovora", vrsta_najma."nazivVrsteNajma", najmodavac.ime as    najmodavacIme, najmodavac.prezime as     najmodavacPrezime, "cijenaNajma",
    "placanjeNajma", "detaljiNajma", "datumKreiranjaNajma", rezije, adresa, najmoprimac.ime as najmoprimacIme, najmoprimac.prezime as najmoprimacPrezime, najmodavac, najmoprimac
    FROM najmovi
    LEFT JOIN korisnici as najmodavac ON najmovi.najmodavac = najmodavac."idKorisnika"
    LEFT JOIN korisnici as najmoprimac ON najmovi.najmoprimac = najmoprimac."idKorisnika"
    LEFT JOIN vrsta_najma ON najmovi."vrstaNajma" = vrsta_najma."idVrsteNajma"
            WHERE "idNajma" = ${userID}`).then((data) => {

        res.status(200).json(data)
    }).catch((error) => {
        res.status(400).json(error)
    })
})

//brisanje najma
router.delete("/:id", (req, res) => {
    let najamId = req.params.id
    db.result(`DELETE FROM najmovi WHERE "idNajma" = ${najamId}`).then((data) => {
        res.status(200).json(data)
    }).catch((error) => {
        res.status(400).json(error)
    })
})

// dodavanjeNajmova
router.post("/", (req, res) => {
    let nazivNajma = req.body.nazivNajma;
    let datumSklapanjaUgovora = req.body.datumSklapanjaUgovora;
    let vrstaNajma = req.body.vrstaNajma;
    let najmodavac = req.body.najmodavac;
    let najmoprimac = req.body.najmoprimac;
    let cijenaNajma = req.body.cijenaNajma;
    let ugovor = req.body.ugovor;
    let adresa = req.body.adresa;
    let placanjeNajma = req.body.placanjeNajma;
    let rezije = req.body.rezije;
    let ugovorVrijediDo = req.body.ugovorVrijediDo;




    db.one(`INSERT INTO "najmovi" ("nazivNajma", "datumSklapanjaUgovora", "vrstaNajma", najmodavac, najmoprimac, "cijenaNajma", "detaljiNajma", adresa, "placanjeNajma", rezije, "trajanjeUgovora") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::json[], $10::json[], $11) RETURNING "idNajma"`, [
        nazivNajma,
        datumSklapanjaUgovora,
        vrstaNajma,
        najmodavac,
        najmoprimac,
        cijenaNajma,
        ugovor,
        adresa,
        placanjeNajma,
        rezije,
        ugovorVrijediDo
    ]).then((data) => {
        return res.status(200).json(data)
    }).catch((error) => {
        return res.status(400).json(error)
    })
})

//UPDATE TABLICE NAJMOVI - dodavanje rezija rezije
router.post("/rezije/:id", (req, res) => {
    let najamId = req.params.id;
    let rezijaJSON = req.body;

    db.none(`UPDATE najmovi SET rezije = rezije || $1::json WHERE "idNajma" = $2`,
            [rezijaJSON, najamId])
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

//UPDATE TABLICE NAJMOVI STATUS REZIJE - placeno
router.put("/placanje/:id", (req, res) => {
    let najamId = req.params.id;
    let rezijaJSON = req.body;

    db.none(`UPDATE najmovi SET rezije = $1::json[] WHERE "idNajma" = $2`,
            [rezijaJSON, najamId])
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})

//UPDATE TABLICE NAJMOVI - dodaj placanjeNajma
router.post("/najamnina/:id", (req, res) => {
    let najamId = req.params.id;
    let placanjeNajmaJSON = req.body;
    console.log(placanjeNajmaJSON)

    db.none(`UPDATE najmovi SET "placanjeNajma" = "placanjeNajma" || $1::json WHERE "idNajma" = $2`,
            [placanjeNajmaJSON, najamId])
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
})



module.exports = router;