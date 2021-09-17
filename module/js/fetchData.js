import { page } from './index.js';

export async function fetchData(param) {
    try {
        if (param !== undefined && typeof param === 'number') {
            const getData = await fetch(`http://api.tvmaze.com/shows/${param}`);
            return await getData.json();
        } else if (param !== '' && typeof param === 'string') {
            const getData = await fetch(`http://api.tvmaze.com/search/shows?q=${param}`);
            return await getData.json();
        } else {
            const getData = await fetch(`http://api.tvmaze.com/shows?page=${page}`);
            return await getData.json();
        }
    } catch (err) {
        console.log(err);
    }
}
