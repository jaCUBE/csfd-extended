import Csfd from './classes/Csfd';
import Omdb from "./classes/Omdb";
import Toolbar from "./classes/Toolbar";
import UserRating from "./classes/UserRating";
import WantToWatch from "./classes/WantToWatch";
import ImageFloatingPreview from "./classes/ImageFloatingPreview";
import Cache from "./classes/Cache";

let cache = new Cache(7 * 24 * 3600);

let csfd = new Csfd($('div.page-content'));
let omdb = new Omdb(csfd, 'ee2fe641', cache);
let userRating = new UserRating(csfd);
let wantToWatch = new WantToWatch(csfd);
let toolbar = new Toolbar(csfd);
let imageFloatingPreview = new ImageFloatingPreview(csfd);
