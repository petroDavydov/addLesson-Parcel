import { galleryItems } from "./js/gallery-items";
import refs from "./js/refs";
import createGallery from "./templates/gallery-template.hbs";

let activeIndex = null; // стрелки

refs.gallery.insertAdjacentHTML("beforeend", createGallery(galleryItems));

refs.gallery.addEventListener("click", onOpenModal);

function onOpenModal(e) {
  e.preventDefault();
  const { nodeName, alt, dataset, src } = e.target;

  if (nodeName !== "IMG") {
    return;
  }
  galleryItems.forEach((el, ind) => {
    if (el.preview === src) {
      activeIndex = ind;
    }
  });

  refs.modal.classList.add("is-open");
  refs.modalImg.src = dataset.source;
  refs.modalImg.alt = alt;
  window.addEventListener("keydown", keyboardManipulation);
}

refs.modal.addEventListener("click", closeModal);

function closeModal(e) {
  if (e?.target.nodeName === "IMG") {
    return;
  }
  refs.modal.classList.remove("is-open");
  refs.modalImg.src = "#";
  refs.modalImg.alt = "#"; //ставить решетку не обязательно
  window.removeEventListener("keydown", keyboardManipulation);
}

function keyboardManipulation({ key }) {
  switch (key) {
    case activeIndex < galleryItems.length - 1 && "ArrowRight":
      activeIndex += 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;

    case activeIndex > 0 && "ArrowLeft":
      activeIndex -= 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;

    case activeIndex === galleryItems.length - 1 && "ArrowRight":
      activeIndex = 0;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;

    case activeIndex === 0 && "ArrowLeft":
      activeIndex = galleryItems.length - 1;
      refs.modalImg.src = galleryItems[activeIndex].original;
      break;

    case "Escape":
      closeModal();
      break;

    default:
      return;
  }
}

// ===========

window.addEventListener("keydown", openModalByEnter);

function openModalByEnter(e) {
  if (e.key !== "Enter") {
    return;
  }

  if (e.target.classList.contains("gallery__link")) {
    refs.modalImg.src = e.target.href;
    refs.modal.classList.add("is-open");
    window.addEventListener("keydown", keyboardManipulation);
  }
}
