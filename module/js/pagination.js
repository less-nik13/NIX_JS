import { start, films } from './index.js';

export function paginate(paginationItems, page) {
    console.log('Items', paginationItems, 'page', page, 'films', films, 'PAGINATE');
    let pageNumber = page;
    console.log('pageNumber', pageNumber);
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
                console.log('pageNumber internal', pageNumber);
                console.log(el.innerText);
                pageNumber = +el.innerText;
                console.log('page pag', pageNumber);
                el.classList.add('active');
                start(pageNumber);
            }
        }),
    );
    console.log('page number', pageNumber);
    return pageNumber;
}
