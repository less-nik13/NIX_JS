import { fetchData } from './fetchData.js';
import { films, start } from './index.js';

export async function getFavourites() {
    const favouriteFilmsIdetifiers = JSON.parse(localStorage.getItem('identifiers'));
    await Promise.all(
        favouriteFilmsIdetifiers.map(async function (filmId) {
            const filmData = await fetchData('', filmId.id);
            films.push(filmData);
        }),
    );
    return films;
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
            JSON.stringify(identifiers.sort((a, b) => a.id - b.id)),
        );
    }
}

export function removeFromFavourites(id) {
    const identifiers = JSON.parse(localStorage.getItem('identifiers'));
    localStorage.setItem(
        'identifiers',
        JSON.stringify(identifiers.filter((el) => el.id !== id).sort((a, b) => a.id - b.id)),
    );
    start(id);
}

export function checkFavourites(id, elem) {
    if (localStorage.getItem('identifiers')) {
        const favourites = JSON.parse(localStorage.getItem('identifiers')).sort(
            (a, b) => a.id - b.id,
        );

        if (favourites.some((el) => el.id === id)) {
            elem.classList.add('active');
        }
    }
}
