// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  NavigationExperimental,
} from 'react-native';
import { connect } from 'react-redux';

import { navPop, navPush } from './store';
import { getChatById, getNavigationState } from './selectors';

import Header from './common/Header';
import ChatsViewScene from './scene/Chats';
import ChatViewScene from './scene/Chat';

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

function mapStateToProps(state) {
  return {
    navigationState: getNavigationState(state),
    getChatById: getChatById.bind(null, state),
  };
}

const mapDispatchToProps = {
  navPush,
  navPop,
};

class AwesomeProject extends Component {
  props: {
    navigationState: Object,
    getChatById: (chatId: number) => Object,
    navPush: (chatId: number) => void,
    navPop: () => void,
  };

  render() {
    return (
      <NavigationCardStack
        onNavigateBack={() => this.props.navPop()}
        navigationState={(this.props.navigationState : any)}
        renderScene={this._renderScene}
        style={{ flex: 1 }}
      />
    );
  }

  _renderScene = (info) => {
    const { route } = info.scene;
    const { chatId } = (route : any);

    const chat = chatId ? this.props.getChatById(chatId) : null;
    const title = chat ? chat.name : 'Chats';
    const chatView = <ChatViewScene chatId={chatId} />;
    const chatsView = <ChatsViewScene />;

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Header
            onBack={chatId ? this.props.navPop : null}
            title={title}
            subtitle={chatId ? "online" : null}
          />
          {chatId ? chatView : chatsView}
        </KeyboardAvoidingView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
const ConnectedAwesomeProject = connect(mapStateToProps, mapDispatchToProps)(AwesomeProject);

export default ConnectedAwesomeProject;
