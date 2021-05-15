import ImdbRating from "./ImdbRating";

export default class Omdb {

    constructor(
        csfd,
        omdbApiKey
    ) {
        this.csfd = csfd;
        this.omdbApiKey = omdbApiKey;

        this.getResponse();
    }

    getResponse() {
        let imdbCode = this.csfd.getImdbCode();

        if (imdbCode === null || !this.csfd.isRated()) {
            return;
        }

        let request = $.ajax({
            method: 'GET',
            url: 'https://omdbapi.com/',
            data: {
                apikey: this.omdbApiKey,
                i: imdbCode,
                r: 'json'
            }
        });

        request.done((response) => {
            new ImdbRating(
                this.csfd,
                response.imdbRating,
                response.imdbVotes
            )

            this.response = response;
        });
    }

}
