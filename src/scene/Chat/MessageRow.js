// @flow

import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  MapView,
} from 'react-native';

import { isEmoji } from '../../util';
import Avatar from '../../common/Avatar';

import MessageBubble from './MessageBubble';
import BigEmoji from './BigEmoji';

const styles = {
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  pad: {
    width: 40,
    height: 40,
  },
};

const ContentObject = ({ own, type, text, coords, uri }) => {
  let content;
  if (type === 'text') {
    const emoji = isEmoji(text.trim());
    if (emoji) {
      content = (
        <BigEmoji text={text} style={{ textAlign: own ? 'right' : 'left' }} />
      );
    } else {
      content = (
        <MessageBubble own={own} text={text} />
      );
    }
  } else if (type === 'location') {
    content = (
      <MapView style={{ height: 150, flex: 2 }} annotations={[coords]} region={coords} />
    );
  } else if (type === 'image') {
    content = (
      <Image source={{ uri }} style={{ height: 150, flex: 2 }} />
    );
  }
  return content;
};

const MessageRow = ({ username, own, ...msg } : { username: string, own: bool }) => {
  const content = <ContentObject own={own} {...msg} />;
  return own ? (
    <View style={styles.container}>
      <View username={username} style={{ ...styles.pad, marginRight: 10 }} />
      <View style={{ flex: 1 }} />
      {content}
    </View>
  ) : (
    <View style={styles.container}>
      <Avatar size={40} username={username} style={{ marginRight: 10 }} />
      {content}
      <View style={{ flex: 1 }} />
      <View style={{ ...styles.pad, marginLeft: 10 }} />
    </View>
  );
};
export default MessageRow;
