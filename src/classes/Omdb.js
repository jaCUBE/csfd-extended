import ImdbRating from "./ImdbRating";

export default class Omdb {

    constructor(
        csfd,
        omdbApiKey,
        cache
    ) {
        this.csfd = csfd;
        this.omdbApiKey = omdbApiKey;
        this.cache = cache;

        this.getResponse();
    }

    getResponse() {
        let imdbCode = this.csfd.getImdbCode();

        if (imdbCode === null) {
            return;
        }

        let cacheItem = this.cache.getItem(imdbCode);

        if (cacheItem !== null && !this.cache.isItemExpired(cacheItem)) {
            let responseFromCache = cacheItem.value;

            new ImdbRating(
                this.csfd,
                responseFromCache.imdbRating,
                responseFromCache.imdbVotes
            );

            return;
        }

        let request = $.ajax({
            method: 'GET',
            url: 'https://omdbapi.com/',
            data: {
                apikey: this.omdbApiKey,
                i: imdbCode,
                r: 'json'
            },
        });

        request.done((response) => {
            if (
                response.imdbRating === undefined
                && response.imdbRating === 'N/A'
            ) {
                this.cache.saveItem(imdbCode, response);
            }

            new ImdbRating(
                this.csfd,
                response.imdbRating,
                response.imdbVotes
            )

            this.response = response;
        });
    }

}
