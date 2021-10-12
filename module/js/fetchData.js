import {API_URL} from "./constants.js";

export async function fetchData({filmId, searchStr, page}) {
    try {
        if (filmId) {
            const getData = await fetch(`${API_URL}/shows/${filmId}`);
            return await getData.json();
        } else if (searchStr) {
            const getData = await fetch(`${API_URL}/search/shows?q=${searchStr}`);
            return await getData.json();
        } else if (page) {
            const getData = await fetch(`${API_URL}/shows?page=${page}`);
            return await getData.json();
        }
    } catch (err) {
        console.log(err);
    }
}
