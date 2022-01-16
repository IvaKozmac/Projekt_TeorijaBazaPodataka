$(document).ready(async () => {
  SwitchPlacanje();
})

let rezijeArray = [];

async function dohvatiDetaljeRezija(){
    let query = window.location.search
    let params = new URLSearchParams(query)
    let id = params.getAll("najamID")[0]
    let index = params.getAll("rezijeID")[0]

    fetch(`http://127.0.0.1:5000/api/najmovi/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
     .then((data) => { data.json()
        .then((najmovi) =>{
          rezijeArray = najmovi[0].rezije
           //dohvaćanje tablice vrsta rezija 
            
            najmovi[0].rezije.map((rezijePlacanje) => {
                if(najmovi[0].rezije.indexOf(rezijePlacanje)==index){
                    $("#input__mjesec").val(rezijePlacanje.mjesec)
                    $("#input__godina").val(rezijePlacanje.godina)
                    $("#input__ukupno").val(rezijePlacanje.ukupno)
                    $("#input__status").val(rezijePlacanje.placeno == true ? "Plaćeno" : "Nije plaćeno")

                    rezijePlacanje.vrstaRezija?.map((rezija)=> {
                        $("#vrstaRezijaTable")
                        .append("<tr>"+
                            "<td>"+ rezija.vrsta +"</td>"+
                            "<td>"+ rezija.iznos +"</td>"+
                        "</tr>")
                    })
                   
                  $(".switch-input").prop('checked', rezijePlacanje.placeno);
                  $(".switch-input").prop('disabled', rezijePlacanje.placeno);
                }
            })
        })
     })
     .catch(err => {
       console.log(err)
     })

}

dohvatiDetaljeRezija();
 
 
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


function SwitchPlacanje() {
  $('.switch-input').on('change', function() {
    var isChecked = $(this).is(':checked');

    if(isChecked) {
      AzurirajStanjeRezije(rezijeArray, isChecked)
    } 
  });
};
  
async function AzurirajStanjeRezije(rezijeArray, isChecked){
  let query = window.location.search
  let params = new URLSearchParams(query)
  let najamId = params.getAll("najamID")[0] 
  let rezijeIndex = params.getAll("rezijeID")[0] 

  rezijeArray[rezijeIndex].placeno = isChecked;

  console.log(rezijeArray)

  try{
    let response = await fetch(`http://127.0.0.1:5000/api/najmovi/placanje/${najamId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(rezijeArray)
    })
  }catch(err){
      console.log(err)
  }
}