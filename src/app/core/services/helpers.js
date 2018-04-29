import { dots } from '../../templates/dots';
import { button } from '../../templates/button';

export const appendHtml = ($container, html) => {
  $container.insertAdjacentHTML('beforeend', html);
};

export const appendMessage = ($container, options) => {
  const $balloon = document.createElement('div');

  $balloon.className = 'c-chat__balloon';
  $balloon.innerHTML = dots();
  $container.appendChild($balloon);
  setTimeout(() => {
    $balloon.innerText = options.content;
  }, options.delay);
};

export const appendAnnswers = ($container, options, option, callback) => {
  const buttons = `
    <div class="c-chat__buttons c-chat__buttons--choice">
      ${option.content.map((item) => button(item.option))}
    </div>
  `;
  let $questions;

  setTimeout(() => {
    appendHtml($container, buttons);
    $questions = $container.querySelectorAll('.c-chat__buttons--choice .c-chat__button')
    $questions
      .forEach(($element, i) => {
        $element.addEventListener('click', () => {
          $questions.forEach(($question, questionIndex) => {
            if (i !== questionIndex) {
              $question.remove();
            } else {
              $question.classList.add('c-chat__button--answer');
            }
          });
          callback($container, options, option.content[i].nextQuestion);
        });
      });
  }, option.delay);
};

export const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

export async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i], i, array)
  }
}
