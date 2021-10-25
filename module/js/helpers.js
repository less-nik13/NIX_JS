import { fallbackImage, fallbackSummary } from "./constants.js";
import { createCard } from './createCard.js';

export function sliceFilms(films, limit, genre, language) {
    const slicedData = films.map((el) => (el.show ? el.show : el));

    if(genre !== 'All' && language !== 'All') {
        return slicedData
            .filter((film) => film.genres.includes(genre) && film.language === language)
            .slice(0, limit);
    }

    if(genre !== 'All' && language === 'All') {
        return slicedData.filter((film) => film.genres.includes(genre)).slice(0, limit);
    }

    if(language !== 'All' && genre === 'All') {
        return slicedData.filter((film) => film.language === language).slice(0, limit);
    }

    return slicedData.slice(0, limit);
}

export function checkEmptyFilms({ films, filmsLimit, genre, language, message }) {
    const filteredFilms = films.length ? sliceFilms(films, filmsLimit, genre, language) : [];
    if(filteredFilms.length) {
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

export function fallbackData(film) {
    let {
        name,
        genres,
        language,
        premiered,
        rating: { average },
        summary,
        image,
    } = film;

    //  FALLBACK GENRE
    if(!genres.length) {
        genres.push('unknown');
    }

    //  FALLBACK IMAGE
    if(!image) {
        image = fallbackImage;
    } else {
        image = image.medium;
    }

    //  FALLBACK SUMMARY
    if(!summary) {
        summary = trimText(fallbackSummary);
    } else if(summary.length < 300) {
        summary = trimText(summary + fallbackSummary);
    } else {
        summary = trimText(summary);
    }

    //  FALLBACK FILM RATING
    if(!average) {
        average = (Math.random() * 10).toFixed(1);
    }

    //  FALLBACK FILM PREMIERE
    if(!premiered) {
        premiered = new Date().toISOString().slice(0, 10);
    }

    return {
        name,
        language,
        premiered,
        average,
        genres,
        image,
        summary,
    };
}
