export default class UserRating {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeUserRating();
    }

    initializeUserRating() {
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
                'font-size': '20px',
                'line-height': '30px',
                'margin-left': '12px',
                'margin-top': '-12px',
                'text-align': 'left',
            });

        let dateElement = $('<span>')
            .css({
                'font-size': '10px',
                'line-height': '20px',
                'margin-left': '20px',
                'opacity': 0.7,
            })
            .text(this.csfd.getCurrentUserRatingDate());

        if (currentUserRating > 0) {
            for (let renderStars = 0; renderStars < currentUserRating; renderStars++) {
                starsElement.text(starsElement.text() + '★');
            }
            starsElement.append(dateElement);
        } else {
            starsElement.text(':(');
        }

        csfdRatingBox.append(starsElement);
    }

}
