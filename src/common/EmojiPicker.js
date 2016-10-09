// @flow

import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

const emoji = [
  {
    category: 'Smileys & People',
    items: '😀 😂 😅 😇 😉 😊 🙃 ☺️ 😍 😘 😜 😝 🤑 😎 🤗 😏 😐 😡 😮 😱 😨 😰 😵 🤕 😈 👿'.split(' '),
  },
  {
    category: 'Animals',
    items: '🐶 🐱 🐭 🐹 🐰 🐻 🐼 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐙 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥'.split(' '),
  },
  {
    category: 'Food',
    items: '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🍅 🍆 🌶 🍞 🧀 🍗 🍔 🌭 🍕 🌮 🍜 🍪 🍷'.split(' '),
  },
];

const EMOJI_SIZE = 40;
const EmojiItem = ({ item, onPress } : { item: string, onPress: () => void }) => (
  <TouchableOpacity style={{ flex: 0, height: EMOJI_SIZE, width: EMOJI_SIZE }} onPress={onPress}>
    <View style={{ flex: 0, height: EMOJI_SIZE, width: EMOJI_SIZE }}>
      <Text style={{ flex: 0, fontSize: EMOJI_SIZE / 4 * 3, paddingBottom: 2 }}>
        {item}
      </Text>
    </View>
  </TouchableOpacity>
);

const EmojiCategory = ({ name, items, onPick } : { name: string, items: Array<string>, onPick: (emoji: string) => void }) => (
  <View style={styles.category}>
    <Text style={styles.categoryName}>{name}</Text>
    <View style={styles.categoryItems}>
      {items.map((em, idx) => (
        <EmojiItem key={idx} onPress={() => onPick(em)} item={em} />
      ))}
    </View>
  </View>
);

const EmojiPicker = ({ onPick } : { onPick: (emoji: string) => void }) => (
  <View style={styles.picker}>
    <ScrollView horizontal={true}>
      {emoji.map((category, idx) => (
        <EmojiCategory key={idx} name={category.category} items={category.items} onPick={onPick} />
      ))}
    </ScrollView>
  </View>
);

const styles = {
  picker: {
    flex: 0,
    height: 240,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  category: {
    flex: 0,
    paddingHorizontal: 14,
    paddingTop: 2,
  },
  categoryName: {
    paddingVertical: 8,
    paddingHorizontal: 4,
    fontSize: 12,
    color: "#888",
  },
  categoryItems: {
    flex: 1,
    flexWrap: 'wrap',
  },
};

export default EmojiPicker;
