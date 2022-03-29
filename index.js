let url =
  'https://api.unsplash.com/photos/?client_id=RQ99ba0XJaFvhdnATy1ENj1Or_iOdqf0GfQkkXIB0CE';
let searchUrl = (query) =>
  `https://api.unsplash.com/search/photos?query=${query}&client_id=RQ99ba0XJaFvhdnATy1ENj1Or_iOdqf0GfQkkXIB0CE`;
let root = document.querySelector('.images');
let searchElm = document.querySelector('input');

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => successHandler(JSON.parse(xhr.response));

  xhr.onerror = () => {
    console.log(`Something went wrong`);
  };
  xhr.send();
}

function displayImages(images) {
  root.innerHTML = '';
  images.forEach((image) => {
    let li = document.createElement('li');
    let img = document.createElement('img');
    img.src = image.urls.small;
    li.append(img);
    root.append(li);
  });
}

fetch(url, displayImages);

function handleSearch(event) {
  if (event.keyCode == 13 && searchElm.value) {
    fetch(searchUrl(searchElm.value), (searchResult) => {
      displayImages(searchResult.results);
    });
    searchElm.value = '';
  }
}

searchElm.addEventListener('keydown', handleSearch);
