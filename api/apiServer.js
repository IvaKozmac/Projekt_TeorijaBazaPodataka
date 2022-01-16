const express = require("express");
const cors = require('cors');
const router = express.Router();

const app = express();
app.use(cors());
app.use(express.json())
const port = 5000;

// Ruta najmova
const najmoviRuta = require("./najmovi/najmovi");
app.use("/api/najmovi", najmoviRuta);
// Ruta korisnika
const rezijeRuta = require("./korisnici/korisnici");
app.use("/api/korisnici", rezijeRuta);
// Ruta vrsta najma
const vrstaNajmaRuta = require("./vrstaNajma/vrstaNajma");
app.use("/api/vrstaNajma", vrstaNajmaRuta);
// Ruta uloga korisnika
const ulogaKorisnikaRuta = require("./ulogaKorisnika/ulogaKorisnika");
app.use("/api/ulogaKorisnika", ulogaKorisnikaRuta);



app.listen(port, (err) => {
  console.log(`running server on port: ${port}`);
});