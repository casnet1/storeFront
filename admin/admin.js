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
  .then(() => getdata(products));

function getdata(products) {
  document.getElementById("app").innerHTML = `${products
    .map(function (prod) {
      return `<form class="card mx-2" style="width: 18rem;" id="updateform-${prod.clave}">
              <img class="card-img-top" src="${prod.img}" alt="Card image cap">

                <input type="text" name="nombre"  value="${prod.nombre}"><br>
                <input type="text" name="precio"  value="${prod.precio}"><br>
                <input type="text" name="categoria"  value="${prod.categoria}"><br>
                <input type="text" name="img"   value="${prod.img}"><br>
               
                <input type="submit" class="btn btn-primary" onclick="updateData(${prod.clave})" value="actualizar">
                <input type="button" class="btn btn-secondary mt-2" onclick="deleteData(${prod.clave})" value="borrar">
             
             
             
                </form>
                `;
    })
    .join("")}`;
}

var formNew = document.getElementById("formNew");
formNew.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("me diste un click");

  var datos = new FormData(formNew);
  console.log(datos.get("nombre"));
  let clave;
  let nombre = datos.get("nombre");
  let precio = datos.get("precio");
  let img = datos.get("img");
  let categoria = datos.get("categoria");

  fetch("http://localhost:3000/admin/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      user_token: sessionStorage.getItem("user_token"),
    },
    body: JSON.stringify({
      clave: 0,
      nombre: nombre,
      precio: precio,
      img: img,
      categoria: categoria,
    }),
  })
    .then((res) => {
      console.log(res);
    })
    .then((data) => {
      console.log(data);
    });
  location.reload();
});

function deleteData(item) {
  return fetch("http://localhost:3000/admin/del/" + item, {
    method: "delete",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      user_token: sessionStorage.getItem("user_token"),
    },
  })
    .then((res) => {
      location.reload();
      return res.json();
    })
    .then((data) => {
      products = data;
    });
}

function updateData(item) {
  var formUpdate = document.getElementById(`updateform-${item}`);
  console.log(formUpdate);
  formUpdate.addEventListener("submit", function (e) {
    console.log(item);
    e.preventDefault();

    var datos = new FormData(formUpdate);

    let clave = item;
    let nombre = datos.get("nombre");
    let precio = datos.get("precio");
    let img = datos.get("img");
    let categoria = datos.get("categoria");

    fetch("http://localhost:3000/admin/" + item, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        user_token: sessionStorage.getItem("user_token"),
      },
      body: JSON.stringify({
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        likes: 0,
        img: img,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        console.log(data);
      });
    location.reload();
  });
}
