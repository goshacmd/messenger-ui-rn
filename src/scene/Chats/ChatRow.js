// @flow

import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import Avatar from '../../common/Avatar';
import Badge from '../../common/Badge';

const ChatRow = ({ onPress, name, lastText, unreadCount } : { onPress: () => void, name: string, lastText: ?string, unreadCount: number }) => (
  <TouchableHighlight style={{ flex: 1 }} onPress={onPress}>
    <View style={styles.container}>
      <Avatar size={50} username={name} style={{ marginRight: 15 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ flex: 1, ...styles.title }}>{name}</Text>
        <Text style={{ flex: 1, ...styles.subtitle }}>{lastText}</Text>
      </View>
      {unreadCount > 0 ? <Badge size={28} count={unreadCount} /> : null}
    </View>
  </TouchableHighlight>
);

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    color: "#333",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 5,
  },
  subtitle: {
    color: "#888",
    fontSize: 14,
    lineHeight: 18,
  },
};

export default ChatRow;
