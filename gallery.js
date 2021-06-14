import galleryItems from "./app.js";

//1

const galleryImages = document.querySelector('.js-gallery');
function create(images) {
  return images.map(({preview,original,description}) =>
  {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="#"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('') 
};
const imagesMarkup = create(galleryItems);
galleryImages.insertAdjacentHTML("beforeend", imagesMarkup);

//2

galleryImages.addEventListener('click', onImageClick);

const modalImage = document.querySelector('.lightbox__image')

const largeImgLink = document.querySelector('.gallery__link');

const modalOpen = document.querySelector('.lightbox');

const originalImagesArrow = [];

for (const item of galleryItems) {
  originalImagesArrow.push(item.original);
};

let idxOfOpenedImage = originalImagesArrow.indexOf(modalImage.src);

function onImageClick(evt) {
  if (!evt.target.classList.contains('gallery__image')) {
    return
  } else {
    
// 3
    
    modalOpen.classList.add('is-open');
    
    //4
    modalImage.src = evt.target.dataset.source;
    modalImage.alt = evt.target.alt;

    //7

    window.addEventListener('keydown', onRightKeyClick);
    window.addEventListener('keydown', onLeftKeyClick);

    onRightKeyClick(evt);
    onLeftKeyClick(evt);
  };
}

function onRightKeyClick(evt) {
  if (evt.keyCode === 39 && idxOfOpenedImage < originalImagesArrow.length-1) {
      modalImage.src = originalImagesArrow[idxOfOpenedImage += 1]
    }
  }

function onLeftKeyClick(evt) {
  if (evt.keyCode === 37 && idxOfOpenedImage > 0) {
      modalImage.src = originalImagesArrow[idxOfOpenedImage -= 1]
    }
}
      
//5

const onCloseBtnClick = document.querySelector('.lightbox__button');

onCloseBtnClick.addEventListener('click', closeModal);

const onOverlayClick = document.querySelector('.lightbox__overlay');

onOverlayClick.addEventListener('click', closeModal);

window.addEventListener('keydown', closeModalOnEscKeyClick);

function closeModal() {
  modalOpen.classList.remove('is-open');
  window.removeEventListener('keydown', onRightKeyClick);
  window.removeEventListener('keydown', onLeftKeyClick);

  //6
  
  modalImage.src = "";
  modalImage.alt = "";
}

function closeModalOnEscKeyClick(evt) {
  if (evt.keyCode === 27) {
    closeModal();
  }
}

