// @flow

import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableHighlight, Text } from 'react-native';
import { TextInput } from 'react-native';

import { navPush, setQuery } from '../../store';
import { getFilteredChats, getQuery } from '../../selectors';

import ChatRow from './ChatRow';
import SearchBar from './SearchBar';

const ChatsViewScene = ({ query, chats, onSelectChat, onChangeQuery }) => (
  <View style={{ flex: 1 }}>
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ alignItems: 'stretch' }}
    >
      <SearchBar query={query} onChange={onChangeQuery} />
      <View style={{ flex: 1 }}>
        {chats.map(chat => (
          <ChatRow
            key={chat.id}
            name={chat.name}
            lastText={chat.lastText}
            unreadCount={chat.unreadCount}
            onPress={() => onSelectChat(chat.id)}
          />
        ))}
      </View>
      {chats.length !== 0 ? null : (
        <View style={{ padding: 40 }}>
          <Text style={{ fontSize: 16, color: "#888", textAlign: 'center' }}>
            No chats.
          </Text>
        </View>
      )}
    </ScrollView>
  </View>
);

function mapStateToProps(state) {
  const chats = getFilteredChats(state);
  const query = getQuery(state);

  return {
    chats,
    query,
  };
}

const mapDispatchToProps = { onSelectChat: navPush, onChangeQuery: setQuery };

export default connect(mapStateToProps, mapDispatchToProps)(ChatsViewScene);
