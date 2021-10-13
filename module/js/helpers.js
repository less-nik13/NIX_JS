import { createCard } from './createCard.js';
import { message } from './index.js';

export function sliceFilms(films, limit, genre, language) {
    const slicedData = films.map((el) => (el.show ? el.show : el));

    if (genre === 'All' && language === 'All') {
        return slicedData.slice(0, limit);
    }

    if (genre !== 'All' && language !== 'All') {
        return slicedData
            .filter((film) => film.genres.includes(genre) && film.language === language)
            .slice(0, limit);
    }

    if (genre !== 'All' && language === 'All') {
        return slicedData.filter((film) => film.genres.includes(genre)).slice(0, limit);
    }

    if (language !== 'All' && genre === 'All') {
        return slicedData.filter((film) => film.language === language).slice(0, limit);
    }
}

export function checkEmptyFilms(films, filmsLimit, genre, language) {
    const filteredFilms = films.length ? sliceFilms(films, filmsLimit, genre, language) : [];
    if (filteredFilms.length) {
        message.style.display = 'none';
    } else {
        message.innerText = 'Films Not Found';
        message.style.display = 'block';
    }
    createCard(filteredFilms);
}

export function trimText(text) {
    return text.slice(0, 300) + '...';
}
