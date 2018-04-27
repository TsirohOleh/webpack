import { dots } from '../../templates/dots';
import { button } from '../../templates/button';

export const appendHtml = ($element, html) => {
  $element.insertAdjacentHTML('beforeend', html);
};

export const appendMessage = ($element, options) => {
  const $balloon = document.createElement('div');

  $balloon.className = 'c-chat__balloon';
  $balloon.innerHTML = dots();
  $element.appendChild($balloon);
  setTimeout(() => {
    $balloon.innerText = options.content;
  }, options.delay);
};

export const appendAnnswers = ($element, options) => {
  const buttons = `
    <div class="c-chat__buttons c-chat__buttons--choice">
      ${options.content.map((item) => button(item.option))}
    </div>
  `;

  setTimeout(() => {
    appendHtml($element, buttons);
  }, options.delay);
};

export const forEachAsync = (array, fn) => {
  return array.reduce((promise, n) => promise.then(() => fn(n)), Promise.resolve());
};