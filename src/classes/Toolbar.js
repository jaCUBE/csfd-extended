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
        let encodedMovieName = encodeURIComponent(this.csfd.getMovieName());

        boxButtons.prepend(
            this.createButton(
                'Titulky.com',
                null,
                'http://www.titulky.com/?Fulltext=' + encodedMovieName
            ),
            this.createButton(
                'Trakt.TV',
                null,
                'https://trakt.tv/search/imdb?q=' + imdbCode
            ),
            this.createButton(
                'Google',
                null,
                'https://www.google.cz/search?q=' + encodedMovieName
            ),
            this.createButton(
                'YouTube',
                null,
                'https://www.youtube.com/results?search_query=' + encodedMovieName
            ),
            this.createButton(
                'BoxOffice',
                null,
                'http://www.boxofficemojo.com/search/?q=' + encodedMovieName
            ),
            this.createButton(
                'Uloz.to',
                'pirate',
                'http://www.uloz.to/hledej?media=video&protected=notPassword&redir=0&q=' + encodedMovieName
            ),
            this.createButton(
                'YIFY',
                'pirate',
                'https://www.google.cz/search?q=' + encodedMovieName + ' site:yts.ag OR site:yify-movies.net OR site:yify-movie.com'
            ),
            this.createButton(
                'Torrent',
                'pirate',
                'http://www.aiosearch.com/search/4/Torrents/' + encodedMovieName
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
