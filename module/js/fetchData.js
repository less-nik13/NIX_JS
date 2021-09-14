import { page } from './index.js';

export async function fetchData(searchInput, id) {
    if (id && !searchInput.value) {
        const getData = await fetch(`http://api.tvmaze.com/shows/${id}`);
        return await getData.json();
    } else if (searchInput.value.trim() && id === undefined) {
        const getData = await fetch(`http://api.tvmaze.com/search/shows?q=${searchInput.value}`);
        return await getData.json();
    } else {
        const getData = await fetch(`http://api.tvmaze.com/shows?page=${page}`);
        return await getData.json();
    }
}
