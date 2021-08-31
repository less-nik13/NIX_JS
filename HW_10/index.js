const cards = document.getElementById('cards');

const url = 'https://api.punkapi.com/v2/beers?brewed_before=11-2017&abv_gt=6';

async function getData(url) {
    localStorage.clear();
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw 'Server is not responding';
        }
    } catch (err) {
        console.log(err);
    }
}

async function createCard() {
    const data = await getData(url);

    data.forEach((el) => {
        let cardEl = document.createElement('li');
        let cardElem;

        cardEl.classList = 'card';

        cardElem = `<div class="card-image">
        <img data-image_id=${el.id} src="${el.image_url}"
            alt="rover" />
        </div>
        <div class="card-body">
            <span class="tag tag-teal">${el.contributed_by}</span>
            <h4>
                ${el.name}
            </h4>
            <p class="description">
                ${el.description}
            </p>
            <h4>Food Pairs:</h4>
            <ul id="food">`;

        const foodPairing = el.food_pairing;
        foodPairing.forEach((food) => {
            cardElem += `<li class="food-item">
            ${food}
            </li>
            `;
        });

        cardElem += `
        </ul>
                <div class="details">
                <p>Alcohol by Volume: <span class="small">${el.abv}</span></p>
                <p>First brewed: <span class="small">${el.first_brewed}</span></p>
                </div>
            </div>`;

        cardEl.innerHTML = cardElem;

        cards.append(cardEl);

        document
            .querySelectorAll('.card-image > img')
            .forEach((img) => img.addEventListener('click', addToLocalStorage));
    });
}

function addToLocalStorage(el) {
    localStorage.setItem(`imageId${el.target.dataset.image_id}`, el.target.dataset.image_id);
}

createCard();
