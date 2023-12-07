export default class Toolbar {

    constructor(
        csfd
    ) {
        this.csfd = csfd;

        this.initializeToolbar();
    }

    initializeToolbar() {
        let boxButtons = this.csfd.csfdPage.find('.box-rating-container .box-buttons');

        let imdbCode = this.csfd.getImdbCode();
        let encodedLinkingDataMovieTitle = encodeURIComponent(this.csfd.getLinkingDataMovieTitle());

        boxButtons.prepend(
            this.createButton(
                'Titulky.com',
                null,
                'http://www.titulky.com/?Fulltext=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'Trakt.TV',
                null,
                'https://trakt.tv/search/imdb?q=' + imdbCode
            ),
            this.createButton(
                'JustWatch',
                null,
                'https://www.justwatch.com/cz/vyhled%C3%A1n%C3%AD?q=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'Google',
                null,
                'https://www.google.cz/search?q=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'YouTube',
                null,
                'https://www.youtube.com/results?search_query=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'BoxOffice',
                null,
                'http://www.boxofficemojo.com/search/?q=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'Uloz.to',
                'pirate',
                'http://www.uloz.to/hledej?media=video&protected=notPassword&redir=0&q=' + encodedLinkingDataMovieTitle
            ),
            this.createButton(
                'YIFY',
                'pirate',
                'https://www.google.cz/search?q=' + encodedLinkingDataMovieTitle + ' site:yts.mx OR site:yify-movies.net'
            ),
            this.createButton(
                'Torrent',
                'pirate',
                'http://www.aiosearch.com/search/4/Torrents/' + encodedLinkingDataMovieTitle
            ),
        );
    }

    createButton(
        name,
        style,
        url,
    ) {
        let backgroundColor = '#DE5254';
        let fontColor = '#FFF';
        let iconClass = 'icon-globe-circle';

        if (style === 'pirate') {
            backgroundColor = '#A2A2A2';
            iconClass = 'icon-folder';
        }

        let button = $('<a>')
            .attr('href', url)
            .addClass('button button-big')
            .css({
                'background-color': backgroundColor,
                'color': fontColor,
                'padding-left': '6px',
            })
            .html('<i class="icon ' + iconClass + '"></i>' + name);

        button.hover(
            (e) => {
                $(e.target).css({
                    'opacity': 1.0,
                });
            },
            (e) => {
                $(e.target).css({
                    'opacity': 0.95,
                });
            },
        );

        button.trigger('mouseleave');

        return button;
    }

}
