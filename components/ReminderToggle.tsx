import React from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { palette } from "../theme";

type Props = {
  enabled: boolean;
  onToggle: () => void;
  description?: string;
  loading?: boolean;
  error?: string;
};

const ReminderToggle: React.FC<Props> = ({
  enabled,
  onToggle,
  description,
  loading,
  error,
}) => {
  return (
    <Pressable style={styles.row} onPress={onToggle} disabled={loading}>
      <View style={styles.textGroup}>
        <Text style={styles.title}>Daily reminder</Text>
        <Text style={styles.subtitle}>{description}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        thumbColor={enabled ? palette.backgroundAlt : "#f4f4f5"}
        trackColor={{ false: palette.cardBorder, true: palette.accent }}
        disabled={loading}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
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

export default ReminderToggle;
