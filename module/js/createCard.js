import { showModal } from './modal.js';
import { createElement } from './create-element.js';
import { checkFavourites, addToFavourites, removeFromFavourites } from './favourites.js';
import { fallbackImage } from './constants.js';
import { start } from './index.js';

const cardsBlock = document.getElementById('cards');

export function createCard(filmsArray) {
    cardsBlock.innerHTML = '';

    filmsArray.forEach((film) => {
        const cardItemWrapper = createElement('li', 'class', 'cards__item-wrapper');
        const cardItemInner = createElement('div', 'class', 'cards__inner');
        // const cardItemWrapper = document.createElement('div', 'class', 'cards__item-wrapper');
        // const cardItemInner = createElement('li', 'class', 'cards__inner');
        // const cardItem = createElement('div', 'class', 'cards__item');
        const cardImage = createElement('img', 'class', 'cards__item-poster');
        const cardTitle = createElement('p', 'class', 'cards__item-title');
        const cardFavourite = createElement('button', 'class', 'cards__favourite');

        const { id, image, name } = film;

        cardTitle.innerHTML = name;
        cardFavourite.innerHTML = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

        cardItemInner.append(cardImage);
        cardItemWrapper.append(cardTitle, cardItemInner, cardFavourite);

        cardFavourite.addEventListener('click', function (e) {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                addToFavourites(id);
            } else {
                this.classList.remove('active');
                removeFromFavourites(id);
            }
        });

        //----------add for all films modal window on click event
        cardItemInner.addEventListener('click', function () {
            showModal(film);
        });

        //----------check favourites films
        checkFavourites(id, cardFavourite);

        cardsBlock.append(cardItemWrapper);
    });
}
