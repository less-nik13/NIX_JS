import { fetchData } from './fetchData.js';
import { checkEmptyFilms } from './helpers.js';
import { films, genre, language, message } from './mainPages.js';

export async function getFavourites() {
    try {
        const { favourites } = JSON.parse(localStorage.getItem('user'));
        const requests = favourites.map((filmId) => fetchData({ filmId: filmId.id }));
        return await Promise.all(requests);
    } catch(err) {
        console.log(err);
    }
}

export function addToFavourites(id) {
    const userData = JSON.parse(localStorage.getItem('user'));

    userData.favourites.push({ id });
    localStorage.setItem('user', JSON.stringify(userData));
}

export function removeFromFavourites(id) {
    const userData = JSON.parse(localStorage.getItem('user'));
    const newFavourites = userData.favourites.filter((el) => el.id !== id);
    localStorage.setItem('user', JSON.stringify({ ...userData, favourites: newFavourites }));

    if(window.location.pathname.includes('Favourites')) {
        const index = films.findIndex((film) => film.id === id);
        films.splice(index, 1);
        checkEmptyFilms({ films, filmsLimit: films.length, genre, language, message });
    }
}

export function checkFavourites(id, elem) {
    if(localStorage.getItem('user')) {
        const { favourites } = JSON.parse(localStorage.getItem('user'));

        if(favourites.some((el) => el.id === id)) {
            elem.classList.add('active');
        }
    }
}
