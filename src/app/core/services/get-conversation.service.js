import { config } from '../config/config';

export function getConversation() {
  return fetch(config.dataUrl)
    .then(res => res.json());
}