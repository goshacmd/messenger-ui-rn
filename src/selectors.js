// @flow

import type { FullState } from './store';

export const getQuery = (state: FullState) => state.main.query;
export const getName = (state: FullState) => state.main.name;
export const getChats = (state : FullState) => state.main.chats;
export const getChatById = (state : FullState, id : number) => {
  return getChats(state).find(chat => chat.id === id);
};
export const getChat = (state : FullState) => {
  const currentChatId = getCurrentChatId(state);
  if (!currentChatId) return;
  return getChatById(state, currentChatId);
};
export const getMessages = (state : FullState) => {
  return (getChat(state) || { messages: [] }).messages;
};
export const getText = (state : FullState) => state.main.text;
export const getNavigationState = (state : FullState) => state.nav;
export const getCurrentChatId = (state : FullState) : ?number => {
  return state.nav.routes.slice(-1)[0].chatId;
};

export function getFilteredChats(state : FullState) {
  const chats = getChats(state);
  const query = getQuery(state);

  const queryRe = new RegExp(query.trim(), 'i');
  const matchesQuery = text => queryRe.exec(text);

  const filteredChats = query.length === 0 ?
    chats :
    chats.filter(chat => {
      if (matchesQuery(chat.name)) return true;
      return chat.messages.some(msg => {
        if (msg.type !== 'text') return false;
        return matchesQuery(msg.text);
      });
    });

  return filteredChats;
}
