import Csfd from './classes/Csfd';
import OmdbApi from "./classes/OmdbApi";
import Toolbar from "./classes/Toolbar";

let csfd = new Csfd($('div.page-content'));
let omdbApi = new OmdbApi(csfd, 'ee2fe641');
let toolbar = new Toolbar(csfd);

csfd.createCurrentUserRatingStars();
