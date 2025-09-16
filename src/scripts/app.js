import { screens } from '../config/screens.js';
import Game from '../core/Game.js';
import DomAdapter from '../adapters/domAdapter.js';

const game = new Game({ screens });
const dom = new DomAdapter(game);

// Expose for debugging
window.game = game;
window.dom = dom;
