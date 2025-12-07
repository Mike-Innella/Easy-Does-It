import { StyleSheet } from "react-native";

import { palette } from "./theme";

export const profileCardStyles = StyleSheet.create({
  profileCard: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: palette.backgroundAlt,
    borderWidth: 1,
    borderColor: palette.cardBorder,
    gap: 10,
  },
  profileTitle: {
    color: palette.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    backgroundColor: palette.background,
    borderColor: palette.cardBorder,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: palette.textPrimary,
  },
  primaryButton: {
    backgroundColor: palette.accent,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: palette.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  errorText: {
    color: palette.error,
    fontSize: 13,
  },
});
