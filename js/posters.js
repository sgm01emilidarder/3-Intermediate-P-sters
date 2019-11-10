let content = document.querySelector('#peliculas2');
let content2 = document.querySelector('#series2');

function printCards(pList) {
  content.innerHTML = '';
  for (let list of pList.peliculas) {
    let actores = "";
    list.actores.forEach(function(e) {
      actores += `<li class="list-group-item d-flex justify-content-center">${e.actor}</li>`;
      return actores;
    });
    content.innerHTML += `

            <div class="col-4 d-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img src="${list.imagen}" class="card-img-top card-image" alt="...">
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">${list.titulo}</h5>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.duracion}</p>
                  <p class="card-text d-flex justify-content-center">Director: ${list.director}</p>
                  <p class="card-text d-flex justify-content-center">Género: ${list.genero}</p>
                </div>
                <div class="card-header d-flex justify-content-center">
                  Actores
                </div>
                  <ul class="list-group list-group-flush">
                    ${actores}
                  </ul>
                <div class="card-body d-flex justify-content-center">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pedido" onclick="myModal(${list.id}, '${list.titulo}', '${list.precio}')">Comprar</button>
                </div>
              </div>
            </div>
        `
  }
}

// function printCards2(sList) {
//   content2.innerHTML = '';
//   for (let list of sList.series) {
//     let actores = "";
//     list.actores.forEach(function(e) {
//       actores += `<li class="list-group-item d-flex justify-content-center">${e.actor}</li>`;
//       return actores;
//     });
//     content2.innerHTML += `
//
//             <div class="col-4 d-flex justify-content-center">
//               <div class="card" style="width: 18rem;">
//                 <img src="${list.imagen}" class="card-img-top card-image" alt="...">
//                 <div class="card-body">
//                   <h5 class="card-title d-flex justify-content-center">${list.titulo}</h5>
//                   <p class="card-text d-flex justify-content-center">Temporadas: ${list.temporadas}</p>
//                   <p class="card-text d-flex justify-content-center">Director: ${list.director}</p>
//                   <p class="card-text d-flex justify-content-center">Género: ${list.genero}</p>
//                 </div>
//                 <div class="card-header d-flex justify-content-center">
//                   Actores
//                 </div>
//                 <ul class="list-group list-group-flush">
//                   ${actores}
//                 </ul>
//               <div class="card-body d-flex justify-content-center">
//                 <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pedido" onclick="myModal(${list.id}, '${list.titulo}', '${list.precio}')">Comprar</button>
//               </div>
//             </div>
//           </div>
//
//         `
//   }
// }

function printCards2(sList) {
  content2.innerHTML = '';
  for (let list of sList) {
    let actores = "";
    list.actores.forEach(function(e) {
      actores += `<li class="list-group-item d-flex justify-content-center">${e.actor}</li>`;
      return actores;
    });
    content2.innerHTML += `

            <div class="col-4 d-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img src="${list.imagen}" class="card-img-top card-image" alt="...">
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">${list.titulo}</h5>
                  <p class="card-text d-flex justify-content-center">Temporadas: ${list.temporadas}</p>
                  <p class="card-text d-flex justify-content-center">Director: ${list.director}</p>
                  <p class="card-text d-flex justify-content-center">Género: ${list.genero}</p>
                </div>
                <div class="card-header d-flex justify-content-center">
                  Actores
                </div>
                <ul class="list-group list-group-flush">
                  ${actores}
                </ul>
              <div class="card-body d-flex justify-content-center">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pedido" onclick="myModal(${list.id}, '${list.titulo}', '${list.precio}')">Comprar</button>
              </div>
            </div>
          </div>

        `
  }
}


function getMovies() {
  fetch('js/posters.json')
    .then(result => result.json())
    .then(data => {
      printCards(data);
    });
}

// function getSeries() {
//   fetch('js/posters.json')
//     .then(result => result.json())
//     .then(data => {
//       printCards2(data);
//     });
// }

function getSeries() {
  $.ajax({
    type: "GET",
    url: "js/series.xml",
    dataType: "xml",
    success: function(xml) {
      printXMLtoJson(xml);
    },
    error: function() {
      alert("Error en lectura del XML");
    }
  })
};

function printXMLtoJson(xml) {
  let seriesList = [];
  $(xml).find('serie').each(function() {
    let serie = {
      "id": $(this).find('id').text(),
      "titulo": $(this).find('titulo').text(),
      "temporadas": $(this).find('temporadas').text(),
      "director": $(this).find('director').text(),
      "genero": $(this).find('genero').text(),
      "imagen": $(this).find('imagen').text(),
      "precio": $(this).find('precio').text(),
      "actores": ''
    };

    let actoresList = [];
    $(this).find('actor').each(function() {
      actoresList.push({
        "actor": $(this).text()
      });
    });
    serie.actores = actoresList;

    seriesList.push(serie);
  });
  console.log(seriesList);
  printCards2(seriesList);
};

function myModal(id, nombre, precio) {
  $("#ped_poster").val(nombre);
  $("#ped_precio").val(precio + "€");
  $("#ped_cantidad").val(1);
  $("#ped_cantidad").change(function() {
    $("#ped_precio").val((precio * $("#ped_cantidad").val()) + "€");
  })

};

let pedido = JSON.parse(localStorage.getItem("carrito"));

function addToLocalStorage() {
  if (pedido === null) {
    pedido = {
      "item": []
    };
  }
  pedido.item.push({
    "poster": $("#ped_poster").val(),
    "precio": $("#ped_precio").val(),
    "cantidad": $("#ped_cantidad").val()
  })
  localStorage.setItem("carrito", JSON.stringify(pedido));
  $('#pedido').click().hide();
}

function printLocalStorage() {
  document.getElementById("tCarrito").innerHTML = '';
  document.getElementById("totalCompra").innerHTML = '0€';
  let precio = 0;
  let precioSinE = "";
  let precioNum = 0;
  let objStorage = JSON.parse(localStorage.getItem("carrito"));
  for (let item of objStorage.item) {
    document.getElementById("tCarrito").innerHTML += `
      <tr>
        <th scope="row">${item.poster}</th>
        <td>${item.cantidad}</td>
        <td>${item.precio}</td>
      </tr>
    `;

    precioSinE = item.precio.replace('€', '');
    precioNum = parseInt(precioSinE, 10);
    precio += precioNum;
  }
  document.getElementById("totalCompra").innerHTML = `
    ${precio + '€'}
  `;
}

function deleteLocalStorage() {
  localStorage.removeItem("carrito");
  printLocalStorage();
}
