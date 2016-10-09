// @flow

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import colors from '../colors';

const styles = {
  backButton: {
    color: "#333",
    fontSize: 44,
    lineHeight: 44,
    color: colors.blue,
  },
};

const BackButton = ({ onPress } : { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.backButton}>‹</Text>
  </TouchableOpacity>
);

export default BackButton;
