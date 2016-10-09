// @flow

import React from 'react';
import { View, Text } from 'react-native';

import colors from '../colors';
import Navbar from './Navbar';
import BackButton from './BackButton';

const styles = {
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.025)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.075)',
  },
  title: {
    flex: 0,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 16,
    color: "#333",
    fontWeight: '600',
  },
  titleWithSub: {
    color: "#222",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  subtitle: {
    flex: 0,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 12,
    color: "#888",
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 8,
    height: 44,
  },
};

const StatusBarPadding = () => <View style={{ height: 20 }} />;

const Title = ({ title, subtitle } : { title: string, subtitle?: ?string }) => (
  <View style={{ ...styles.titleContainer, justifyContent: subtitle ? 'space-around' : 'center' }}>
    <Text style={{ ...styles.title, ...(subtitle ? styles.titleWithSub : null) }}>
      {title}
    </Text>
    {subtitle ? (
      <Text style={{ ...styles.subtitle }}>
        {subtitle}
      </Text>
    ) : null}
  </View>
);

const Header = ({ onBack, title, subtitle } : { onBack?: ?() => void, title: string, subtitle?: ?string }) => (
  <View style={styles.container}>
    <StatusBarPadding />
    <Navbar
      leftContent={onBack ?  <BackButton onPress={onBack} /> : null}
    >
      <Title title={title} subtitle={subtitle} />
    </Navbar>
  </View>
);

export default Header;
