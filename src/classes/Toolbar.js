export default class Toolbar {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeToolbar();
    }

    initializeToolbar() {
        let toolbarHtml = $('<div>')
            .addClass('updated-box-content')
            .css({
                'padding': '8px',
                'border-bottom': '1px solid var(--color-grey-lighter2)',
            });

        let imdbCode = this.csfd.getImdbCode();
        let encodedLinkingDataMovieTitle = encodeURIComponent(this.csfd.getLinkingDataMovieTitle());

        toolbarHtml.prepend(
            this.createButton(
                'Titulky.com',
                'http://www.titulky.com/?Fulltext=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'Trakt.TV',
                'https://trakt.tv/search/imdb?q=' + imdbCode
            ),
            this.createButton(
                'JustWatch',
                'https://www.justwatch.com/cz/vyhled%C3%A1n%C3%AD?q=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'Google',
                'https://www.google.cz/search?q=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'YouTube',
                'https://www.youtube.com/results?search_query=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'BoxOffice',
                'http://www.boxofficemojo.com/search/?q=' + encodedLinkingDataMovieTitle
            ),
            $('<div>')
                .css({
                    'height': '16px',
                }),
            this.createButton(
                'Webshare.cz',
                'https://webshare.cz/#/search?what=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'Sk-CzTorrent',
                'https://sktorrent.eu/torrent/torrents_v2.php?search=' + encodedLinkingDataMovieTitle
            ),
        );

        this.csfd.csfdPage.find('.ranking-tabs-csfd').before(toolbarHtml);
    }

    createButton(
        name,
        url,
    ) {
        let backgroundColor = '#DE5254';

        let button = $('<a>')
            .attr('href', url)
            .addClass('button')
            .css({
                'background': 'var(--color-grey-lighter)',
                'border': '1px solid var(--color-grey-lighter)',
                'border-radius': '10px',
                'color': 'var(--color-blue)',
                'margin': '1px',
            })
            .html(name);

        button.hover(
            (e) => {
                $(e.target).css({
                    'border-color': 'var(--color-blue)',
                    'opacity': 1.0,
                });
            },
            (e) => {
                $(e.target).css({
                    'border-color': 'var(--color-grey-lighter)',
                    'opacity': 0.8,
                });
            },
        );

        button.trigger('mouseleave');

        return button;
    }

}
