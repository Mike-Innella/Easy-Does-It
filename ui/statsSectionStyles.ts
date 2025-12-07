import { StyleSheet } from "react-native";

import { palette } from "./theme";

export const statsSectionStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  badge: {
    backgroundColor: palette.cardHighlight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.cardBorder,
  },
  badgeText: {
    color: palette.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  infoHighlight: {
    color: palette.textPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
  daysText: {
    fontSize: 32,
    fontWeight: "800",
    color: palette.accentDeep,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  caption: {
    fontSize: 13,
    color: palette.textFaint,
    textAlign: "center",
    marginBottom: 14,
  },
  secondaryButton: {
    marginTop: 4,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.actionBorder,
    alignItems: "center",
    backgroundColor: palette.backgroundAlt,
  },
  secondaryButtonText: {
    color: palette.textPrimary,
    fontSize: 14,
    fontWeight: "600",
  },
});
