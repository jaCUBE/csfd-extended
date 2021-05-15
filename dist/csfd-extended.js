/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/Csfd.js
class Csfd {

    constructor(csfdPage) {
        this.csfdPage = csfdPage
    }

    getImdbCode() {
        let imdbButton = this.csfdPage.find('a.button-imdb');

        return imdbButton.length > 0
            ? imdbButton.attr('href').match(/(tt\d+)/)[0]
            : null;
    }

    getCurrentUserRating() {
        let rating = this.csfdPage.find('.current-user-rating .stars');

        if (rating.length === 0) {
            return null;
        }

        if (rating.find('.trash').length > 0) {
            return 0;
        }

        for(let stars = 0; stars <= 5; stars++) {
            if (rating.hasClass('stars-' + stars)) {
                return stars;
            }
        }
    }

    isRated() {
        return this.csfdPage.find('.box-rating-container .not-rated').length === 0;
    }

    isMarkedAsWantToWatch() {
        return this.csfdPage.find('.control-panel').text().includes('Upravit ve Chci vidět');
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

;// CONCATENATED MODULE: ./src/classes/ImdbRating.js
class ImdbRating {

    constructor(
        csfd,
        imdbRating,
        imdbVotes
    ) {
        this.csfd = csfd;

        this.initializeImdbRating(imdbRating, imdbVotes);
    }

    initializeImdbRating(
        imdbRating,
        imdbVotes
    ) {
        let imdbVotesSpan = $('<span>')
            .css({
                'display': 'block',
                'font-size': '11px',
                'line-height': '15px',
                'padding-bottom': '10px',
            })
            .html(imdbVotes);

        let imdbRatingBox = $('<a>')
            .addClass('rating-average csfd-extended-imdb-rating')
            .css({
                'display': 'block',
                'background': '#f5c518',
                'color': '#000000',
                'cursor': 'pointer',
            })
            .attr('href', 'https://www.imdb.com/title/' + this.csfd.getImdbCode())
            .html(imdbRating)
            .append(imdbVotesSpan);

        imdbRatingBox.insertBefore(this.csfd.csfdPage.find('.rating-fan-switch'));
    }

}

;// CONCATENATED MODULE: ./src/classes/Omdb.js


class Omdb {

    constructor(
        csfd,
        omdbApiKey
    ) {
        this.csfd = csfd;
        this.omdbApiKey = omdbApiKey;

        this.getResponse();
    }

    getResponse() {
        let imdbCode = this.csfd.getImdbCode();

        if (imdbCode === null || !this.csfd.isRated()) {
            return;
        }

        let request = $.ajax({
            method: 'GET',
            url: 'https://omdbapi.com/',
            data: {
                apikey: this.omdbApiKey,
                i: imdbCode,
                r: 'json'
            }
        });

        request.done((response) => {
            new ImdbRating(
                this.csfd,
                response.imdbRating,
                response.imdbVotes
            )

            this.response = response;
        });
    }

}

;// CONCATENATED MODULE: ./src/classes/Toolbar.js
class Toolbar {

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
                'YoutTube',
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
            backgroundColor = '#a2a2a2';
            iconClass = 'icon-folder';
        }

        return $('<a>')
            .attr('href', url)
            .addClass('button button-big')
            .css({
                'background-color': backgroundColor,
                'color': fontColor,
            })
            .html('<i class="icon ' + iconClass + '"></i>' + name);
    }

}

;// CONCATENATED MODULE: ./src/classes/UserStars.js
class UserStars {

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

;// CONCATENATED MODULE: ./src/classes/WantToWatch.js
class WantToWatch {

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

;// CONCATENATED MODULE: ./src/index.js






let csfd = new Csfd($('div.page-content'));
let omdb = new Omdb(csfd, 'ee2fe641');
let userStars = new UserStars(csfd);
let wantToWatch = new WantToWatch(csfd);
let toolbar = new Toolbar(csfd);

/******/ })()
;