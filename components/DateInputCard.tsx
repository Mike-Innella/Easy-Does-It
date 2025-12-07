import React, { useMemo, useState, useEffect } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { formatDisplayDate } from "../utils/date";
import { dateInputCardStyles as styles } from "../ui/dateInputCardStyles";
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
  // Toggle native date picker and format the chosen date for display
  const [showPicker, setShowPicker] = useState(false);

  // Web helper so desktop doesn't block flow when the picker UI is janky
  useEffect(() => {
    if (Platform.OS === "web" && !value) {
      onChange(new Date());
    }
  }, [value, onChange]);

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

export default DateInputCard;
