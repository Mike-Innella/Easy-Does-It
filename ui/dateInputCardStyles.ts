import { StyleSheet } from "react-native";

import { palette } from "./theme";

export const dateInputCardStyles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    color: palette.textPrimary,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: palette.cardHighlight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  hint: {
    fontSize: 11,
    color: palette.textMuted,
    letterSpacing: 0.2,
    fontWeight: "700",
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: palette.cardBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: palette.cardHighlight,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  pickerButtonPressed: {
    backgroundColor: palette.cardBorder,
  },
  pickerButtonEmpty: {
    borderColor: palette.actionBorder,
  },
  pickerValue: {
    color: palette.textPrimary,
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
  errorText: {
    color: palette.error,
    fontSize: 13,
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: palette.accent,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 6,
    shadowColor: palette.accent,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
    borderColor: palette.accentSecondary,
  },
  primaryButtonText: {
    color: palette.accentText,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  resetButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 10,
  },
  resetButtonText: {
    color: palette.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
});
