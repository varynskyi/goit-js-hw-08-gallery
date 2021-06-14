 // Создание и рендер разметки по массиву данных и предоставленному шаблону.
  // Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
  // Открытие модального окна по клику на элементе галереи.
  // Подмена значения атрибута src элемента img.lightbox__image.
  // Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того,
  // чтобы при следующем открытии модального окна, пока грузится изображение,
  //мы не видели предыдущее.
  //  Закрытие модального окна по клику на div.lightbox__overlay.
  // Закрытие модального окна по нажатию клавиши ESC.
  // Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import galleryItems from './app.js';
const galleryEl = document.querySelector('.js-gallery');
const cardsMarkup = createImgCardsMarkup(galleryItems);

function createImgCardsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description } = {}, index) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href=${original}
      >
      <img
        class="gallery__image"
        src=${preview}
        data-source=${original}
        data-index = ${index}
        alt=${description}
      />
    </a>
  </li>`;
    })
    .join('');
}

galleryEl.innerHTML = cardsMarkup;


const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImgEl = document.querySelector('.lightbox__image');
const closeButton = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

galleryEl.addEventListener('click', onCardClick);
lightboxEl.addEventListener('click', onlightboxElClick);
window.addEventListener('keyup', onKeyboardEvent);

function onCardClick(evt) {
  evt.preventDefault();

  const ifGalleryImg = evt.target.classList.contains('gallery__image');
  if (!ifGalleryImg) {
    return;
  }
  openModal(evt.target.dataset.source, evt.target.dataset.index);
}

function onlightboxElClick(evt) {
  const ifcloseButton = evt.target === closeButton;
  const iflightboxOverlay = evt.target === lightboxOverlay;

  if (!ifcloseButton && !iflightboxOverlay) {
    return;
  }

  closeModal();
}

function onKeyboardEvent(evt) {
  const ifEsc = evt.code === 'Escape';
  const ifArrowRight = evt.code === 'ArrowRight';
  const ifArrowLeft = evt.code === 'ArrowLeft';

  if (ifEsc) {
    closeModal(evt);
  }

  if (ifArrowRight || ifArrowLeft) {
    showNextImg(ifArrowRight);
  }
}

function openModal(src, index) {
  lightboxEl.classList.add('is-open');
  lightboxImgEl.setAttribute('data-index', index);
  lightboxImgEl.src = src;
}

function closeModal() {
  lightboxEl.classList.remove('is-open');
  lightboxImgEl.src = '';
}

function showNextImg(toRight) {
  let index;

  index = toRight
    ? Number(lightboxImgEl.dataset.index) + 1
    : Number(lightboxImgEl.dataset.index) - 1;

  if (index < 0) {
    index = galleryItems.length + index;
  }

  if (index === galleryItems.length) {
    index = 0;
  }

  lightboxImgEl.src = galleryItems[index].original;
  lightboxImgEl.dataset.index = index;
}