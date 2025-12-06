import React, { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import AppHeader from "./components/AppHeader";
import DateInputCard from "./components/DateInputCard";
import FooterNote from "./components/FooterNote";
import ReminderToggle from "./components/ReminderToggle";
import { useDailyReminder } from "./hooks/useDailyReminder";
import { useSoberDate } from "./hooks/useSoberDate";
import { palette } from "./theme";

const PROFILE_STORAGE_KEY = "easydoesit_profile";

const RECOVERY_LINES = [
  "Just for today is enough.",
  "You don’t have to solve tomorrow.",
  "Stay where your feet are.",
  "Progress still counts, even when it’s quiet.",
  "Today doesn’t need to be perfect.",
  "Go gently.",
  "This still counts.",
  "Showing up is the work.",
  "Small steps are real steps.",
  "You are allowed to take this one day at a time.",
  "Nothing has to be decided today.",
  "You’re doing the best you can with today.",
  "It’s okay to move slowly.",
  "This moment is survivable.",
  "You don’t have to do this alone.",
  "Rest is part of the work.",
  "Keep what helps. Let the rest go.",
  "You can stop for a breath.",
  "Change adds up.",
  "Time lived differently matters.",
  "This is becoming part of who you are.",
  "You’ve already chosen differently today.",
  "Consistency doesn’t have to be loud.",
  "Steady is strong.",
  "Cravings pass. You stay.",
  "Feelings aren’t commands.",
  "You don’t need to escape this moment.",
  "This wave will break.",
  "Make it to the next ten minutes.",
];

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getSoberStats = (dateValue: Date | null) => {
  if (!dateValue) return { totalDays: null, formattedLabel: "" };
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return { totalDays: null, formattedLabel: "" };

  const today = new Date();
  const diff = Math.max(0, today.getTime() - parsed.getTime());
  const totalDays = Math.floor(diff / MS_PER_DAY);

  if (totalDays < 365) {
    return { totalDays, formattedLabel: `${totalDays} day${totalDays === 1 ? "" : "s"}` };
  }

  if (totalDays < 365 * 2) {
    const months = Math.floor(totalDays / 30);
    return { totalDays, formattedLabel: `${months} month${months === 1 ? "" : "s"}` };
  }

  const years = Math.floor(totalDays / 365);
  return { totalDays, formattedLabel: `${years} year${years === 1 ? "" : "s"}` };
};

const App: React.FC = () => {
  const glowOneAnim = React.useRef(new Animated.Value(0)).current;
  const glowTwoAnim = React.useRef(new Animated.Value(0)).current;
  const [firstName, setFirstName] = useState("");
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [profileError, setProfileError] = useState("");

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

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const stored = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const hasName =
            typeof parsed?.firstName === "string" && parsed.firstName.trim().length > 0;

          if (hasName) {
            setFirstName(parsed.firstName);
            setIsProfileModalVisible(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to load profile", e);
      }
      setIsProfileModalVisible(true);
    };

    loadProfile();
  }, []);

  const handleProfileSave = async () => {
    setProfileError("");
    const name = firstName.trim();

    if (!name) {
      setProfileError("Please enter your name.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({ firstName: name })
      );
      setFirstName(name);
      setIsProfileModalVisible(false);
    } catch (e) {
      console.warn("Failed to save profile", e);
      setProfileError("Could not save profile.");
    }
  };

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

  const { formattedLabel } = useMemo(
    () => getSoberStats(savedSoberDate),
    [savedSoberDate]
  );

  const dailyRecoveryLine = useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / MS_PER_DAY);
    return RECOVERY_LINES[daysSinceEpoch % RECOVERY_LINES.length];
  }, []);

  const headerLine = isProfileModalVisible
    ? "Welcome. Let's set your name to start."
    : firstName && formattedLabel
    ? `${firstName}, you have ${formattedLabel} clean time.`
    : firstName
    ? `${firstName}, set your sober date to start tracking.`
    : "Welcome. Let's set your name to start.";

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

          <View style={styles.headerCopy}>
            <Text style={styles.primaryLine}>{headerLine}</Text>
            <Text style={styles.recoveryLine}>{dailyRecoveryLine}</Text>
          </View>

          {isProfileModalVisible ? (
            <View style={styles.profileCard}>
              <Text style={styles.profileTitle}>Set up your profile</Text>
              <TextInput
                style={styles.input}
                placeholder="First name"
                placeholderTextColor={palette.textFaint}
                value={firstName}
                onChangeText={setFirstName}
              />
              {profileError ? <Text style={styles.errorText}>{profileError}</Text> : null}
              <Pressable style={styles.primaryButton} onPress={handleProfileSave}>
                <Text style={styles.primaryButtonText}>Save</Text>
              </Pressable>
            </View>
          ) : null}

          <DateInputCard
            value={selectedDate}
            onChange={setSelectedDate}
            onSave={saveSoberDate}
            error={error}
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
  headerCopy: {
    alignItems: "center",
    gap: 6,
  },
  primaryLine: {
    color: palette.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  recoveryLine: {
    color: palette.textFaint,
    fontSize: 13,
    textAlign: "center",
  },
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
