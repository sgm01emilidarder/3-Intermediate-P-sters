let content = document.querySelector('#peliculas');

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
                <img src=${list.imagen} class="card-img-top card-image" alt="...">
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
                </div>
              </div>
            </div>
        `
  }
}

function printCards2(sList) {
  content.innerHTML = '';
  for (let list of sList.series) {
    let actores = "";
    list.actores.forEach(function(e) {
      actores += `<li class="list-group-item d-flex justify-content-center">${e.actor}</li>`;
      return actores;
    });
    content.innerHTML += `
            <div class="col-4 d-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img src=${list.imagen} class="card-img-top card-image" alt="...">
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

function getSeries() {
  fetch('js/posters.json')
    .then(result => result.json())
    .then(data => {
      printCards2(data);
    });
}
