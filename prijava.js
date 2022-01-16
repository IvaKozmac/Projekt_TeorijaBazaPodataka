//eventListener na submit click
$(document).ready(() => {
  $("#prijavaButton").on("click", (e) => {
    e.preventDefault();

    Prijava();
  });
});

async function Prijava() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  fetch(`http://127.0.0.1:5000/api/korisnici/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      // prijava uspješna
      if (data[0].lozinka === password) {
        document.cookie = `najmoviWebToken=true;`;
        document.cookie = `loginEmail=${data[0].email};`;
        document.cookie = `loginId=${data[0].idKorisnika};`;
        document.cookie = `uloga=${data[0].ulogaKorisnika};`;

        window.location.replace("/pregledNajmova.html");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}