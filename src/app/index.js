import './styles.scss';

import { getConversation } from './core/services/get-conversation.service';
import { appendHtml, appendMessage, appendAnnswers, asyncForEach, waitFor } from './core/services/helpers';
import { dots } from './templates/dots';
import { button } from './templates/button';
import { config } from './core/config/config';

init('chat-bot');

let previousDelay = 0;

function init(id) {
  document.addEventListener('DOMContentLoaded', () => {
    renderChat(id);
  });
};

function renderChat(id) {
  const chatBotContainer$ = document.getElementById(id);
  const chat = `
    <div class="c-chat">
      <div class="c-chat__scroll"></div>
    </div>
  `;
  let $chatContainer;

  chatBotContainer$.innerHTML = chat;
  $chatContainer = document.querySelector('.c-chat__scroll');

  getConversation()
    .then((data) => {
      console.log(data);
      nextStep($chatContainer, data, 'start');
    });
};

function nextStep($container, options, stepName) {
  previousDelay = 0;
  asyncForEach(options[stepName], async (option) => {
    await waitFor(previousDelay);
    previousDelay = option.delay + config.typeDelay;
    renderNextElement($container, options, option);
  });
}

function renderNextElement($container, options, option) {
  switch (option.type) {
    case 'message':
      appendMessage($container, option);
      break;
    case 'answers':
      appendAnnswers($container, options, option, nextStep);
      break;
    default:
      break;
  }
}

module.exports = {
  init: init
};
