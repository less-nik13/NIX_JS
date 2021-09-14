import { createElement } from './create-element.js';
import { fallbackSummary, fallbackImage } from './constants.js';
import { trimText } from './helpers.js';

const modal = document.getElementById('modal');

export function showModal(film) {
    // ------------- ADD TOGGLE CLASS
    modal.classList.remove('hideModal');
    modal.classList.add('showModal');
    document.body.style.overflow = 'hidden';

    let {
        name,
        genres,
        language,
        premiered,
        rating: { average },
        summary,
        image,
    } = film;

    const filmCard = createElement('div', 'class', 'modal__card');
    const filmContentWrapper = createElement('div', 'class', 'modal__content-wrapper');
    const filmImage = createElement('img', 'class', 'modal__card-image');
    const filmTitle = createElement('h2', 'class', 'modal__card-title');
    const filmSummary = createElement('div', 'class', 'modal__card-summary');
    const filmRating = createElement('h3', 'class', 'modal__card-rating');
    const filmPremiere = createElement('p', 'class', 'modal__card-premiere');
    const filmLanguage = createElement('p', 'class', 'modal__card-language');
    const filmGenres = createElement('ul', 'class', 'modal__card-genres');

    genres.length > 0
        ? genres.forEach((element) => {
              const filmGenre = createElement('li', 'class', 'modal__card-genres-item');
              filmGenre.innerText = element;
              filmGenres.append(filmGenre);
          })
        : filmGenres.append('unknown');

    //---------------CHANGE
    image
        ? filmImage.setAttribute('src', `${image.original}`)
        : filmImage.setAttribute('src', `${fallbackImage}`);

    filmImage.setAttribute('alt', `${name}`);

    filmTitle.innerText = name;

    summary === null || summary.length < 300 ? (summary += fallbackSummary) : summary;
    filmSummary.innerHTML = trimText(summary);

    filmRating.innerText = `Rating : ${
        average === null ? (Math.random() * 10).toFixed(2) : average
    }`;

    filmPremiere.innerText = `Premiere: ${
        premiered === null ? new Date().toISOString().slice(0, 10) : premiered
    }`;

    filmLanguage.innerText = `Language: ${language}`;

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

modal.addEventListener('click', function (e) {
    if (!e.target.closest('.modal__card')) {
        modal.classList.add('hideModal');
        modal.classList.remove('showModal');
        modal.innerHTML = '';
        document.body.style.overflowY = 'scroll';
    }
});
