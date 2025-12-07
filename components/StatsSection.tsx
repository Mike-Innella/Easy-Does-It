import React from "react";
import { Pressable, Text, View } from "react-native";

import { statsSectionStyles as styles } from "../ui/statsSectionStyles";
import { formatDisplayDate } from "../utils/date";
import GlassCard from "./GlassCard";

type Props = {
  savedDate: Date | null;
  daysSober: number | null;
  onReset: () => void;
};

const StatsSection: React.FC<Props> = ({ savedDate, daysSober, onReset }) => {
  if (!savedDate) return null;

  return (
    <GlassCard>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Current streak</Text>
        </View>
        <Text style={styles.infoHighlight}>{formatDisplayDate(savedDate)}</Text>
      </View>

      <Text style={styles.daysText}>
        {daysSober ?? 0} day{daysSober === 1 ? "" : "s"} sober
      </Text>
      <Text style={styles.caption}>Kept locally — no cloud sharing.</Text>

      <Pressable style={styles.secondaryButton} onPress={onReset}>
        <Text style={styles.secondaryButtonText}>Reset date</Text>
      </Pressable>
    </GlassCard>
  );
};

export default StatsSection;
