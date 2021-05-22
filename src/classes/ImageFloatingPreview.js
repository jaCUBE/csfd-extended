import ImdbRating from "./ImdbRating";

export default class ImageFloatingPreview {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeImageFloatingPreview();
    }

    initializeImageFloatingPreview() {
        this.popup = $('<img>')
            .css({
                'box-shadow': '5px 5px 14px 8px rgba(0,0,0,0.75)',
            });
        $('body').append(this.popup);

        $('.creators a')
            .bind('mouseenter', (e) => {
                let creatorUrl = $(e.target).attr('href');

                this.hoverCreatorLink(creatorUrl);
                this.refreshPopupPosition(e.pageX, e.pageY);
            })
            .bind('mousemove', (e) => this.refreshPopupPosition(e.pageX, e.pageY))
            .bind('mouseleave', () => this.abort());
    }

    showPopup(
        imageUrl
    ) {
        this.popup.attr('src', imageUrl);
        this.popup.show();
    }

    hidePopup() {
        this.popup.attr('src', '');
        this.popup.hide();
    }

    refreshPopupPosition(
        x,
        y
    ) {
        this.popup.css({
            'position': 'absolute',
            'left': x + 15,
            'top': y + 15,
            'z-index':999,
        })
    }

    abort() {
        this.currentRequest.abort();
        this.hidePopup();
    }

    hoverCreatorLink(
        url
    ) {
        this.currentRequest = $.ajax({
            method: 'GET',
            url: url,
        });

        this.currentRequest.done((response) => {
            if (
                typeof response === 'object'
                && 'redirect' in response
            ) {
                this.hoverCreatorLink(response.redirect);
                return;
            }

            let creatorImageUrl = $(response).find('.creator-profile-content>figure img').attr('src');

            if (creatorImageUrl !== undefined) {
                this.showPopup(creatorImageUrl);
            }
        });
    }

}
