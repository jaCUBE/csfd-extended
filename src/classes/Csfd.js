export default class Csfd {

    constructor(csfdPage) {
        this.csfdPage = csfdPage
    }

    getImdbCode() {
        let imdbButton = this.csfdPage.find('a.button-imdb');

        return imdbButton.length > 0
            ? imdbButton.attr('href').match(/(tt\d+)/)[0]
            : null;
    }

    createImdbRatingBox(
        imdbRating,
        imdbVotes
    ) {
        let imdbVotesSpan = $('<span>')
            .css({
                'display': 'block',
                'font-size': '11px',
                'line-height': '15px',
                'padding-bottom': '10px'
            })
            .html(imdbVotes);

        let imdbRatingBox = $('<a>')
            .addClass('rating-average csfd-extended-imdb-rating')
            .css({
                'display': 'block',
                'background': '#f5c518',
                'color': '#000000',
                'cursor': 'pointer'
            })
            .attr('href', 'https://www.imdb.com/title/' + this.getImdbCode())
            .html(imdbRating)
            .append(imdbVotesSpan);

        imdbRatingBox.insertAfter(this.csfdPage.find('.rating-average-withtabs'));
    }

    getCurrentUserRating() {
        let rating = this.csfdPage.find('.current-user-rating .stars');

        if (rating.length === 0) {
            return null;
        }

        if (rating.find('.trash').length > 0) {
            return 0;
        }

        for(let stars = 0; stars <= 5; stars++) {
            if (rating.hasClass('stars-' + stars)) {
                return stars;
            }
        }
    }

    isRated() {
        return this.csfdPage.find('.box-rating-container .not-rated').length === 0;
    }

    getMovieName() {
        let title = $('meta[property=\'og:title\']').attr('content');
        title = title.replace(/\(TV seriál\)/, '');
        title = title.replace(/\(TV film\)/, '');
        let titleRegex = title.match(/(.+)\((\d{4})\)/);

        let name = titleRegex[1];
        name = name.replace(/.+\//, '');

        return $.trim(name);
    }

}
