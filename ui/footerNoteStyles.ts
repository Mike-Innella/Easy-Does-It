import { StyleSheet } from "react-native";

import { palette } from "./theme";

export const footerNoteStyles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    paddingHorizontal: 8,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: palette.textMuted,
    textAlign: "center",
    letterSpacing: 0.1,
  },
});
