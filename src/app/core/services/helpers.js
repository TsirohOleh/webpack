import { dots } from '../../templates/dots';
import { button } from '../../templates/button';

export function appendHtml($container, html) {
  $container.insertAdjacentHTML('beforeend', html);
};

export function appendMessage($container, options) {
  const $balloon = document.createElement('div');

  $balloon.className = 'c-chat__balloon';
  $balloon.innerHTML = dots();
  $container.appendChild($balloon);
  setTimeout(() => {
    $balloon.innerText = options.content;
  }, options.delay);
};

export function appendAnswers($container, options, option, callback) {
  const buttons = `
    <div class="c-chat__buttons c-chat__buttons--choice">
      ${option.content.map((item) => button(item.option))}
    </div>
  `;
  let $buttons;

  setTimeout(() => {
    appendHtml($container, buttons);
    $buttons = $container.querySelectorAll('.c-chat__buttons--choice:last-of-type .c-chat__button');
    $buttons.forEach(($element, i) => {
      $element.addEventListener('click', function clickCallback() {
        $buttons.forEach(($button, buttonIndex) => {
          if (i !== buttonIndex) {
            $button.removeEventListener('click', clickCallback);
            $button.remove();
          } else {
            $button.classList.add('c-chat__button--answer');
          }
        });
        callback($container, options, option.content[i].nextQuestion);
      });
    });
  }, option.delay);
};

export function waitFor(ms) {
  return new Promise(r => setTimeout(r, ms));
}

export async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array);
  }
}
