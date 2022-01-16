ProvjeriUloguPopuniHTML();

async function dohvatiDetaljeNajma(){
    let query = window.location.search
    let params = new URLSearchParams(query)
    let id = params.getAll("id")[0]
    let response = await fetch(`http://127.0.0.1:5000/api/najmovi/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
   
     return response.json();
}
 
async function ProvjeriUloguPopuniHTML(){
    let prijavljeniKorisnik = DohvatiPodatkeIzCookija();

    let najam = await dohvatiDetaljeNajma()
    najam = najam[0]

    PopuniGeneralneInformacije(najam);
    PopuniTablicuRezija(najam);    
    
    if(prijavljeniKorisnik.uloga == 1 || najam.najmodavac == prijavljeniKorisnik.id) {
        KreirajTablicuNajmovaZaNajmodavca();
        PopuniTablicuNajmovaZaNajmodavca(najam);
        DodajGumbZaBrisanje();

        // uspoređivanje vremena završetka ugovora i trenutnog vremena
        danas = Math.floor(new Date().getTime()/1000.0)
        let dohvaceniDatum = new Date(najam.trajanjeUgovora)
        var prosloConvert = Math.floor(dohvaceniDatum.getTime()/1000.0)

            if(prosloConvert > danas){
                DodajGumbZaNajam(najam.idNajma);
                DodajGumbZaRezije(najam.idNajma);
            } 
        

    } else {
        KreirajTablicuNajmovaZaNajmoprimca();
        PopuniTablicuNajmovaZaNajmodavca(najam);

        // popuni tablicu za najmoprimca

    }
}

function PopuniGeneralneInformacije(najam){
    // Generiraj detalje o najmu
    $("#input__nazivNajma").val(najam.nazivNajma)
           
    $("#input__vrstaNajma").val(najam.nazivVrsteNajma)
    
    let datumSklapanjaUgovora = new Date(najam.datumSklapanjaUgovora) 
    $("#input__datum").val(datumSklapanjaUgovora.getDate() + " / " + (datumSklapanjaUgovora.getMonth()+1) + " / " + datumSklapanjaUgovora.getFullYear())

    let ugovorVrijediDo = new Date(najam.trajanjeUgovora) 
    $("#input__ugovorVrijedi").val( ugovorVrijediDo.getDate() + " / " + ( ugovorVrijediDo.getMonth()+1) + " / " +  ugovorVrijediDo.getFullYear())

    $("#input__najmodavac").val(najam.najmodavacime + " " + najam.najmodavacprezime)
    $("#input__najmoprimac").val(najam.najmoprimacime + " " + najam.najmoprimacprezime)
    $("#input__detaljiUgovora").val(najam.detaljiNajma)
    $("#input__cijenaNajma").val(najam.cijenaNajma)

    let datumKreiranja = new Date(najam.datumSklapanjaUgovora) 
    $("#input__datumKreiranjaNajma").val(datumKreiranja.getDate() + " / " + (datumKreiranja.getMonth()+1) + " / " + datumKreiranja.getFullYear())
}

function KreirajTablicuNajmovaZaNajmoprimca(){
    $("#table__najam").prepend(`
        <thead>
            <tr>
            <td style="border: 2px solid black;">Mjeseci</td>
            <td style="border: 2px solid black;">Godina</td>
            <td style="border: 2px solid black;">Status</td>
            </tr>
        </thead>
    `)
}

function KreirajTablicuNajmovaZaNajmodavca(){
    $("#table__najam").prepend(`
        <thead>
            <tr>
            <td style="border: 2px solid black;">Mjeseci</td>
            <td style="border: 2px solid black;">Godina</td>
            <td style="border: 2px solid black;">Status</td>
            </tr>
        </thead>
    `)
}

function PopuniTablicuRezija(najam){
    //dohvaćanje tablice rezija
    najam?.rezije?.map((rezijePlacanje) => {
        
        let placeno = rezijePlacanje.placeno == true ? "Plaćeno" : "Nije plaćeno"

        $("#rezijeTable")
        .append("<tr>"+
                    "<td>"+ rezijePlacanje.mjesec +"</td>"+
                    "<td>"+ rezijePlacanje.godina +"</td>"+
                    "<td>"+ placeno +"</td> "+
                    "<td><a href='/detaljiRezija.html?najamID="+ najam.idNajma + "&rezijeID="+ najam.rezije.indexOf(rezijePlacanje) +"' id='detaljiButton' class='detaljiButton'>Detalji</a></td>"+
                "</tr>")
    })
}

function PopuniTablicuNajmovaZaNajmodavca(najam){
    
    
    if(najam.placanjeNajma?.length > 0){
        najam.placanjeNajma.map((racunNajma) => {

            let placeno = racunNajma.placeno == true ? "Plaćeno" : "Nije plaćeno"
            $("#placeniNajmoviTable")
             .append("<tr>"+
                        "<td>"+ racunNajma.mjesec +"</td>"+
                        "<td>"+ racunNajma.godina +"</td>"+
                        "<td>"+ placeno +"</td> "+
                    "</tr>")
        })
       }
}

function DodajGumbZaRezije(najamId){
    $("#table__rezije").after(`
        <a style="border: 1px solid black;" id="unesiNoveRezije" 
        href=/dodavanjeRezija.html?najamId=${najamId}>Unesite nove režije </a>  
    `)

    
}

function DodajGumbZaNajam(najamId){
    $("#table__najam").after(`
        <a id="unesiNoviNajam" href="/najamnina.html?najamId=${najamId}">Unesite novi najam </a>
    `)
}

function DodajGumbZaBrisanje(najamId){
    $("#detaljiNajma_table").after(`
        <button type = "delete" id = "izbrisiNajamButton"  onclick="brisanjeNajma()" class = "izbrisiNajamButton" > Izbrisi najam </button>
    `)
}

 function brisanjeNajma(){
    let query = window.location.search
    let params = new URLSearchParams(query)
    let id = params.getAll("id")[0]
    fetch(`http://127.0.0.1:5000/api/najmovi/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
     .then((data) => {
        data.json().then((najam) =>{
            window.location.replace("/pregledNajmova.html");
        })
     })
     .catch(error=>{
         console.log(error)
     })
 }

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
