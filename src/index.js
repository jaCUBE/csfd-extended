import Csfd from './classes/Csfd';
import OmdbApi from "./classes/OmdbApi";

let csfd = new Csfd($('div.page-content'));
let omdbApi = new OmdbApi(csfd, 'ee2fe641');

csfd.createCurrentUserRatingStars();
