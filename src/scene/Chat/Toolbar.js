// @flow

import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';

import colors from '../../colors';
import Button from '../../common/IconButton';

const Toolbar = (
  { text, onShowActions, onToggleEmoji, onSendMessage, onChangeText, onKeyboardEvent } :
    { text: string, onShowActions: () => void, onToggleEmoji: () => void, onSendMessage: () => void, onChangeText: (text: string) => void, onKeyboardEvent: (shown: bool) => void }
) => (
  <View style={styles.container}>
    <Button size={50} onPress={onShowActions}>+</Button>
    <TextInput
      style={styles.input}
      selectionColor={colors.blue}
      placeholder="Type here..."
      value={text}
      blurOnSubmit={false}
      returnKeyType="send"
      onChangeText={onChangeText}
      onSubmitEditing={onSendMessage}
      onFocus={() => onKeyboardEvent(true)}
      onBlur={() => onKeyboardEvent(false)}
    />
    <Button size={50} onPress={onToggleEmoji}>☺︎</Button>
    <Button size={50} onPress={onSendMessage}>→</Button>
  </View>
);

const styles = {
  container: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    height: 50,
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
};

export default Toolbar;
