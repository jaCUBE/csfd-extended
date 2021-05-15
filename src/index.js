import Csfd from './classes/Csfd';
import Omdb from "./classes/Omdb";
import Toolbar from "./classes/Toolbar";
import UserStars from "./classes/UserStars";

let csfd = new Csfd($('div.page-content'));
let omdb = new Omdb(csfd, 'ee2fe641');
let userStars = new UserStars(csfd);
let toolbar = new Toolbar(csfd);
