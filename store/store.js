console.log(sessionStorage.getItem("user_token"));

const myHeaders = new Headers({
  "Content-Type": "application/json",
  user_token: sessionStorage.getItem("user_token"),
});

var products = [];
fetch("http://localhost:3000/", {
  method: "GET",
  headers: myHeaders,
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    products = data;
  })
  .then(() => getdata(products))
  .then(() => getdata2(products));

// console.log(localStorage.getItem("products"))  No guarda la peticion en local storage

function getdata(products) {
  document.getElementById("app").innerHTML = `${products
    .map(function (prod, index) {
      return `

          <div class="card mx-2" style="width: 18rem;">
          <img class="card-img-top" src="${prod.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">precio: ${prod.precio}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>

              `;
    })
    .join("")}`;
}

function getdata2(products) {
  var returnRopa = [];
  products
    .map(function order(prod) {
      switch (prod.categoria) {
        case "ropa":
          returnRopa += `
          <div class="card mx-2" style="width: 18rem;">
          <img class="card-img-top" src="${prod.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">precio: ${prod.precio}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>
      `;
          document.getElementById("ropa").innerHTML = returnRopa;
          console.log(returnRopa);
          break;

        case "papeleria":
          document.getElementById(
            "pape"
          ).innerHTML = `
          <div class="card mx-2" style="width: 18rem;">
          <img class="card-img-top" src="${prod.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">precio: ${prod.precio}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>
      `;

          break;

        case "stickers":
          document.getElementById(
            "stickers"
          ).innerHTML = `
          <div class="card mx-2" style="width: 18rem;">
          <img class="card-img-top" src="${prod.img}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${prod.nombre}</h5>
            <p class="card-text">precio: ${prod.precio}</p>
            <a href="#" class="btn btn-primary">Comprar</a>
          </div>
        </div>
      `;

          break;
      }
    })
    .join("");
}
