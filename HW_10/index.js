const cards = document.getElementById('cards');

const API_URL = 'https://api.punkapi.com/v2/beers?brewed_before=11-2017&abv_gt=6';

async function getData() {
    localStorage.clear();
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        createCard(data);
    } catch (err) {
        cards.innerHTML = `<h2 style="margin-top: 100px">Nothing not found</h2>`
        console.log(err);
    }
}

getData();

function createCard(data) {
    data.forEach((el) => {
        let cardEl = document.createElement('li');
        let cardInnerHTML;

        cardEl.classList.add('card');

        cardInnerHTML = `
        <div class="card-image">
            <img data-image_id=${el.id} src="${el.image_url}" alt="rover" />
        </div>
        <div class="card-body">
            <span class="tag tag-teal">${el.contributed_by}</span>
            <h4>${el.name}</h4>
            <p class="description">${el.description}</p>
            <h4>Food Pairs:</h4>
            <ul id="food">
        `;

        const foodPairing = el.food_pairing;
        foodPairing.forEach((food) => {
            cardInnerHTML += `<li class="food-item">${food}</li>`;
        });

        cardInnerHTML += `
                </ul>
                <div class="details">
                    <p>Alcohol by Volume: <span class="small">${el.abv}</span></p>
                    <p>First brewed: <span class="small">${el.first_brewed}</span></p>
                </div>
            </div>
        `;

        cardEl.innerHTML = cardInnerHTML;
        cards.append(cardEl);
    });
    document
        .querySelectorAll('.card-image > img')
        .forEach((img) => img.addEventListener('click', addToLocalStorage));
}

function addToLocalStorage(e) {
    const identifiers = [];
    if (!localStorage.getItem('identifiers')) {
        identifiers.push({imageId: e.target.dataset.image_id});
        localStorage.setItem('identifiers', JSON.stringify(identifiers));
    } else {
        const localStorageArray = JSON.parse(localStorage.getItem('identifiers'));
        if (localStorageArray.some(el => el.imageId === e.target.dataset.image_id)) {
            localStorage.setItem('identifiers', JSON.stringify(localStorageArray));
        } else {
            identifiers.push(...JSON.parse(localStorage.getItem('identifiers')), {imageId: e.target.dataset.image_id});
            localStorage.setItem(
                'identifiers',
                JSON.stringify(identifiers),
            );
        }
    }
}
