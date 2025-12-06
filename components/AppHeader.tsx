import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { palette } from "../theme";

type Props = {
  title: string;
  subtitle: string;
};

const AppHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.eyebrow}>Local-first wellness</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.accentBar} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
    gap: 6,
    alignItems: "center",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: palette.accent,
    fontWeight: "700",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: palette.textPrimary,
    textAlign: "center",
    letterSpacing: 0.6,
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 14,
  },
  accentBar: {
    width: 272,
    height: 4,
    borderRadius: 999,
    backgroundColor: palette.accent,
    shadowColor: palette.accent,
    shadowOpacity: 0.6,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
  },
  subtitle: {
    fontSize: 14,
    color: palette.textFaint,
    textAlign: "center",
    letterSpacing: 0.2,
  },
});

export default AppHeader;
