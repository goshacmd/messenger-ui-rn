// @flow

import React, { Component } from 'react';
import {
  ActionSheetIOS,
  ImagePickerIOS,
  View,
  ScrollView,
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard';
import { connect } from 'react-redux';

import { setText, sendTextMessage, sendImage, sendLocation } from '../../store';
import { getName, getChatById, getMessages, getText } from '../../selectors';
import type { Message, Coords } from '../../store';
import EmojiPicker from '../../common/EmojiPicker';

import MessageRow from './MessageRow';
import Toolbar from './Toolbar';

function showActionSheet(actions : Array<{ label: string, fn?: ?() => void }>) {
  ActionSheetIOS.showActionSheetWithOptions({
    options: actions.map(a => a.label),
    cancelButtonIndex: actions.length - 1,
  }, buttonIndex => {
    const action = actions[buttonIndex];
    if (action && action.fn) action.fn();
  });
}

class ChatViewScene extends Component {
  state: {
    keyboardShown: bool,
    emojiShown: bool,
  };

  props: {
    chatId: number,
    ownUsername: string,
    oppUsername: string,
    messages: Array<Message>,
    text: string,
    onSendMessage: (chatId: number, text: string) => void,
    onSendImage: (chatId: number, uri: string) => void,
    onSendLocation: (chatId: number, coords: Coords) => void,
    onChangeText: (text: string) => void,
  };

  constructor() {
    super();
    this.state = {
      keyboardShown: false,
      emojiShown: false,
    };
  }

  resetText = () => {
    this.props.onChangeText('');
  };

  sendMessage = () => {
    const text = this.props.text;
    if (text.length === 0) return;
    this.props.onSendMessage(this.props.chatId, text);
    this.resetText();
  };

  promptImage = () => {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.props.onSendImage(this.props.chatId, imageUri);
    }, () => {});
  }

  promptLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      this.props.onSendLocation(this.props.chatId, position.coords);
    });
  }

  showActions = () => {
    const actions = [
      {
        label: 'Photo',
        fn: this.promptImage,
      },
      {
        label: 'Location',
        fn: this.promptLocation,
      },
      {
        label: 'Cancel',
      }
    ];

    showActionSheet(actions);
  };

  toggleEmoji = () => {
    if (!this.state.emojiShown) {
      dismissKeyboard();
    }
    this.setState({ emojiShown: !this.state.emojiShown });
  };

  insertEmoji = (emoji) => {
    this.props.onChangeText(this.props.text + emoji);
  };

  render() {
    const { ownUsername, oppUsername, messages, text } = this.props;
    const { keyboardShown, emojiShown } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white' }}
          contentContainerStyle={{ alignItems: 'stretch' }}
        >
          <View style={{ height: 20 }} />
          {messages.map((msg, idx) => (
            <MessageRow key={idx} username={msg.own ? ownUsername : oppUsername} {...msg} />
          ))}
        </ScrollView>
        <Toolbar
          text={text}
          onShowActions={this.showActions}
          onToggleEmoji={this.toggleEmoji}
          onSendMessage={this.sendMessage}
          onChangeText={this.props.onChangeText}
          onKeyboardEvent={shown => this.setState({ keyboardShown: shown })}
        />
        {emojiShown ? <EmojiPicker onPick={this.insertEmoji} /> : null}
      </View>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const chat = getChatById(state, ownProps.chatId);
  if (!chat) return {};
  return {
    ownUsername: getName(state),
    oppusername: chat.name,
    messages: chat.messages,
    text: getText(state),
  };
}

const mapDispatchToProps = {
  onChangeText: setText,
  onSendMessage: sendTextMessage,
  onSendLocation: sendLocation,
  onSendImage: sendImage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatViewScene);
