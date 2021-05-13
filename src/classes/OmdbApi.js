export default class OmdbApi {

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
            this.csfd.createImdbRatingBox(
                response.imdbRating,
                response.imdbVotes
            )

            this.response = response;
        });
    }

}
