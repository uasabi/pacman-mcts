import * as Reveal from 'reveal.js';
const marked = require('marked');
import {slides} from './slides';

function render(slides, element) {
  const container = document.createElement('div');
  container.className = 'reveal';
  container.innerHTML = `<div class="slides">
  ${slides.map(slide => `<section data-markdown>${marked(slide.content)}</section>`).join('\n')}
</div>`;
  element.appendChild(container);
}

render(slides, document.querySelector('body'));
Reveal.initialize();