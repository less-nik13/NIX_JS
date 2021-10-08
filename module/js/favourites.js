import { fetchData } from './fetchData.js';
import { checkEmptyFilms } from './helpers.js';
import { films, genre, language } from './index.js';

export async function getFavourites() {
    try {
        const favouriteFilmsIdentifiers = JSON.parse(localStorage.getItem('identifiers'));
        const requests = favouriteFilmsIdentifiers.map((filmId) => fetchData(filmId.id));
        return await Promise.all(requests);
    } catch (err) {
        console.log(err);
    }
}

export function addToFavourites(id) {
    const identifiers = [];
    if (!localStorage.getItem('identifiers')) {
        identifiers.push({ id });
        localStorage.setItem('identifiers', JSON.stringify(identifiers));
    } else {
        identifiers.push(...JSON.parse(localStorage.getItem('identifiers')), { id });
        localStorage.setItem(
            'identifiers',
            JSON.stringify(identifiers),
        );
    }
}

export function removeFromFavourites(id) {
    const identifiers = JSON.parse(localStorage.getItem('identifiers'));
    localStorage.setItem(
        'identifiers',
        JSON.stringify(identifiers.filter((el) => el.id !== id)),
    );

    if (window.location.pathname.includes('Favourites')) {
        const index = films.findIndex((film) => film.id === id);
        films.splice(index, 1);
        checkEmptyFilms(films, films.length, genre, language);
    }
}

export function checkFavourites(id, elem) {
    if (localStorage.getItem('identifiers')) {
        const favourites = JSON.parse(localStorage.getItem('identifiers'));

        if (favourites.some((el) => el.id === id)) {
            elem.classList.add('active');
        }
    }
}
