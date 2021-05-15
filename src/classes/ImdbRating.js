export default class ImdbRating {

    constructor(
        csfd,
        imdbRating,
        imdbVotes
    ) {
        this.csfd = csfd;

        this.initializeImdbRating(imdbRating, imdbVotes);
    }

    initializeImdbRating(
        imdbRating,
        imdbVotes
    ) {
        let imdbVotesSpan = $('<span>')
            .css({
                'display': 'block',
                'font-size': '11px',
                'line-height': '15px',
                'padding-bottom': '10px',
            })
            .html(imdbVotes);

        let imdbRatingBox = $('<a>')
            .addClass('rating-average csfd-extended-imdb-rating')
            .css({
                'display': 'block',
                'background': '#f5c518',
                'color': '#000000',
                'cursor': 'pointer',
            })
            .attr('href', 'https://www.imdb.com/title/' + this.csfd.getImdbCode())
            .html(imdbRating)
            .append(imdbVotesSpan);

        imdbRatingBox.insertAfter(this.csfd.csfdPage.find('.rating-average-withtabs'));
    }

}
