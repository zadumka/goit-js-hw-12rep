import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loader = document.querySelector('.loader');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  loader.style.display = 'block';
  clearGallery();

  try {
    const images = await fetchImages(query);
    if (images.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderImages(images);
    }
  } catch (error) {
    iziToast.error({ message: 'Failed to fetch images. Try again later.' });
  } finally {
    loader.style.display = 'none';
  }
});
