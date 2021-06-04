export default class Csfd {

    constructor(csfdPage) {
        this.csfdPage = csfdPage
    }

    isLoggedIn() {
        return this.csfdPage.find('.my-rating').length > 0;
    }

    getImdbCode() {
        let imdbButton = this.csfdPage.find('a.button-imdb');

        return imdbButton.length > 0
            ? imdbButton.attr('href').match(/(tt\d+)/)[0]
            : null;
    }

    getCurrentUserRatingDate() {
        let ratingDateInText = this.csfdPage.find('.current-user-rating > span').attr('title');

        if (ratingDateInText === undefined) {
            return null;
        }

        return ratingDateInText.match(/.+(\d{2}\.\d{2}\.\d{4})$/)[1];
    }

    isRated() {
        return this.csfdPage.find('.box-rating-container .not-rated').length === 0;
    }

    isMarkedAsWantToWatch() {
        let controlPanelText = this.csfdPage.find('.control-panel').text();

        return controlPanelText.includes('Upravit ve Chci vidět')
            || controlPanelText.includes('Upraviť v Chcem vidieť');
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
