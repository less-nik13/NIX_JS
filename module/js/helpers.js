export function sliceFilms(films, limit, genre, language) {
    if (limit && genre === 'All' && language === 'All') {
        // change function for input
        const slicedData =
            films.length > 50 ? films.slice(0, limit) : films.map((el) => el.show).slice(0, limit);
        console.log('Sliced DATA', slicedData);
        return slicedData;
    }

    if (limit && genre !== 'All' && language !== 'All') {
        const slicedData = films
            .map((el) => (el.show ? el.show : el))
            .filter((film) => film.genres.includes(genre) && film.language === language);
        console.log('slicedData', slicedData);

        return slicedData.slice(0, limit);
    }

    if (limit && genre !== 'All') {
        console.log('LIMIT', limit);
        const slicedData = films
            .map((el) => (el.show ? el.show : el))
            .filter((film) => film.genres.includes(genre));
        console.log('GENRES ', slicedData, genre);
        return slicedData.slice(0, limit);
    }

    if (limit && language !== 'All') {
        console.log('LIMIT', limit);
        const slicedData = films
            .map((el) => (el.show ? el.show : el))
            .filter((film) => film.language === language);
        console.log('LANGUAGES ', slicedData);
        return slicedData.slice(0, limit);
    }
}

export function trimText(text) {
    return text.slice(0, 300) + '...';
}
