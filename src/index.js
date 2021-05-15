import Csfd from './classes/Csfd';
import Omdb from "./classes/Omdb";
import Toolbar from "./classes/Toolbar";

let csfd = new Csfd($('div.page-content'));
let omdb = new Omdb(csfd, 'ee2fe641');
let toolbar = new Toolbar(csfd);

csfd.createCurrentUserRatingStars();
