let vrstaRezije = []

$(document).ready(()=> {
    $("#dodajNajamninu").on("click", (e)=>{
        DodajNajam();
    })
})

async function DodajNajam() {
    let placanjeNajma = {
        mjesec: "",
        godina: "",
        placeno: true
    }

    let query = window.location.search
    let params = new URLSearchParams(query)
    let najamId = params.getAll("najamId")[0] 


    placanjeNajma.mjesec = $("#najamninaSelect").val()
    placanjeNajma.godina = $("#godinaNajamnine").val()

    try{
        let response = await fetch(`http://127.0.0.1:5000/api/najmovi/najamnina/${najamId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(placanjeNajma)
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
  
    return {email, id, uloga};
  }