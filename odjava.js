$(document).ready(() => {
  ProvjeriJeLiKorisikLogiran();

  $("#btnOdjava").on("click", (e) => {
    Odjava();
  });
});

function ProvjeriJeLiKorisikLogiran () {
  let cookies = document.cookie;
  let cookiesArray = cookies.split(" ");

  let tokenCookieString = cookiesArray.find((x) =>
    x.includes("najmoviWebToken")
  );

  if (tokenCookieString === undefined || tokenCookieString == "") window.location.replace("/prijava.html");

  let token = tokenCookieString?.split("=")[1];

  if (token === undefined || token == false) window.location.replace("/prijava.html");
};

function Odjava() {
  document.cookie = "najmoviWebToken=; expires=Thu, 01 Jan 1969 00:00:00 UTC;";
  document.cookie = "loginEmail=; expires=Thu, 01 Jan 1969 00:00:00 UTC;";
  document.cookie = "loginId=; expires=Thu, 01 Jan 1969 00:00:00 UTC;";
  document.cookie = "uloga=; expires=Thu, 01 Jan 1969 00:00:00 UTC;";
  window.location.replace("/prijava.html");
}