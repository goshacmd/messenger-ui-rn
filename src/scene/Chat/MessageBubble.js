// @flow

import React from 'react';
import { Text, View } from 'react-native';

import colors from '../../colors';

const styles = {
  textView: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  ownTextView: {
    backgroundColor: colors.blue,
  },
  text: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
  },
  ownText: {
    color: '#fff',
    textAlign: 'right',
  },
};

const MessageBubble = ({ own, text, style } : { own: bool, text: string, style?: ?Object }) => {
  const textStyle = {};
  const viewStyle = Object.assign({}, styles.textView);
  if (own) {
    Object.assign(textStyle, styles.ownText);
    Object.assign(viewStyle, styles.ownTextView);
  }
  return (
    <View style={{ ...viewStyle }}>
      <Text style={{ ...styles.text, ...textStyle }}>{text}</Text>
    </View>
  );
};

export default MessageBubble;
