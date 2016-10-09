// @flow

import { combineReducers } from 'redux';
import { NavigationExperimental } from 'react-native';
const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

export type Coords = {};
type BaseNavigationState = {
  index: number,
  routes: Array<{
    key: string,
    title?: string,
  }>,
};
export type RouteInfo = {
  key: string,
  chatId?: number,
  title?: string,
};
type NavigationState = {
  index: number,
  routes: Array<RouteInfo>,
};

type MessageMeta = { own: bool };
type TextMessage = MessageMeta & {
  type: 'text',
  text: string,
};
type LocationMessage = MessageMeta & {
  type: 'location',
  coords: Coords,
};
type ImageMessage = MessageMeta & {
  type: 'image',
  uri: string,
};
export type Message = TextMessage | LocationMessage | ImageMessage;

type State = {
  name: string,
  text: string,
  query: string,
  chats: Array<{
    id: number,
    name: string,
    unreadCount: number,
    messages: Array<Message>,
  }>,
};

export type FullState = {
  main: State,
  nav: NavigationState,
};

const initialNavigationState : NavigationState = {
  index: 0, // Starts with first route focused.
  routes: [{key: 'Chats'}], // Starts with only one route.
};

const initialState : State = {
  name: 'Gosha',
  text: '',
  query: '',
  chats: [
    {
      id: 1,
      name: 'Alice',
      unreadCount: 5,
      lastText: 'Hey!',
      messages: [
        { type: 'text', own: false, text: 'Hey there' },
        { type: 'text', own: false, text: 'Suuuup?' },
        { type: 'text', own: true, text: 'Yo!' },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      unreadCount: 1,
      lastText: 'Suuuup!',
      messages: [
        { type: 'text', own: false, text: 'Suuuup?' },
      ],
    },
    {
      id: 3,
      name: 'Susanne',
      unreadCount: 0,
      lastText: 'Hi',
      messages: [
        { type: 'text', own: false, text: 'Hi' },
      ],
    },
  ]
};

type SetQuery = { type: 'SET_QUERY', text: string };
type SetTextAction = { type: 'SET_TEXT', text: string };
type SendTextAction = { type: 'SEND_TEXT_MESSAGE', chatId: number, text: string };
type SendImageAction = { type: 'SEND_IMAGE', chatId: number, uri: string };
type SendLocationAction = { type: 'SEND_LOCATION', chatId: number, coords: Coords };
type NavPopAction = { type: 'NAV_POP' };
type NavPushAction = { type: 'NAV_PUSH', chatId: number };

type Action = SetQuery | SetTextAction | SendTextAction | SendImageAction | SendLocationAction | any;

const addMessage = (state: State, currentChatId: number, msg: Message) => {
  const { chats } = state;
  const newChats = chats.map(chat => {
    if (chat.id !== currentChatId) return chat;
    return { ...chat, messages: [...chat.messages, msg] };
  });
  return { ...state, chats: newChats };
};
const setNavigationState = (state: State, navigationState: NavigationState) => ({ ...state, navigationState });

const navReducer = (state : NavigationState = initialNavigationState, action : NavPopAction | NavPushAction | any) : NavigationState => {
  switch (action.type) {
    case 'NAV_POP':
      return (NavigationStateUtils.pop((state: any)) : any);
    case 'NAV_PUSH':
      return (NavigationStateUtils.push((state: any), { key: 'Chat-' + action.chatId, chatId: action.chatId }) : any );
    default: return state;
  }
};

const mainReducer = (state : State = initialState, action : Action = {}) : State => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.text };
    case 'SET_TEXT':
      return { ...state, text: action.text };
    case 'SEND_TEXT_MESSAGE':
      return addMessage(state, action.chatId, { type: 'text', own: true, text: action.text });
    case 'SEND_IMAGE':
      return addMessage(state, action.chatId, { type: 'image', own: true, uri: action.uri });
    case 'SEND_LOCATION':
      return addMessage(state, action.chatId, { type: 'location', own: true, coords: action.coords });
    default: return state;
  }
};

export const reducer = combineReducers({ main: mainReducer, nav: navReducer });

export const setQuery = (text: string) : SetQuery => ({ type: 'SET_QUERY', text });
export const setText = (text: string) : SetTextAction => ({ type: 'SET_TEXT', text });
export const sendTextMessage = (chatId: number, text: string) : SendTextAction => ({ type: 'SEND_TEXT_MESSAGE', chatId, text });
export const sendImage = (chatId: number, uri: string) : SendImageAction => ({ type: 'SEND_IMAGE', chatId, uri });
export const sendLocation = (chatId: number, coords: Coords) : SendLocationAction => ({ type: 'SEND_LOCATION', chatId, coords });
export const navPop = () : NavPopAction => ({ type: 'NAV_POP' });
export const navPush = (chatId: number) : NavPushAction => ({ type: 'NAV_PUSH', chatId });
