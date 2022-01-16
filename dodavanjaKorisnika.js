
//dodavanje novog korisnika
function dodajKorisnika(){
    let ime = $("#ime").val()
    let prezime = $("#prezime").val()
    let brojMobitela = $("#brojMobitela").val()
    let email = $("#email").val()
    let uloga = $("#ulogaInput").val()
    let lozinka = $("#lozinka").val()

    fetch("http://127.0.0.1:5000/api/korisnici", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ime: ime,
            prezime: prezime,
            brojMobitela: brojMobitela,
            email: email,
            ulogaKorisnika: uloga,
            lozinka: lozinka
        })
    })
     .then((data) => {
        $("#ime").val("")
        $("#prezime").val("") 
        $("#brojMobitela").val("") 
        $("#email").val("") 
        // $("#ulogaInput").val() 
        $("#lozinka").val("") 
     })
}
//eventListener na submit click
$(document).ready(()=> {
    $("#korisniciButton").on("click", (e)=>{
        e.preventDefault();

        dodajKorisnika();
    })
})
 

//učitavanje uloge korisnika za dropdown
function dohvatiUloguKorisnika(){
    fetch(`http://127.0.0.1:5000/api/ulogaKorisnika`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
     .then((data) => {
        data.json().then((ulogaKorisnika) =>{
            ulogaKorisnika.map((uloga) => {
                $("#ulogaInput")
                    .append( "<option value = '"+ uloga.idUlogeKorisnika +"' >"+ uloga.nazivUlogeKorisnika + "</option >" )
            })
        })
    })
}
dohvatiUloguKorisnika()



