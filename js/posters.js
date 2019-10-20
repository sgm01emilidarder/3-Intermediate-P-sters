function printCards(pList) {
  let content = document.querySelector('#peliculas');
  content.innerHTML = '';
  for (let list of pList) {

    content.innerHTML += `
            <div class="col-4 d-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img src=${list.imagen} class="card-img-top card-image" alt="...">
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">${list.titulo}</h5>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.duracion}</p>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.director}</p>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.genero}</p>
                </div>
                <div class="card-header d-flex justify-content-center">
                  Actores
                </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-center">${list.actores}</li>
                  </ul>
                </div>
              </div>
            </div>
        `
  }
}

function printCards2(sList) {
  let content = document.querySelector('#series');
  content.innerHTML = '';
  for (let list of sList) {

    content.innerHTML += `
            <div class="col-4 d-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img src=${list.serieimagen} class="card-img-top card-image" alt="...">
                <div class="card-body">
                  <h5 class="card-title d-flex justify-content-center">${list.titulo}</h5>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.duracion}</p>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.director}</p>
                  <p class="card-text d-flex justify-content-center">Duración: ${list.genero}</p>
                </div>
                <div class="card-header d-flex justify-content-center">
                  Actores
                </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-center">${list.actores}</li>
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
      console.log(data);
      printCards(data);
    });
}

function getSeries() {
  fetch('js/series.xml')
    .then(result => result.text())
    .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
    .then(data => {
      console.log(data);
      printCards2(data);
    });
}
