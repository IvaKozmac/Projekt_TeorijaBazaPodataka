
//dodavanje novog najma
function dodajNajam(){
    let nazivNajma = $("#nazivNajma").val()
    let datumSklapanjaUgovora = $("#datumSklapanjaUgovora").val()
    let vrstaNajma = $("#vrstaNajmaSelect").val()
    let najmodavac = $("#najmodavacInput").val()
    let najmoprimac = $("#najmoprimacSelect").val()
    let cijenaNajma = $("#cijenaNajma").val()
    let adresa = $("#adresa").val()
    let ugovor = $("#ugovor").val()
    let ugovorVrijediDo = $("#ugovorVrijediDo").val()

    fetch("http://127.0.0.1:5000/api/najmovi", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nazivNajma: nazivNajma,
            datumSklapanjaUgovora: datumSklapanjaUgovora,
            vrstaNajma: vrstaNajma,
            najmodavac: najmodavac,
            najmoprimac: najmoprimac,
            cijenaNajma: cijenaNajma,
            adresa: adresa,
            ugovor: ugovor,
            ugovorVrijediDo: ugovorVrijediDo
        })
    })
     .then((data) => {
        data.json().then((najam) =>{
            if(najam.idNajma){
                window.location.href = `/detaljiNajma.html?id=${najam.idNajma}`
            }
        })
     })
}
//eventListener na submit click
$(document).ready(()=> {
    $("#dodajNajamButton").on("click", (e)=>{
        e.preventDefault();

        dodajNajam();
    })
})
 

//učitavanje korisnika za dropdown

function dohvatiKorisnikePopuniSelect(){
    let prijavljeniKorisnik = DohvatiPodatkeIzCookija();
    fetch(`http://127.0.0.1:5000/api/korisnici`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
     .then((data) => {
        data.json().then((korisnici) =>{
            korisnici.map((korisnik) => {
                if(korisnik.idKorisnika == prijavljeniKorisnik.id){
                    $("#najmodavacInput")
                        .append( "<option value = '"+korisnik.idKorisnika+"' >"+ korisnik.ime + " "+ korisnik.prezime +"</option >" )
                }
            })
        })
    })
}
dohvatiKorisnikePopuniSelect()

function dohvatiKorisnikePopuniSelectNajmoprimac(){
    let prijavljeniKorisnik = DohvatiPodatkeIzCookija();
    fetch(`http://127.0.0.1:5000/api/korisnici`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
     .then((data) => {
        data.json().then((korisnici) =>{
            korisnici.map((korisnik) => {
                if(korisnik.idKorisnika != prijavljeniKorisnik.id){
                $("#najmoprimacSelect")
                    .append( "<option value = '"+korisnik.idKorisnika+"' >"+ korisnik.ime + " "+ korisnik.prezime +"</option >" )
                }
            })
        })
    })
}
dohvatiKorisnikePopuniSelectNajmoprimac()


//dohvačanje podataka za dropdown za vrstu najma
function dohvatiVrstuNajma(){
    fetch(`http://127.0.0.1:5000/api/vrstaNajma`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
     .then((data) => {
        data.json().then((vrstaNajma) =>{
            vrstaNajma.map((vrsta) => {
                $("#vrstaNajmaSelect")
                    .append( "<option value = '"+vrsta.idVrsteNajma+"' >"+ vrsta.nazivVrsteNajma+ "</option >" )
            })
        })
    })
}
dohvatiVrstuNajma()

function DohvatiPodatkeIzCookija() {
    let cookies = document.cookie;
    let cookiesArray = cookies.split(" ");
  
    let emailCookieString = cookiesArray.find((x) => x.includes("loginEmail"));
    let idCookieString = cookiesArray.find((x) => x.includes("loginId"));
    let ulogaCookieString = cookiesArray.find((x) => x.includes("uloga"));
  
    let email = emailCookieString?.split("=")[1];
    email = email.replace(";", "")
  
    let id = idCookieString?.split("=")[1];
    id = id.replace(";", "")
  
    let uloga = ulogaCookieString?.split("=")[1];
    uloga = uloga.replace(";", "")
  
    return {email, id, uloga};
  }