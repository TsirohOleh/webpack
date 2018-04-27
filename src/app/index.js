import './styles.scss';

import { getConversation } from './core/services/get-conversation.service';
import { appendHtml, appendMessage, appendAnnswers, forEachAsync } from './core/services/helpers';
import { dots } from './templates/dots';
import { button } from './templates/button';

async function renderNextElement($element, option) {
  console.log(1);
  switch (option.type) {
    case 'message':
      appendMessage($element, option);
      break;
    case 'answers':
      appendAnnswers($element, option);
      break;
    default:
      break;
  }

  await new Promise(resolve => setTimeout(() => resolve(), option.delay));
}

const renderChat = (id) => {
  const chatBotContainer$ = document.getElementById(id);
  const chat = `
    <div class="c-chat">
      <div class="c-chat__scroll"></div>
    </div>
  `;
  let $chat;

  chatBotContainer$.innerHTML = chat;
  $chat = document.querySelector('.c-chat__scroll');

  getConversation()
    .then((data) => {
      console.log(data);
      forEachAsync(data.start, (option) => {
        renderNextElement($chat, option);
      });
    });
};
const init = (id) => {
  document.addEventListener('DOMContentLoaded', () => {
    renderChat(id);
  });
};

init('chat-bot');

module.exports = {
  init: init
};