import { sliceFilms } from './helpers.js';
import { getFavourites } from './favourites.js';
import { fetchData } from './fetchData.js';
import { createCard } from './createCard.js';
import { createElement } from './create-element.js';

// const burgerMenu = document.getElementById('burger');
// const navbarMenu = document.getElementById('menu');
const loader = document.getElementById('loader');

const message = document.querySelector('.message');

const pagination = document.querySelector('.pagination');
// export const searchInput = document.getElementById('form__input');

const scrollUpBtn = document.getElementById('button');

const languages = document.getElementById('languages');
const genres = document.getElementById('genres');

let language = languages.options[languages.selectedIndex].value;
let genre = genres.options[genres.selectedIndex].value;

console.log('language', language);
console.log('genre', genre);

export let page = 1;
export let films = [];
// SCROLL --------------------------------------------------------------
window.addEventListener('scroll', scrollUp);

function scrollUp() {
    if (window.scrollY > 300) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
}

scrollUpBtn.addEventListener('click', function (e) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});
// --------------------------------------------------------------

export async function start(id) {
    if (window.location.pathname.includes('Films')) {
        const filmsOnPage = document.getElementById('items-per-page');
        const searchSubmit = document.getElementById('form__btn');
        const paginationItems = document.querySelectorAll('.numb');
        const searchInput = document.getElementById('form__input');

        let value = filmsOnPage.options[filmsOnPage.selectedIndex].value;

        searchSubmit.disabled = true;

        // -------------------- CHECK FOR EMPTY INPUT
        searchInput.addEventListener('input', function (e) {
            searchSubmit.disabled = false;
        });

        searchSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            // filmsOnPage.options[0].selected = true;
            // value = filmsOnPage.options[filmsOnPage.selectedIndex].value;

            pagination.style.display = 'none';
            if (searchInput.value.trim() === '' && language === 'All' && genre === 'All') {
                pagination.style.display = 'block';
            }
            start();
        });

        filmsOnPage.addEventListener('change', function (e) {
            value = e.target.options[filmsOnPage.selectedIndex].value;
            const filteredFilms = sliceFilms(films, value, genre, language);
            console.log('filteredFilms', filteredFilms);
            createCard(filteredFilms);
        });

        languages.addEventListener('change', function (e) {
            language = e.target.options[languages.selectedIndex].value;
            const filteredFilms = sliceFilms(films, value, genre, language);

            console.log('filteredFilms', filteredFilms);
            if (filteredFilms.length) {
                createCard(filteredFilms);
                message.style.display = 'none';
                // pagination.style.display = 'block';
            } else {
                // pagination.style.display = 'none';
                message.innerText = 'Films Not Found';
                message.style.display = 'block';
                createCard(filteredFilms);
            }
        });

        genres.addEventListener('change', function (e) {
            genre = e.target.options[genres.selectedIndex].value;
            const filteredFilms = sliceFilms(films, value, genre, language);

            console.log('filteredFilms', filteredFilms);
            if (filteredFilms.length) {
                createCard(filteredFilms);
                message.style.display = 'none';
                // pagination.style.display = 'block';
            } else {
                // pagination.style.display = 'none';

                message.innerText = 'Films Not Found';
                message.style.display = 'block';
                createCard(filteredFilms);
            }
        });

        paginationItems.forEach((el) =>
            el.addEventListener('click', function () {
                // Берём все элементы на которые не кликнули, и удаляем у них активный класс
                const notClickedLinks = [...paginationItems].filter((notClickedLink) => {
                    return notClickedLink !== el;
                });

                notClickedLinks.forEach((notClickedLink) => {
                    notClickedLink.classList.remove('active');
                });

                if (!el.classList.contains('active')) {
                    page = +el.innerText;
                    el.classList.add('active');
                    start();
                }
            }),
        );

        loader.style.display = 'none';
        films = await fetchData(searchInput);
        const filteredFilms = sliceFilms(films, value, genre, language);
        console.log(value, genre, language);
        console.log('FILMS', filteredFilms);
        createCard(filteredFilms);
    }

    if (window.location.pathname.includes('Favourites')) {
        languages.addEventListener('change', function (e) {
            language = e.target.options[languages.selectedIndex].value;
            createCard(sliceFilms(films, films.length, genre, language));
        });

        genres.addEventListener('change', function (e) {
            genre = e.target.options[genres.selectedIndex].value;
            createCard(sliceFilms(films, films.length, genre, language));
        });
        if (films.length > 0) {
            films = [...films].filter((film) => film.id !== id);
            createCard(films);
        } else {
            films = await getFavourites();
            loader.style.display = 'none';
            createCard(films);
        }
    }
}

start();

let totalPages = 5;
// let page = 1;

//calling function with passing parameters and adding inside element which is ul tag
// element.innerHTML = createPagination(totalPages, page);

// function createPagination(totalPages, page) {
//     let liTag = '';
//     let active;
//     let beforePage = page - 1;
//     let afterPage = page + 1;

//     //show the next button if the page value is greater than 1
//     if (page > 1) {
//         liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
//             page - 1
//         })"><span>Prev</span></li>`;
//     }

//     //if page value is less than 2 then add 1 after the previous button
//     if (page > 2) {
//         liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;

//         //if page value is greater than 3 then add this (...) after the first li or page
//         if (page > 3) {
//             liTag += `<li class="dots"><span>...</span></li>`;
//         }
//     }

//     // how many pages or li show before the current li
//     if (page == totalPages) {
//         beforePage = beforePage - 2;
//     } else if (page == totalPages - 1) {
//         beforePage = beforePage - 1;
//     }
//     // how many pages or li show after the current li
//     if (page == 1) {
//         afterPage = afterPage + 2;
//     } else if (page == 2) {
//         afterPage = afterPage + 1;
//     }

//     for (var plength = beforePage; plength <= afterPage; plength++) {
//         if (plength > totalPages) {
//             //if plength is greater than totalPage length then continue
//             continue;
//         }
//         if (plength == 0) {
//             //if plength is 0 than add +1 in plength value
//             plength = plength + 1;
//         }
//         if (page == plength) {
//             //if page is equal to plength than assign active string in the active variable
//             active = 'active';
//         } else {
//             //else leave empty to the active variable
//             active = '';
//         }
//         liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
//     }

//     if (page < totalPages - 1) {
//         //if page value is less than totalPage value by -1 then show the last li or page
//         if (page < totalPages - 2) {
//             //if page value is less than totalPage value by -2 then add this (...) before the last li or page
//             liTag += `<li class="dots"><span>...</span></li>`;
//         }
//         liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
//     }

//     if (page < totalPages) {
//         //show the next button if the page value is less than totalPage(20)
//         liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
//             page + 1
//         })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
//     }

//     console.log(page);
//     element.innerHTML = liTag; //add li tag inside ul tag
//     return liTag; //reurn the li tag
// }
