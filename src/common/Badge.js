// @flow

import React from 'react';
import { View, Text } from 'react-native';

import colors from '../colors';

const Badge = ({ count, style, size } : { count: number, size: number, style?: Object }) => (
  <View style={{ width: size, height: size, justifyContent: 'center', backgroundColor: colors.blue, borderRadius: size / 2, ...style }}>
    <Text style={{ color: "#fff", textAlign: 'center', fontSize: size / 2, lineHeight: size / 2 }}>{count}</Text>
  </View>
);

export default Badge;
