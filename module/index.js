const burgerMenu = document.getElementById('burger');
const navbarMenu = document.getElementById('menu');
const loader = document.getElementById('loader');
const modal = document.getElementById('modal');
const modalCard = document.querySelector('.modal__card');
const cardsBlock = document.getElementById('cards');
const searchInput = document.getElementById('form__input');
const searchSubmit = document.getElementById('form__btn');
const filmsOnPage = document.getElementById('items-per-page');
const pagination = document.querySelector('.pagination');

const defaultURL = 'http://api.tvmaze.com/shows?page=1';
const fallbackImage = 'https://picsum.photos/680/1000';
const fallbackSummary =
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.';

let page = 1;
let value = filmsOnPage.options[filmsOnPage.selectedIndex].value;

if (window.location.pathname.includes('Films')) {
    createCard(value);
}

filmsOnPage.addEventListener('change', function () {
    value = filmsOnPage.options[filmsOnPage.selectedIndex].value;
    createCard(value);
});

async function fetchData(url) {
    if (!searchInput.value && url === undefined) {
        const getData = await fetch(`http://api.tvmaze.com/shows?page=${page}`);
        return await getData.json();
    } else if (searchInput.value && url === undefined) {
        const getData = await fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`);
        return await getData.json();
    } else {
        const getData = await fetch(url);
        return await getData.json();
    }
}

async function createCard(limit) {
    cardsBlock.innerHTML = '';
    const films = await fetchData();
    const filmsArray = sliceFilms(films, limit);

    if (searchInput.value) {
        pagination.style.display = 'none';
    } else {
        pagination.style.display = 'block';
    }

    if (films.length) {
        loader.style.display = 'none';
    }

    filmsArray.forEach((film) => {
        const cardItemInner = createElement('li', 'class', 'cards__inner');
        const cardItem = createElement('a', 'class', 'cards__item');
        const cardImage = createElement('img', 'class', 'cards__item-poster');
        const cardFavorite = createElement('button', 'class', 'cards__favorite');

        const { id, image, name } = film;

        cardItem.setAttribute('href', `https://api.tvmaze.com/shows/${id}`);
        // cardItem.setAttribute('href', `${id}`);
        cardFavorite.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="40px" height="40px" viewBox="0 0 511.626 511.627" style="enable-background:new 0 0 511.626 511.627;"
        xml:space="preserve"><g>
       <path d="M475.366,71.951c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136
           c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414
           c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562
           c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.552,0,128.288,0,170.162
           c0,12.753,2.24,25.889,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.796,19.414,27.837
           c7.233,9.042,12.519,15.27,15.846,18.699c3.33,3.422,5.948,5.899,7.851,7.419L243.25,469.937c3.427,3.429,7.614,5.144,12.562,5.144
           s9.138-1.715,12.563-5.137l177.87-171.307c43.588-43.583,65.38-86.41,65.38-128.475C511.626,128.288,499.537,95.552,475.366,71.951
           z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
   </svg>`;

        film.image
            ? cardImage.setAttribute('src', `${image.medium}`)
            : cardImage.setAttribute('src', fallbackImage);

        cardImage.setAttribute('alt', `${name}`);
        cardItem.append(cardImage);
        cardItemInner.append(cardItem, cardFavorite);

        cardItem.addEventListener('click', showModal);
        cardsBlock.append(cardItemInner);
    });
}

function sliceFilms(films, limit) {
    const slicedData = films.length > 50 ? films.slice(100, 150) : films.map((el) => el.show);
    const resultData = slicedData.slice(0, limit);
    console.log(resultData);
    return resultData;
}

async function showModal(e) {
    e.preventDefault();
    modal.classList.remove('hideModal');
    modal.classList.add('showModal');
    document.body.style.overflow = 'hidden';

    const filmURL = this.getAttribute('href');
    console.log(filmURL);
    console.log(films);
    const filmData = await fetchData(filmURL);

    let {
        name,
        genres,
        language,
        premiered,
        rating: { average },
        summary,
    } = filmData;

    const filmCard = createElement('div', 'class', 'modal__card');
    const filmImage = createElement('img', 'class', 'modal__card-image');
    const filmContentWrapper = createElement('div', 'class', 'modal__content-wrapper');
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

    filmData.image
        ? filmImage.setAttribute('src', `${filmData.image.original}`)
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

function trimText(text) {
    return text.slice(0, 300) + '...';
}

searchSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    createCard(value);
});

function createElement(elem, attrName, attrValue) {
    const element = document.createElement(elem);
    element.setAttribute(attrName, attrValue);
    return element;
}

// const name = document.getElementById('name');
// const pass = document.getElementById('pass');
// const button = document.getElementById('submit');

// button.addEventListener('click', () => {
//     const user = {
//         name: name.value,
//         pass: pass.value,
//     };

//     const promise = fetch('https://api.jsonbin.io/b/5f2c66aa6f8e4e3faf2cd347', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'secret-key': '$2b$10$dgM1SKMKiT9Mwj/qs8/0auCBRW85JrfDfVhdB8uoUfh90.wEpXJcK',
//         },
//         body: JSON.stringify(user),
//     });

//     promise.then((resp) => resp.json()).then((response) => console.log(response));
// });

// burgerMenu.addEventListener('click', () => {
//     burgerMenu.classList.toggle('active');
//     navbarMenu.classList.toggle('active');

//     if (navbarMenu.classList.contains('active')) {
//         navbarMenu.style.maxHeight = navbarMenu.scrollHeight + 'px';
//     } else {
//         navbarMenu.removeAttribute('style');
//     }
// });

const paginationItems = document.querySelectorAll('.numb');

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
            createCard(value);
        }
    }),
);

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
