// @flow

import React from 'react';
import { Image } from 'react-native';

const Avatar = ({ username, size, style } : { username: string, size: number, style?: Object }) => (
  <Image
    source={{ uri: `https://sigil.cupcake.io/${username}` }}
    style={{ borderRadius: size / 2, height: size, width: size, ...style }}
  />
);

export default Avatar;
