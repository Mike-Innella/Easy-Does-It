import React, { useMemo, useState } from "react";
import {
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import AppHeader from "./components/AppHeader";
import DateInputCard from "./components/DateInputCard";
import FooterNote from "./components/FooterNote";
import ReminderToggle from "./components/ReminderToggle";
import StatsSection from "./components/StatsSection";
import { useDailyReminder } from "./hooks/useDailyReminder";
import { useSoberDate } from "./hooks/useSoberDate";
import { palette } from "./theme";

const App: React.FC = () => {
  const glowOneAnim = React.useRef(new Animated.Value(0)).current;
  const glowTwoAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loopGlow = (
      value: Animated.Value,
      duration: number,
      delay: number = 0
    ) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();

    loopGlow(glowOneAnim, 14000);
    loopGlow(glowTwoAnim, 16000, 800);
  }, [glowOneAnim, glowTwoAnim]);

  const glowOneStyle = {
    transform: [
      {
        translateX: glowOneAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-70, 60],
        }),
      },
      {
        translateY: glowOneAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, -40],
        }),
      },
      {
        scale: glowOneAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.1],
        }),
      },
    ],
    opacity: glowOneAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.22],
    }),
  };

  const glowTwoStyle = {
    transform: [
      {
        translateX: glowTwoAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [60, -60],
        }),
      },
      {
        translateY: glowTwoAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 50],
        }),
      },
      {
        scale: glowTwoAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1.12],
        }),
      },
    ],
    opacity: glowTwoAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.12, 0.2],
    }),
  };

  const {
    selectedDate,
    setSelectedDate,
    savedSoberDate,
    daysSober,
    error,
    saveSoberDate,
    clearSoberDate,
  } = useSoberDate();

  const {
    reminderEnabled,
    reminderError,
    reminderLoading,
    enableReminder,
    disableReminder,
    nextReminderTime,
  } = useDailyReminder();
  const [guardError, setGuardError] = useState("");

  const handleReminderToggle = async () => {
    if (!savedSoberDate) {
      setGuardError("Save a sober date first.");
      return;
    }
    setGuardError("");

    if (reminderEnabled) {
      await disableReminder();
      return;
    }

    const msg =
      daysSober !== null
        ? `Day ${daysSober + 1}: Keep going—you've got this.`
        : "Keep going—open Sober Day Counter to see your streak.";
    await enableReminder(msg);
  };

  const reminderDescription = useMemo(() => {
    const timeLabel = nextReminderTime.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
    });
    return `Daily nudge at ${timeLabel}.`;
  }, [nextReminderTime]);

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={[palette.background, "#0e1b36", palette.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.glowOne, glowOneStyle]} />
      <Animated.View style={[styles.glowTwo, glowTwoStyle]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <AppHeader
            title="One Day at a Time"
            subtitle="Private, local, and focused on your streak."
          />

          <DateInputCard
            value={selectedDate}
            onChange={setSelectedDate}
            onSave={saveSoberDate}
            error={error}
          />

          <StatsSection
            savedDate={savedSoberDate}
            daysSober={daysSober}
            onReset={clearSoberDate}
          />

          <ReminderToggle
            enabled={reminderEnabled}
            onToggle={handleReminderToggle}
            description={reminderDescription}
            loading={reminderLoading}
            error={guardError || reminderError}
          />

          <FooterNote />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.background,
  },
  safeArea: {
    flex: 1,
    zIndex: 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "stretch",
    gap: 16,
    maxWidth: 820,
    width: "100%",
    alignSelf: "center",
    zIndex: 2,
  },
  glowOne: {
    position: "absolute",
    top: -220,
    left: -140,
    width: 320,
    height: 320,
    backgroundColor: palette.accent,
    opacity: 0.1,
    borderRadius: 220,
    shadowColor: palette.accent,
    shadowOpacity: 0.5,
    shadowRadius: 90,
    shadowOffset: { width: 0, height: 0 },
    zIndex: 0,
  },
  glowTwo: {
    position: "absolute",
    bottom: -240,
    right: -140,
    width: 340,
    height: 340,
    backgroundColor: palette.accentDeep,
    opacity: 0.12,
    borderRadius: 260,
    shadowColor: palette.accentDeep,
    shadowOpacity: 0.6,
    shadowRadius: 110,
    shadowOffset: { width: 0, height: 0 },
    zIndex: 0,
  },
});

export default App;
