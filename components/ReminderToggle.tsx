import React from "react";
import { Pressable, Switch, Text, View } from "react-native";

import { palette } from "../ui/theme";
import { reminderToggleStyles as styles } from "../ui/reminderToggleStyles";

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

export default ReminderToggle;
