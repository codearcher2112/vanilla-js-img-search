const API_URL = 'https://pixabay.com/api/?key=9412459-0ee8cc73665e71787cd003eae';
const form = document.querySelector('form');
const input = document.querySelector('input');
const loadingImage = document.querySelector('#loadingImage');
const imageSection = document.querySelector('.images');

loadingImage.style.display = 'none';

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  const searchTerm = input.value;
  
  searchStart();

  search(searchTerm)
    .then(displayImages)
    .then(() => {
      loadingImage.style.display = 'none';
    });
}

function searchStart() {
  loadingImage.style.display = '';
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  const url = `${API_URL}&q=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.hits;
    });  
}

function displayImages(images) {
  images.forEach(image => {
    // console.log(image.largeImageURL);
    const imageElement = document.createElement('img');
    imageElement.src = image.largeImageURL;
    imageSection.appendChild(imageElement);
  });
}