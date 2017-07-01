import * as Reveal from 'reveal.js';
const marked = require('marked');
const EmojiConvertor = require('emoji-js');
import {slides} from './slides';

function render(slides, element) {
  const emoji = new EmojiConvertor();
  const container = document.createElement('div');
  container.className = 'reveal';
  container.innerHTML = `<div class="slides">
  ${slides.map(slide => `<section data-markdown>${marked(emoji.replace_colons(slide.content))}</section>`).join('\n')}
</div>`;
  element.appendChild(container);
}

render(slides, document.querySelector('body'));
Reveal.initialize();