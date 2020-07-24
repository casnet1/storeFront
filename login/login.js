$(".login").hide();
$(".loginButton").css("background", "none");

$(".loginButton").click(function () {
  $(".registro").hide();
  $(".login").show();
  $(".signupButton").css("background", "none");
  $(".loginButton").css("background", "#fff");
});

$(".signupButton").click(function () {
  $(".registro").show();
  $(".login").hide();
  $(".loginButton").css("background", "none");
  $(".signupButton").css("background", "#fff");
});

function login() {
  var formLogin = document.getElementById(`login`);
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    var datos = new FormData(formLogin);

    let correo = datos.get("correo");
    let pass = datos.get("pass");

    fetch("http://localhost:3000/singIN", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: correo,
        pass: pass,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        document.cookie = "user_token=" + data.succesfull;
        sessionStorage.setItem("user_token", data.succesfull);

        console.log(sessionStorage.getItem("user_token"));
        location.replace("../store/store.html");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
          footer: err,
        });
      });
  });
}

function Registro() {
  var formRegistro = document.getElementById(`registro`);
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    var datos = new FormData(formRegistro);

    let correo = datos.get("correo");
    let pass = datos.get("pass");
    let name = datos.get("name");

    fetch("http://localhost:3000/singUP", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correo: correo,
        pass: pass,
        name: name,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        Swal.fire(
          "Nuevo Usuario Registrado",
          "Gracias por formar parte de nosotros",
          "success"
        );
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salio mal!",
          footer: err,
        });
      });
  });
}
