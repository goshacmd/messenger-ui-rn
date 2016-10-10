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
import Onboarder from './common/Onboarder';

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

  constructor() {
    super();
    this.state = {
      completedOnboarding: false,
    };
  }

  render() {
    const Circle = () => (
      <View style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: "blue" }} />
    );
    const Square = () => (
      <View style={{ width: 150, height: 150, backgroundColor: "orangered" }} />
    );

    if (!this.state.completedOnboarding) {
      return (
        <Onboarder
          pages={[
            { backgroundColor: '#888', image: <Square />, title: 'Simple Messenger UI', subtitle: 'Implemented in React Native' },
            { backgroundColor: "#999", image: <Circle />, title: 'Welcome', subtitle: 'To Earth' },
            { backgroundColor: "#777", image: <Square />, title: 'Also', subtitle: 'Mars is nice' },
          ]}
          onEnd={() => this.setState({ completedOnboarding: true })}
        />
      );
    }
    return (
      <NavigationCardStack
        onNavigateBack={() => this.props.navPop()}
        navigationState={(this.props.navigationState : any)}
        renderScene={this._renderScene}
        renderHeader={null}
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
