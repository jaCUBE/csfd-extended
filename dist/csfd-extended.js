/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/classes/Csfd.js
class Csfd {

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

    isRated() {
        return this.csfdPage.find('.box-rating-container .not-rated').length === 0;
    }

    isMarkedAsWantToWatch() {
        let controlPanelText = this.csfdPage.find('.control-panel').text();

        return controlPanelText.includes('Upravit ve Chci vidět')
            || controlPanelText.includes('Upraviť v Chcem vidieť');
    }

    getMovieName() {
        return $.trim($('[itemprop="name"]').text());
    }

    getMovieYear() {
        return $.trim($('[itemprop="dateCreated"]').text());
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
                'font-size': '9px',
                'font-weight': 'normal',
                'line-height': '10px',
                'padding-bottom': '8px',
            })
            .html('<strong>' + imdbVotes + '</strong> hlasů');

        let imdbRatingBox = $('<a>')
            .addClass('rating-average csfd-extended-imdb-rating')
            .css({
                'display': 'block',
                'color': '#000000',
                'cursor': 'pointer',
                'line-height': '60px',
            })
            .attr('href', 'https://www.imdb.com/title/' + this.csfd.getImdbCode())
            .html(imdbRating)
            .append(imdbVotesSpan);

        imdbRatingBox
            .hover(
                (e) => {
                    imdbRatingBox.css({
                        'background': '#F5BE18FF',
                    })
                },
                (e) => {
                    imdbRatingBox.css({
                        'background': '#F5C518',
                    })
                },
            )
            .trigger('mouseleave');

        imdbRatingBox.insertBefore(this.csfd.csfdPage.find('.my-rating'));
    }

}

;// CONCATENATED MODULE: ./src/classes/Omdb.js


class Omdb {

    constructor(
        csfd,
        omdbApiKey,
        cache
    ) {
        this.csfd = csfd;
        this.omdbApiKey = omdbApiKey;
        this.cache = cache;

        this.getResponse();
    }

    getResponse() {
        let imdbCode = this.csfd.getImdbCode();

        if (imdbCode === null || !this.csfd.isRated()) {
            return;
        }

        let cacheItem = this.cache.getItem(imdbCode);

        if (cacheItem !== null && !this.cache.isItemExpired(cacheItem)) {
            let responseFromCache = cacheItem.value;

            new ImdbRating(
                this.csfd,
                responseFromCache.imdbRating,
                responseFromCache.imdbVotes
            );

            return;
        }

        let request = $.ajax({
            method: 'GET',
            url: 'https://omdbapi.com/',
            data: {
                apikey: this.omdbApiKey,
                i: imdbCode,
                r: 'json'
            },
        });

        request.done((response) => {
            this.cache.saveItem(imdbCode, response);

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
        let encodedMovieNameWithYear = encodeURIComponent(this.csfd.getMovieName() + ' ' + this.csfd.getMovieYear());

        boxButtons.prepend(
            this.createButton(
                'Titulky.com',
                null,
                'http://www.titulky.com/?Fulltext=' + encodedMovieNameWithYear
            ),
            this.createButton(
                'Trakt.TV',
                null,
                'https://trakt.tv/search/imdb?q=' + imdbCode
            ),
            this.createButton(
                'Google',
                null,
                'https://www.google.cz/search?q=' + encodedMovieNameWithYear
            ),
            this.createButton(
                'YouTube',
                null,
                'https://www.youtube.com/results?search_query=' + encodedMovieNameWithYear
            ),
            this.createButton(
                'BoxOffice',
                null,
                'http://www.boxofficemojo.com/search/?q=' + encodedMovieNameWithYear
            ),
            this.createButton(
                'Uloz.to',
                'pirate',
                'http://www.uloz.to/hledej?media=video&protected=notPassword&redir=0&q=' + encodedMovieNameWithYear
            ),
            this.createButton(
                'YIFY',
                'pirate',
                'https://www.google.cz/search?q=' + encodedMovieNameWithYear + ' site:yts.ag OR site:yify-movies.net OR site:yify-movie.com'
            ),
            this.createButton(
                'Torrent',
                'pirate',
                'http://www.aiosearch.com/search/4/Torrents/' + encodedMovieNameWithYear
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

;// CONCATENATED MODULE: ./src/classes/UserRating.js
class UserRating {

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
                'background': '#BA034F',
                'border-top': '1px solid #D2D2D2',
                'color': '#FFFFFF',
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

;// CONCATENATED MODULE: ./src/classes/ImageFloatingPreview.js


class ImageFloatingPreview {

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
                'z-index': 999,
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

;// CONCATENATED MODULE: ./src/classes/CacheItem.js
class CacheItem {

    constructor(
        name,
        value,
        expireAt
    ) {
        this.name = name;
        this.expireAt = expireAt;
        this.value = value;
    }

}

;// CONCATENATED MODULE: ./src/classes/Cache.js


class Cache {

    constructor(
        expirationInSeconds
    ) {
        this.expirationInSeconds = 600;
        this.namespace = 'csfd-extended';
    }

    saveItem(
        key,
        value
    ) {
        let cacheItem = new CacheItem(
            this.addNamespaceToName(key),
            value,
            Math.floor(Date.now() / 1000) + this.expirationInSeconds
        )

        localStorage.setItem(
            this.addNamespaceToName(key),
            JSON.stringify(cacheItem)
        )
    }

    getItem(
        key
    ) {
        let cacheItem = localStorage.getItem(
            this.addNamespaceToName(key)
        );

        return cacheItem !== null
            ? JSON.parse(cacheItem)
            : null;
    }

    isItemExpired(
        caheItem
    ) {
        return caheItem.expireAt < Math.floor(Date.now() / 1000);
    }

    addNamespaceToName(name) {
        return this.namespace + '.' + name;
    }

}

;// CONCATENATED MODULE: ./src/index.js








let cache = new Cache(7 * 24 * 3600);

let csfd = new Csfd($('div.page-content'));
let omdb = new Omdb(csfd, 'ee2fe641', cache);
let userRating = new UserRating(csfd);
let wantToWatch = new WantToWatch(csfd);
let toolbar = new Toolbar(csfd);
let imageFloatingPreview = new ImageFloatingPreview(csfd);

/******/ })()
;