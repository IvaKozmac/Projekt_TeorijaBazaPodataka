let indexRetka = 0

$(document).ready(() => {
    $("#dodajRezijeButton").on("click", (e) => {
        dodajRezijeUTablicu();
    })
    obrisiIzTablice();
    $("#dodajUkupnoRezijeButton").on("click", (e) => {
        e.preventDefault();
        SpremiRezije();
    })
})

//dodavanje rezija
function dodajRezijeUTablicu() {
    let rezijeSelect = $("#rezijeSelect").val()
    let cijena = $("#cijena").val()

    if (cijena != "" && cijena != 0 && cijena != undefined && cijena != null) {
        $("#cijena").val("")
        $("#rezijeSelect").val($("#rezijeSelect option:first").val())

        DodajRedakUTablicu(rezijeSelect, cijena);
    }
}

function DodajRedakUTablicu(rezija, cijena) {
    $("#tableBody").append(
        `<tr id="R${++indexRetka}">
            <td class="rezija">${rezija}</td>
            <td class="cijena">${cijena}</td>
            <td><button type="button" onClick="" value="" id="obrisiButton" class="obrisiButton">Obriši</button></td>
        </tr>`
    )
}

function obrisiIzTablice(index) {
    $('#tableBody').on('click', '.obrisiButton', function () {
        $(this).closest('tr').remove();
    });
}

async function SpremiRezije() {
    let rezije = {
        mjesec: "",
        godina: 0,
        vrstaRezija: [],
        placeno: false
    }

    let query = window.location.search
    let params = new URLSearchParams(query)
    let najamId = params.getAll("najamId")[0]

    let mjesec = $("#mjesecSelect").val();
    let godina = $("#nazivNajma").val();

    rezije.mjesec = mjesec;
    rezije.godina = godina;

    let vrsta = ""
    let iznos = 0
    $("#tableBody > tr > td").each((index, td) => {
        if (td.classList.contains("rezija")) {
            vrsta = td.textContent;
        } else if (td.classList.contains("cijena")) {
            iznos = parseFloat(td.textContent)
        }

        if (vrsta != "" && iznos > 0) {
            rezije.vrstaRezija.push({
                vrsta,
                iznos
            });
            vrsta = ""
            iznos = 0
        }
    })

    try{
        let response = await fetch(`http://127.0.0.1:5000/api/najmovi/rezije/${najamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rezije)
        })

        let responseJSON = await response.json();

        if (responseJSON == null) window.location.replace(`/detaljiNajma.html?id=${najamId}`)
    }catch(err){
        console.log(err)
    }    
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

    return {
        email,
        id,
        uloga
    };
}