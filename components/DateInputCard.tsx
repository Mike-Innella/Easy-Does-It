import React, { useMemo, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { palette } from "../theme";
import { formatDisplayDate } from "../utils/date";
import GlassCard from "./GlassCard";

type Props = {
  value: Date | null;
  onChange: (date: Date) => void;
  onSave: () => void;
  onReset?: () => void;
  showReset?: boolean;
  error?: string;
};

const DateInputCard: React.FC<Props> = ({
  value,
  onChange,
  onSave,
  onReset,
  showReset,
  error,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const label = useMemo(() => {
    if (!value) return "Choose your sober date";
    return formatDisplayDate(value);
  }, [value]);

  const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) {
      onChange(date);
    }
    if (Platform.OS !== "ios") {
      setShowPicker(false);
    }
  };

  return (
    <GlassCard>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Your sober date</Text>
        <View style={styles.badge}>
          <Text style={styles.hint}>Tap to pick a date</Text>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.pickerButton,
          pressed && styles.pickerButtonPressed,
          !value && styles.pickerButtonEmpty,
        ]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.pickerValue}>{label}</Text>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {showPicker ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleChange}
          maximumDate={new Date()}
        />
      ) : null}

      <Pressable style={styles.primaryButton} onPress={onSave}>
        <Text style={styles.primaryButtonText}>Save Date</Text>
      </Pressable>

      {showReset && onReset ? (
        <Pressable style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetButtonText}>Reset date</Text>
        </Pressable>
      ) : null}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
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

export default DateInputCard;
