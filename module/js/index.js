import {checkEmptyFilms} from './helpers.js';
import {getFavourites} from './favourites.js';
import {fetchData} from './fetchData.js';

const navigationLinks = document.querySelectorAll('.menu__list-link');
const loader = document.getElementById('loader');
const scrollUpBtn = document.getElementById('scroll-up__button');
const languages = document.getElementById('languages'); // SELECT WITH LANGUAGES
const genres = document.getElementById('genres'); // SELECT WITH GENRES
const filmsOnPage = document.getElementById('films-per-page');
export const message = document.getElementById('message'); // H2 TAG FOR TEXT MESSAGE

//-------------------------------------------------------------- GLOB VARIABLES
export let language = languages.options[languages.selectedIndex].value; // filmsLimit OF LANGUAGE ON LOAD
export let genre = genres.options[genres.selectedIndex].value; // filmsLimit OF GENRE ON LOAD
export let page = 1;
export let films = [];
const pagesRange = [ 1, 5 ];

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
scrollUpBtn.addEventListener('click', () => {
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
async function start() {
    //-------------------------------------------------------------- LANGUAGES
    languages.addEventListener('change', (e) => {
        language = e.target.options[languages.selectedIndex].value;

        if(filmsOnPage) {
            checkEmptyFilms(films, filmsOnPage.options[filmsOnPage.selectedIndex].value, genre, language);
        } else {
            checkEmptyFilms(films, films.length, genre, language);
        }
    });

    //-------------------------------------------------------------- GENRES
    genres.addEventListener('change', (e) => {
        genre = e.target.options[genres.selectedIndex].value;

        if(filmsOnPage) {
            checkEmptyFilms(films, filmsOnPage.options[filmsOnPage.selectedIndex].value, genre, language);
        } else {
            checkEmptyFilms(films, films.length, genre, language);
        }
    });

    if (window.location.pathname.includes('Films')) {
        //-------------------------------------------------------------- GET ELEMENTS FROM FILMS PAGE
        const searchSubmit = document.getElementById('form__btn');
        const searchInput = document.getElementById('form__input');
        const pagesBlock = document.getElementById('pages');
        const pagination = document.getElementById('pagination'); // LIST OF PAGES
        const changePageButtons = document.getElementsByClassName('pages__btn');
        const activePageNumber = document.getElementById('pages__active-page-number');
        const maxPageNumber = document.getElementById('pages__max-pages-count');
        const paginationList = document.getElementById('pages__pagination-list');
        const paginationItems = document.querySelectorAll('.pagination__page-number');

        let filmsLimit = filmsOnPage.options[filmsOnPage.selectedIndex].value; // LIMIT OF FILMS ON PAGE

        paginationItems[ page - 1 ].classList.add('active');
        loader.style.display = 'none';
        activePageNumber.innerText = page;
        maxPageNumber.innerText = pagesRange[ 1 ];
        searchSubmit.disabled = true; // DISABLE SEARCH BUTTON

        //-------------------------------------------------------------- IF INPUT HAS ANY VALUE, ENABLE SEARCH BUTTON
        searchInput.addEventListener('input', function () {
            searchSubmit.disabled = false; // NOTE!!! IF WE TYPE ANY SYMBOLS, AND THEN DELETE THEM, BUTTON BE ENABLED
        });

        // NOTE!!! IF WE CLICK ON BUTTON WITH CLEAR INPUT VALUE, LAST VIEWED PAGE BE LOADED
        searchSubmit.addEventListener('click', async (e) => {
            e.preventDefault();

            filmsLimit = filmsOnPage.options[filmsOnPage.selectedIndex].value;

            //-------------------------------------------------------------- DISABLE/ENABLE PAGINATION IF WE SEARCH FILMS
            if (searchInput.value.trim() === '') {
                pagesBlock.style.display = 'block';
            } else {
                pagesBlock.style.display = 'none';
            }

            films = searchInput.value.trim() ?
                await fetchData({ searchStr: searchInput.value.trim() }) :
                await fetchData({ page } );

            if (!films) {
                message.innerText = 'Films Not Found';
                message.style.display = 'block';
            } else {
                checkEmptyFilms(films, filmsLimit, genre, language);
            }
        });

        //-------------------------------------------------------------- PAGINATION
        filmsOnPage.addEventListener('change', (e) => {
            filmsLimit = e.target.options[filmsOnPage.selectedIndex].value;
            checkEmptyFilms(films, filmsLimit, genre, language);
        });

        paginationList.addEventListener('click', (e) => {
            if (!e.target.classList.contains('active')) {
                paginationList.classList.add('active');
                pagination.style.display = 'block';
            } else {
                paginationList.classList.remove('active');
                pagination.style.display = 'none';
            }
        });

        [...changePageButtons].forEach(btn => {
            btn.addEventListener('click', async (e) => {

                if(e.target.classList.contains('pages__prev-btn')) {
                    // //-------------------------------------------------------------- PREVIOUS FILMS PAGE BUTTON
                    if (page === pagesRange[0]) return;
                    paginationItems[page - 1].classList.remove('active');
                    page--;
                } else {
                    // //-------------------------------------------------------------- NEXT FILMS PAGE BUTTON
                    if (page === pagesRange[1]) return;
                    paginationItems[page - 1].classList.remove('active');
                    page++;
                }

                activePageNumber.innerText = page;
                paginationItems[page - 1].classList.add('active');
                films = await fetchData({ page });
                checkEmptyFilms(films, filmsLimit, genre, language);
            })
        })

        paginationItems.forEach((el) =>
            el.addEventListener('click', async () => {
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
                    activePageNumber.innerText = page;
                    //-------------------------------------------------------------- LOAD FILMS WHEN PAGE CHANGE
                    films = await fetchData({ page });
                    checkEmptyFilms(films, filmsLimit, genre, language);
                }
            }),
        );

        //-------------------------------------------------------------- LOAD FILMS
        films = await fetchData({ page });

        if (!films) {
            message.innerText = 'Films Not Found';
            message.style.display = 'block';
        } else {
            pagesBlock.style.display = 'block';
            checkEmptyFilms(films, filmsLimit, genre, language);
        }
    }

    //-------------------------------------------------------------- FAVOURITES
    if (window.location.pathname.includes('Favourites')) {
        loader.style.display = 'none';

        films = await getFavourites();

        if (!films.every(film => typeof film === 'undefined')) {
            checkEmptyFilms(films, films.length, genre, language);
        } else {
            message.innerText = 'Films Not Found';
            message.style.display = 'block';
        }
    }
    document.getElementById('footer__date').innerText = new Date().getFullYear();
}

start();
