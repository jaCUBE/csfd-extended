import Csfd from './classes/Csfd';
import Omdb from "./classes/Omdb";
import Toolbar from "./classes/Toolbar";
import UserRating from "./classes/UserRating";
import ImageFloatingPreview from "./classes/ImageFloatingPreview";
import Cache from "./classes/Cache";

let cache = new Cache(7 * 24 * 3600);

let csfd = new Csfd($('div.page-content'));
let omdbApiKey = GM_getValue('omdbApiKey', '');

if (omdbApiKey !== '') {
    new Omdb(csfd, omdbApiKey, cache);
}

let userRating = new UserRating(csfd);
let toolbar = new Toolbar(csfd);
let imageFloatingPreview = new ImageFloatingPreview(csfd);

GM_registerMenuCommand('Nastavit OMDb API key', () => {
    let newOmdbApiKey = prompt('OMDb API key', omdbApiKey);

    if (newOmdbApiKey === null || newOmdbApiKey.trim() === '') {
        return;
    }

    GM_setValue('omdbApiKey', newOmdbApiKey.trim());
    location.reload();
});
