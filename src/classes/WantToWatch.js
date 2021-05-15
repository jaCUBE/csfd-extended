export default class WantToWatch {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeWantToWatch();
    }

    initializeWantToWatch() {
        if (!this.csfd.isMarkedAsWantToWatch()) {
            return;
        }

        let wantToWatch = $('<a>')
            .attr('href', '?name=watchlist&do=modalWindow')
            .css({
                'background': '#e3e3e3',
                'border-top': '1px solid #d2d2d2',
                'color': '#8c0204',
                'display': 'block',
                'opacity': 0.8,
                'padding': '5px',
                'text-align': 'center',
            })
            .html('👁️ Chci vidět');

        wantToWatch.hover(
            (e) => {
                $(e.target).animate({
                    'opacity': 1.0,
                });
            },
            (e) => {
                $(e.target).animate({
                    'opacity': 0.8,
                });
            },
        );

        this.csfd.csfdPage.find('.tabs.tabs-rating.rating-fan-switch').prepend(wantToWatch);
    }

}
