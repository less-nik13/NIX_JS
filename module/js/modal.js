import createElement from './createElement.js';
import {fallbackSummary, fallbackImage} from './constants.js';
import {trimText} from './helpers.js';

const modal = document.getElementById('modal');

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

    let {
        name,
        genres,
        language,
        premiered,
        rating: {average},
        summary,
        image,
    } = film;

    document.body.style.overflow = 'hidden';
    modal.classList.remove('modal__overlay--hide');
    modal.classList.add('modal__overlay--show');

    // FALLBACK GENRE
    if (genres.length > 0) {
        genres.forEach((genre) => {
            const filmGenre = createElement('li', 'class', 'modal__card-genres-item');
            filmGenre.innerText = genre;
            filmGenres.append(filmGenre);
        });
    } else {
        filmGenres.append('unknown');
    }

    // FALLBACK IMAGE
    if (image) {
        filmImage.setAttribute('src', `${image.original}`);
    } else {
        filmImage.setAttribute('src', `${fallbackImage}`);
    }

    // FALLBACK SUMMARY
    if (!summary) {
        summary = fallbackSummary;
    } else if (summary.length < 300) {
        summary += fallbackSummary;
    }

    // FALLBACK FILM RATING
    if (!average) {
        average = (Math.random() * 10).toFixed(1);
    }

    // FALLBACK FILM PREMIERE
    if (!premiered) {
        premiered = new Date().toISOString().slice(0, 10);
    }

    filmImage.setAttribute('alt', `${name}`);
    filmTitle.innerText = name;
    filmSummary.innerHTML = trimText(summary);
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
    filmCard.append(filmImage, filmContentWrapper);
    modal.append(filmCard);
}

// HIDE MODAL CARD, WHEN CLICK ON EMPTY SPACE
modal.addEventListener('click', (e) => {
    if (!e.target.closest('.modal__card')) {
        modal.classList.add('modal__overlay--hide');
        modal.classList.remove('modal__overlay--show');
        modal.innerHTML = '';
        document.body.style.overflowY = 'scroll';
    }
});
