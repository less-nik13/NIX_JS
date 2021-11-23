import createElement from './createElement.js';
import { fallbackData } from './helpers.js';
import { modal } from "./mainPages.js";

export function showModal(film) {
    const filmCard = createElement('div', 'class', 'modal__card');
    const filmContentWrapper = createElement('div', 'class', 'modal__card-content');
    const filmImage = createElement('img', 'class', 'modal__card-image');
    const filmTitle = createElement('h2', 'class', 'modal__card-title');
    const filmSummary = createElement('div', 'class', 'modal__card-summary');
    const filmRating = createElement('h3', 'class', 'modal__card-rating');
    const filmPremiere = createElement('p', 'class', 'modal__card-premiere');
    const filmLanguage = createElement('p', 'class', 'modal__card-language');
    const filmGenres = createElement('ul', 'class', 'modal__card-genres');
    const modalClose = createElement('div', 'class', 'modal__close-btn');

    const {
        name,
        language,
        premiered,
        average,
        summary,
        image,
        genres
    } = fallbackData(film);

    genres.forEach((genre) => {
        const filmGenre = createElement('li', 'class', 'modal__card-genres-item');
        filmGenre.innerText = genre;
        filmGenres.append(filmGenre);
    });

    document.body.style.overflow = 'hidden';
    modal.classList.remove('modal__overlay--hide');
    modal.classList.add('modal__overlay--show');

    modalClose.addEventListener('click', () => {
        modal.classList.add('modal__overlay--hide');
        modal.classList.remove('modal__overlay--show');
        modal.innerHTML = '';
        document.body.style.overflowY = 'scroll';
    });

    filmImage.setAttribute('src', `${image}`);
    filmImage.setAttribute('alt', `${name}`);
    filmTitle.innerText = name;
    filmSummary.innerHTML = summary;
    filmLanguage.innerText = `Language: ${language}`;
    filmRating.innerText = `Rating : ${average}`;
    filmPremiere.innerText = `Premiere: ${premiered}`;
    filmContentWrapper.append(
        filmTitle,
        filmLanguage,
        'Genre: ',
        filmGenres,
        filmSummary,
        filmRating,
        filmPremiere,
    );
    filmCard.append(filmImage, filmContentWrapper, modalClose);
    modal.append(filmCard);
}


