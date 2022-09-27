fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => {
    let menu = document.getElementById('usersnames');
    let opciones = '';
    json.forEach(user => {
      opciones += `<option value = "${user.id}">${user.username}</option>`
    });
    menu.innerHTML = "<option value=''>- Selecione un username -</option>" + opciones;
  });

let menuUS = document.getElementById('usersnames');
menuUS.addEventListener('change', () => {
fetch('https://jsonplaceholder.typicode.com/albums?userId=' + menuUS.value)
  .then (response => response.json())
  .then (json => {
    if(menuUS.value != ""){
      let menu = document.getElementById('userAlbums');
      let opciones = '';
      json.forEach(album => {
        opciones += `<option value = "${album.id}">${album.title}</option>`
      });
      menu.innerHTML = "<option value=''>- Selecione un album -</option>" + opciones;
    }
  });
});

let menuAL = document.getElementById('userAlbums');
menuAL.addEventListener('change', () => {
fetch('https://jsonplaceholder.typicode.com/albums/' + menuAL.value + '/photos')
  .then (response => response.json())
  .then (json => {
    if(menuAL.value != ""){
      let menu = document.getElementById('fotos');
      let opciones = '';
      json.forEach(photo => {
        opciones += `
        <br>
        <div id="photo${photo.id}">
          <img src="${photo.thumbnailUrl}" width="150" height="150">
          <button type="button" onclick="mostrarFoto(${photo.id})">Mostrar Foto</button>
        </div>`;
      });
      menu.innerHTML = opciones;
    }
  });
});

function mostrarFoto(id) {
  fetch('https://jsonplaceholder.typicode.com/photos?id=' + id)
    .then (response => response.json())
    .then (json => {
      let photo = document.getElementById('photo' + id);
      let photo2 = '';
      json.forEach(photo => {
        photo2 += `
        <br>
        <img src="${photo.url}" width="600" height="600">
        <button type="button" onclick="ocultarFoto(${photo.id})">Ocultar Fotro</button>`;
      });
      photo.innerHTML = photo2;
  });
};

function ocultarFoto(id) {
  fetch('https://jsonplaceholder.typicode.com/photos?id=' + id)
    .then (response => response.json())
    .then (json => {
      let photo = document.getElementById('photo' + id);
      let photo2 = '';
      json.forEach(photo => {
        photo2 += `
        <img src="${photo.thumbnailUrl}" width="150" height="150">
        <button type="button" onclick="ocultarFoto(${photo.id})">Ocultar Fotro</button>`;
      });
      photo.innerHTML = photo2;
  });
};