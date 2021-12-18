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

    isMarkedAsWantToWatch() {
        let controlPanelText = this.csfdPage.find('.control-panel').text();

        return controlPanelText.includes('Upravit ve Chci vidět')
            || controlPanelText.includes('Upraviť v Chcem vidieť');
    }

    getOpenGraphTitle() {
        return $('meta[property="og:title"]').attr('content');
    }

}
