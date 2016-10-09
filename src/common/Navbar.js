// @flow

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const styles = {
  navbar: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
};
const Navbar = ({ leftContent, children } : { leftContent: any, children?: ?any }) => (
  <View style={styles.navbar}>
    {leftContent}
    {children}
    {leftContent ? <View pointerEvents="none" style={{ opacity: 0 }}>{leftContent}</View> : null}
  </View>
);

export default Navbar;
