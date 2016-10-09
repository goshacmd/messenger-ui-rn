// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import colors from '../colors';

const Button = ({ size, onPress, children } : { size: number, onPress: () => void, children?: ?any }) => (
  <View style={{ width: size, height: size }}>
    <TouchableOpacity style={{ width: size, height: size }} onPress={onPress}>
      <View style={{ width: size, height: size, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ flex: 0, color: colors.blue, fontSize: size / 1.7, lineHeight: size / 1.7, textAlign: 'center' }}>{children}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default Button;
