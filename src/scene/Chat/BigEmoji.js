// @flow

import React from 'react';
import { Text } from 'react-native';

const BigEmoji = ({ text, style } : { text: string, style?: ?Object }) => (
  <Text style={{ ...styles.emoji, ...style }}>
    {text}
  </Text>
);

const styles = {
  emoji: {
    fontSize: 50,
    lineHeight: 50,
    paddingBottom: 3,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    padding: 0,
  },
};

export default BigEmoji;
