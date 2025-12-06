import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

import { palette } from "../theme";

type Props = PropsWithChildren<{
  padding?: number;
}>;

const GlassCard: React.FC<Props> = ({ children, padding = 20 }) => {
  return <View style={[styles.card, { padding }]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.cardBorder,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
});

export default GlassCard;
