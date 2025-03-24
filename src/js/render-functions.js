import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery;
let lightbox;

// Очікуємо завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
  gallery = document.querySelector('.gallery');

  if (!gallery) {
    console.error('Gallery element not found in the DOM');
    return;
  }
});

// Функція для рендерингу зображень
export function renderImages(images) {
  if (!gallery) return;

  // Перевіряємо, чи масив не порожній
  if (!Array.isArray(images) || images.length === 0) {
    console.warn('No images found');
    return;
  }

  clearGallery(); // Очищуємо галерею перед рендерингом нових зображень

  // Створюємо розмітку карток зображень
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a href="${largeImageURL}" class="gallery-link">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </li>
      `
    )
    .join('');

  // Додаємо розмітку в галерею
  gallery.insertAdjacentHTML('beforeend', markup);

  // Оновлюємо або створюємо SimpleLightbox
  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    setTimeout(() => lightbox.refresh(), 100);
  }
}

// Функція очищення галереї
export function clearGallery() {
  if (!gallery) return;
  gallery.innerHTML = '';
}
