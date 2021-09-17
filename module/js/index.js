import { checkEmptyFilms } from './helpers.js';
import { getFavourites } from './favourites.js';
import { fetchData } from './fetchData.js';

const navigationLinks = document.querySelectorAll('.menu__list-link');
const loader = document.getElementById('loader');
const scrollUpBtn = document.getElementById('button');
const languages = document.getElementById('languages'); // SELECT WITH LANGUAGES
const genres = document.getElementById('genres'); // SELECT WITH GENRES
const pagination = document.querySelector('.pagination'); // LIST OF PAGES
export const message = document.querySelector('.message'); // H2 TAG FOR TEXT MESSAGE

//-------------------------------------------------------------- GLOB VARIABLES
export let language = languages.options[languages.selectedIndex].value; // filmsLimit OF LANGUAGE ON LOAD
export let genre = genres.options[genres.selectedIndex].value; // filmsLimit OF GENRE ON LOAD

export let page = 1;
export let films = [];

//-------------------------------------------------------------- ADD SCROLL EVENT
window.addEventListener('scroll', scrollUp);

function scrollUp() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
}

//-------------------------------------------------------------- SCROLL TO TOP IF SCROLL BY AXIS Y  > 300
scrollUpBtn.addEventListener('click', function (e) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

//-------------------------------------------------------------- CHANGE ACTIVE NAV LINK
[...navigationLinks].forEach((link) => {
    const currentPage = window.location.pathname;
    if (link.href.includes(currentPage)) {
        link.classList.add('menu__list-link--active');
    }
});

//-------------------------------------------------------------- MAIN FUNCTION
export async function start() {
    document.querySelector('.copyright__date').innerText = new Date().getFullYear();

    if (window.location.pathname.includes('Films')) {
        //-------------------------------------------------------------- GET ELEMENTS FROM FILMS PAGE
        const filmsOnPage = document.getElementById('items-per-page');
        const searchSubmit = document.getElementById('form__btn');
        const paginationItems = document.querySelectorAll('.numb');
        const searchInput = document.getElementById('form__input');

        let filmsLimit = filmsOnPage.options[filmsOnPage.selectedIndex].value; // LIMIT OF FILMS ON PAGE

        loader.style.display = 'none';

        searchSubmit.disabled = true; // DISABLE SEARCH BUTTON

        //-------------------------------------------------------------- IF INPUT HAS ANY VALUE, ENABLE SEARCH BUTTON
        searchInput.addEventListener('input', function () {
            searchSubmit.disabled = false; // NOTE!!! IF WE TYPE ANY SYMBOLS, AND THEN DELETE THEM, BUTTON BE ENABLED
        });

        // NOTE!!! IF WE CLICK ON BUTTON WITH CLEAR INPUT VALUE, LOADED LAST VIEWED PAGE
        searchSubmit.addEventListener('click', async (e) => {
            e.preventDefault();

            filmsOnPage.options[0].selected = true; // SET filmsLimit TO FIRST SELECT VALUE
            filmsLimit = filmsOnPage.options[filmsOnPage.selectedIndex].value;

            //-------------------------------------------------------------- DISABLE/ENABLE PAGINATION IF WE SEARCH FILMS
            if (searchInput.value.trim() === '') {
                pagination.style.display = 'block';
            } else {
                pagination.style.display = 'none';
            }

            films = await fetchData(searchInput.value.trim());
            checkEmptyFilms(films, filmsLimit, genre, language);
        });

        //-------------------------------------------------------------- PAGINATION
        filmsOnPage.addEventListener('change', function (e) {
            filmsLimit = e.target.options[filmsOnPage.selectedIndex].value;
            checkEmptyFilms(films, filmsLimit, genre, language);
        });

        //-------------------------------------------------------------- LANGUAGES
        languages.addEventListener('change', function (e) {
            language = e.target.options[languages.selectedIndex].value;
            checkEmptyFilms(films, filmsLimit, genre, language);
        });

        //-------------------------------------------------------------- GENRES
        genres.addEventListener('change', function (e) {
            genre = e.target.options[genres.selectedIndex].value;
            checkEmptyFilms(films, filmsLimit, genre, language);
        });

        paginationItems.forEach((el) =>
            el.addEventListener('click', async function () {
                // TAKE ALL ITEMS, THAT NOT CLICKED, AND REMOVE FROM THEM ACTIVE CLASS
                const notClickedLinks = [...paginationItems].filter((notClickedLink) => {
                    return notClickedLink !== el;
                });

                notClickedLinks.forEach((notClickedLink) => {
                    notClickedLink.classList.remove('active');
                });

                if (!el.classList.contains('active')) {
                    page = +el.innerText;
                    el.classList.add('active');

                    //-------------------------------------------------------------- LOAD FILMS WHEN PAGE CHANGE
                    films = await fetchData();
                    checkEmptyFilms(films, filmsLimit, genre, language);
                }
            }),
        );

        //-------------------------------------------------------------- LOAD FILMS
        films = await fetchData();
        if (films.length) {
            pagination.style.display = 'block';
            checkEmptyFilms(films, filmsLimit, genre, language);
        }
    }

    //-------------------------------------------------------------- FAVOURITES
    if (window.location.pathname.includes('Favourites')) {
        languages.addEventListener('change', function (e) {
            language = e.target.options[languages.selectedIndex].value;
            checkEmptyFilms(films, films.length, genre, language);
        });

        genres.addEventListener('change', function (e) {
            genre = e.target.options[genres.selectedIndex].value;
            checkEmptyFilms(films, films.length, genre, language);
        });

        loader.style.display = 'none';
        films = await getFavourites();
        checkEmptyFilms(films, films.length, genre, language);
    }
}

start();