import React from "react";
import { View } from "react-native";
import { Value } from "react-native-reanimated";

import { cards } from "../components";

import SortableCard, { CARD_HEIGHT } from "./SortableCard";

const DragToSort = () => {
  const offsets = cards.map((_, i) => new Value(i * CARD_HEIGHT));
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {cards.map((card, index) => (
        <SortableCard key={card.id} {...{ offsets, card, index }} />
      ))}
    </View>
  );
};

export default DragToSort;
