import { StyleSheet } from "react-native";

import { palette } from "./theme";

export const reminderToggleStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.cardBorder,
    backgroundColor: palette.card,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
  },
  textGroup: {
    flex: 1,
    gap: 2,
  },
  title: {
    color: palette.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  subtitle: {
    color: palette.textMuted,
    fontSize: 13,
  },
  error: {
    color: palette.error,
    fontSize: 12,
    marginTop: 6,
  },
});
