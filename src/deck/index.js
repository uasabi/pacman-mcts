import * as Reveal from 'reveal.js';

const slides = [
  {
    content: 'Slide 1'
  },
  {
    content: 'Slide 2'
  }
];

function render(slides, element) {
  return element.innerHTML = `<div class="reveal">
  <div class="slides">
    ${slides.map(slide => `<section>${slide.content}</section>`)}
  </div>
</div>`;
}

render(slides, document.querySelector('body'));
Reveal.initialize();