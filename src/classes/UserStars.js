export default class UserStars {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeUserStars();
    }

    initializeUserStars() {
        let currentUserRating = this.csfd.getCurrentUserRating();

        if (currentUserRating === null) {
            return;
        }

        let csfdRatingBox = this.csfd.csfdPage.find('.box-rating .rating-average-withtabs');

        csfdRatingBox.css({
            'line-heigt': '30px',
        });

        let starsElement = $('<span>')
            .css({
                'display': 'block',
                'font-size': '16px',
                'line-height': '30px',
                'margin-top': '-12px',
            });

        if (currentUserRating > 0) {
            for (let renderStars = 0; renderStars < currentUserRating; renderStars++) {
                starsElement.text(starsElement.text() + '★');
            }
        } else {
            starsElement.text(':(');
        }

        csfdRatingBox.append(starsElement);
    }

}
