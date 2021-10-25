import { checkEmptyFilms } from './helpers.js';
import { getFavourites } from './favourites.js';
import { fetchData } from './fetchData.js';

const navigationLinks = document.querySelectorAll('.menu__list-link');
const loader = document.getElementById('loader');
const scrollUpBtn = document.getElementById('scroll-up__button');
const languages = document.getElementById('languages'); //  SELECT OF LANGUAGES
const genres = document.getElementById('genres'); //  SELECT OF GENRES
const filmsOnPage = document.getElementById('films-per-page'); //  SELECT OF FILMS LIMIT

// GLOBAL VARIABLES
const modal = document.getElementById('modal');
export const message = document.getElementById('message'); // H2 TAG FOR TEXT MESSAGE
export let language = languages.options[languages.selectedIndex].value; // filmsLimit OF LANGUAGE ON LOAD
export let genre = genres.options[genres.selectedIndex].value; // filmsLimit OF GENRE ON LOAD
export let page = 1;
export let films = [];


// SHOW/HIDE SCROLL SCROLL UP BUTTON
window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
});

//  SCROLL TO TOP WHEN SCROLL BY AXIS Y > 300 AND WE CLICK ON SCROLL UP BUTTON
scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

//  CHANGE ACTIVE NAV LINK
[ ...navigationLinks ].forEach((link) => {
    const currentPage = window.location.pathname;
    if(link.href.includes(currentPage)) {
        link.classList.add('menu__list-link--active');
    }
});

export async function start() {
    languages.addEventListener('change', (e) => {
        language = e.target.options[languages.selectedIndex].value;

        const renderOptions = {
            films,
            filmsLimit: filmsOnPage ? filmsOnPage.options[filmsOnPage.selectedIndex].value : films.length,
            genre,
            language,
            message
        };

        checkEmptyFilms(renderOptions);
    });

    genres.addEventListener('change', (e) => {
        genre = e.target.options[genres.selectedIndex].value;

        const renderOptions = {
            films,
            filmsLimit: filmsOnPage ? filmsOnPage.options[filmsOnPage.selectedIndex].value : films.length,
            genre,
            language,
            message
        };

        checkEmptyFilms(renderOptions);
    });

    //  FILMS PAGE
    if(window.location.pathname.includes('Films') && localStorage.getItem("user")) {
        const searchSubmit = document.getElementById('form__btn');
        const searchInput = document.getElementById('form__input');
        const pagesBlock = document.getElementById('pages');
        const pagination = document.getElementById('pagination'); // LIST OF PAGES
        const activePageNumber = document.getElementById('pages__active-page-number');
        const maxPageNumber = document.getElementById('pages__max-pages-count');
        const paginationList = document.getElementById('pages__pagination-list');
        const pageTitle = document.getElementById('films__title');
        const changePageButtons = document.getElementsByClassName('pages__btn');
        const paginationItems = document.querySelectorAll('.pagination__page-number');
        const pagesRange = [ 1, 5 ];

        let filmsLimit = filmsOnPage.options[filmsOnPage.selectedIndex].value; // LIMIT OF FILMS ON PAGE

        loader.style.display = 'none';
        activePageNumber.innerText = page;
        maxPageNumber.innerText = `${pagesRange[ 1 ]}`;
        paginationItems[ page - 1 ].classList.add('active');
        searchSubmit.disabled = true; // DISABLE SEARCH BUTTON

        filmsOnPage.addEventListener('change', (e) => {
            filmsLimit = e.target.options[filmsOnPage.selectedIndex].value;

            const options = { films, filmsLimit, genre, language, message };
            checkEmptyFilms(options);
        });

        //  IF INPUT HAS ANY SYMBOLS, ENABLE SEARCH BUTTON
        searchInput.addEventListener('input', (e) => {
            searchSubmit.disabled = !e.target.value.trim();
        });

        // SEARCH SUBMIT
        searchSubmit.addEventListener('click', async () => {
            const searchValue = searchInput.value.trim();

            pagesBlock.style.display = 'none';
            pageTitle.innerText = `Search results by "${searchValue}"`;

            films = searchValue ?
                await fetchData({ searchStr: searchInput.value.trim() }) :
                await fetchData({ page });

            searchInput.value = '';
            searchSubmit.disabled = true;

            const options = { films, filmsLimit, genre, language, message };
            checkEmptyFilms(options);
        });

        // PAGINATION BLOCK
        paginationList.addEventListener('click', (e) => {
            if(!e.target.classList.contains('active')) {
                paginationList.classList.add('active');
                pagination.style.display = 'block';
            } else {
                paginationList.classList.remove('active');
                pagination.style.display = 'none';
            }
        });

        //  PAGINATION NEXT/PREV BUTTONS
        [ ...changePageButtons ].forEach(btn => {
            btn.addEventListener('click', async (e) => {

                if(e.target.classList.contains('pages__prev-btn')) {
                    //  PREVIOUS PAGE BUTTON
                    if(page === pagesRange[0]) return;
                    paginationItems[page - 1].classList.remove('active');
                    page--;
                } else {
                    //  NEXT PAGE BUTTON
                    if(page === pagesRange[1]) return;
                    paginationItems[page - 1].classList.remove('active');
                    page++;
                }

                activePageNumber.innerText = page;
                paginationItems[page - 1].classList.add('active');

                films = await fetchData({ page });
                const options = { films, filmsLimit, genre, language, message };
                checkEmptyFilms(options);
            });
        });

        //  PAGINATION PAGES LIST
        paginationItems.forEach(el =>
            el.addEventListener('click', async () => {
                // TAKE ALL ITEMS, THAT NOT CLICKED, AND REMOVE FROM THEM ACTIVE CLASS
                const notClickedLinks = [ ...paginationItems ].filter((notClickedLink) => {
                    return notClickedLink !== el;
                });

                notClickedLinks.forEach((notClickedLink) => {
                    notClickedLink.classList.remove('active');
                });

                if(!el.classList.contains('active')) {
                    page = +el.innerText;
                    el.classList.add('active');
                    activePageNumber.innerText = page;

                    films = await fetchData({ page });
                    const options = { films, filmsLimit, genre, language, message }
                    checkEmptyFilms(options);
                }
            }),
        );

        // HIDE MODAL CARD, WHEN CLICK ON EMPTY SPACE
        modal.addEventListener('click', (e) => {
            if(!e.target.closest('.modal__card')) {
                modal.classList.add('modal__overlay--hide');
                modal.classList.remove('modal__overlay--show');
                modal.innerHTML = '';
                document.body.style.overflowY = 'scroll';
            }
        });

        //  LOAD FILMS
        films = await fetchData({ page });

        if(!films) {
            message.innerText = 'Films Not Found';
            message.style.display = 'block';
        } else {
            pagesBlock.style.display = 'block';

            const options = { films, filmsLimit, genre, language, message };
            checkEmptyFilms(options);
        }
    } else if(window.location.pathname.includes('Favourites') && localStorage.getItem("user")) {  //  FAVOURITES PAGE
        loader.style.display = 'none';

        films = await getFavourites();

        if(films) {
            const options = { films, filmsLimit: films.length, genre, language, message }
            checkEmptyFilms(options);
        } else {
            message.innerText = 'Films Not Found';
            message.style.display = 'block';
        }
    } else if(!localStorage.getItem("user")) {
        window.location.assign("module/Login")
    }

    //  SET CURRENT YEAR TO FOOTER
    document.getElementById('footer__date').innerText = `${new Date().getFullYear()}`;
}

// start()
