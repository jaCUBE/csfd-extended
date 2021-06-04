export default class UserRating {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeUserRating();
    }

    initializeUserRating() {
        let currentUserRatingDate = this.csfd.getCurrentUserRatingDate();

        if (currentUserRatingDate === null) {
            return;
        }

        let currentUserRatingBoxTitle = this.csfd.csfdPage.find('.my-rating h3');

        if (currentUserRatingBoxTitle.length === 0) {
            return;
        }

        currentUserRatingBoxTitle.text('Hodnoceno ' + currentUserRatingDate);
    }

}
