import { StyleSheet } from "react-native";

import { palette } from "./theme";

export const glassCardStyles = StyleSheet.create({
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
