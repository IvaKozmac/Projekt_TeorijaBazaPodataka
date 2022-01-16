function dohvatiNajmove() {
  let prijavljeniKorisnik = DohvatiPodatkeIzCookija();

  fetch(`http://127.0.0.1:5000/api/najmovi/user/${prijavljeniKorisnik.email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    data.json().then((najmovi) => {
      // Generiraj najam
      najmovi.map((najam) => {
        $("#najmoviContainer").append(
          "<div class='najam'>" +
            "<figure class='box-najam'>" +
            "<img class='najam-slika' src='multimedija/najam.jpg' alt='Najam1'>" +
            "</figure>" +
            `<h3 class='najam-title'>${najam.naziv}</h3>` +
            "<a class='button_informacije' href='/detaljiNajma.html?id=" +
            najam.id +
            "'>Detalji o najmu</a>" +
            "</div>"
        );
      });
    });
  });
}

dohvatiNajmove();

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
