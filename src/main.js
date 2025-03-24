import { fetchImages } from './js/pixabay-api';
import { renderImages, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let searchQuery = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = event.target.elements.searchQuery.value.trim();

  if (!searchQuery) {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.classList.add('hidden');

  try {
    loader.classList.remove('hidden');
    const data = await fetchImages(searchQuery, page, perPage);

    if (data.hits.length === 0) {
      iziToast.warning({ title: 'No Results', message: 'No images found' });
      return;
    }

    renderImages(data.hits);
    loadMoreBtn.classList.toggle('hidden', data.totalHits <= perPage);
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong' });
  } finally {
    loader.classList.add('hidden');
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    loader.classList.remove('hidden');
    const data = await fetchImages(searchQuery, page, perPage);

    renderImages(data.hits);

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong' });
  } finally {
    loader.classList.add('hidden');
  }
});

function smoothScroll() {
  const cardHeight =
    document.querySelector('.gallery .photo-card')?.getBoundingClientRect()
      .height || 0;
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
}
