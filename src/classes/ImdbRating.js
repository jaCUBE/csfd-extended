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
                'font-size': '9px',
                'font-weight': 'normal',
                'line-height': '10px',
                'padding-bottom': '8px',
            })
            .html('<strong>' + imdbVotes + '</strong> hlasů');

        let imdbRatingBox = $('<a>')
            .addClass('rating-average csfd-extended-imdb-rating')
            .css({
                'display': 'block',
                'color': '#000000',
                'cursor': 'pointer',
                'line-height': '60px',
            })
            .attr('href', 'https://www.imdb.com/title/' + this.csfd.getImdbCode())
            .html(imdbRating)
            .append(imdbVotesSpan);

        imdbRatingBox
            .hover(
                (e) => {
                    imdbRatingBox.css({
                        'background': '#F5BE18FF',
                    })
                },
                (e) => {
                    imdbRatingBox.css({
                        'background': '#F5C518',
                    })
                },
            )
            .trigger('mouseleave');

        imdbRatingBox.insertBefore(this.csfd.csfdPage.find('.rating-fan-switch'));
    }

}
