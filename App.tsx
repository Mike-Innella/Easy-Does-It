import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

import AppHeader from "./components/AppHeader";
import DateInputCard from "./components/DateInputCard";
import CleanTimeCard from "./components/CleanTimeCard";
import FooterNote from "./components/FooterNote";
import ProfileCard from "./components/ProfileCard";
import ReminderToggle from "./components/ReminderToggle";
import { getNextMilestoneLabel } from "./lib/milestones";
import { formatCleanTimeLabel, getSoberStats } from "./lib/soberStats";
import { useAffirmation } from "./hooks/useAffirmation";
import { useDailyRecoveryLine } from "./hooks/useDailyRecoveryLine";
import { useDailyReminder } from "./hooks/useDailyReminder";
import { useSoberDate } from "./hooks/useSoberDate";
import { palette } from "./ui/theme";
import { appStyles as styles } from "./ui/appStyles";

const PROFILE_STORAGE_KEY = "easydoesit_profile";

const App: React.FC = () => {
  // Animated glow layers for background ambience
  const glowOneAnim = useRef(new Animated.Value(0)).current;
  const glowTwoAnim = useRef(new Animated.Value(0)).current;
  const glowThreeAnim = useRef(new Animated.Value(0)).current;
  const glowFourAnim = useRef(new Animated.Value(0)).current;
  const glowFiveAnim = useRef(new Animated.Value(0)).current;
  const [firstName, setFirstName] = useState("");
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [profileError, setProfileError] = useState("");

  React.useEffect(() => {
    // Loop a gentle in/out animation for each glow to keep the background moving
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
    loopGlow(glowThreeAnim, 12000, 400);
    loopGlow(glowFourAnim, 18000, 1000);
    loopGlow(glowFiveAnim, 20000, 1600);
  }, [glowFiveAnim, glowFourAnim, glowOneAnim, glowThreeAnim, glowTwoAnim]);

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

  const glowThreeStyle = {
    transform: [
      {
        translateX: glowThreeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-40, 30],
        }),
      },
      {
        translateY: glowThreeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [60, -20],
        }),
      },
      {
        scale: glowThreeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.92, 1.08],
        }),
      },
    ],
    opacity: glowThreeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.14, 0.24],
    }),
  };

  const glowFourStyle = {
    transform: [
      {
        translateX: glowFourAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [30, -25],
        }),
      },
      {
        translateY: glowFourAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, -30],
        }),
      },
      {
        scale: glowFourAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1.1],
        }),
      },
    ],
    opacity: glowFourAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.12, 0.2],
    }),
  };

  const glowFiveStyle = {
    transform: [
      {
        translateX: glowFiveAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 40],
        }),
      },
      {
        translateY: glowFiveAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [40, -10],
        }),
      },
      {
        scale: glowFiveAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.88, 1.12],
        }),
      },
    ],
    opacity: glowFiveAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.1, 0.18],
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

  useEffect(() => {
    // Pull the saved name from storage on startup to decide if we should show the profile card
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

  // Reopen the name modal when the user taps "Change name"
  const handleOpenProfile = () => {
    setProfileError("");
    setIsProfileModalVisible(true);
  };

  // Require a saved date before allowing reminders
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

  // Clean time stats from saved date
  const { totalDays: cleanTimeInDays, formattedLabel } = useMemo(
    () => getSoberStats(savedSoberDate),
    [savedSoberDate]
  );

  const cleanTimeLabel = formatCleanTimeLabel(formattedLabel);
  const dailyRecoveryLine = useDailyRecoveryLine();
  const milestoneLabel = useMemo(() => getNextMilestoneLabel(cleanTimeInDays), [cleanTimeInDays]);
  const affirmation = useAffirmation();

  const headerLine = isProfileModalVisible
    ? "Welcome. Let's set your name to start."
    : firstName && cleanTimeLabel
    ? `${firstName}, you have ${cleanTimeLabel}.`
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
      <Animated.View style={[styles.glowThree, glowThreeStyle]} />
      <Animated.View style={[styles.glowFour, glowFourStyle]} />
      <Animated.View style={[styles.glowFive, glowFiveStyle]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <AppHeader
            title="One Day at a Time"
            subtitle="Private, local, and focused on your streak."
          />

          <View style={styles.headerCopy}>
            <Text style={styles.primaryLine}>{headerLine}</Text>
            <Text style={styles.recoveryLine}>{dailyRecoveryLine}</Text>
            {!isProfileModalVisible ? (
              <Pressable onPress={handleOpenProfile} style={styles.secondaryLink}>
                <Text style={styles.secondaryLinkText}>Change name</Text>
              </Pressable>
            ) : null}
          </View>

          {/* First ask for name, then show date picker and streak */}
          {isProfileModalVisible ? (
            <ProfileCard
              value={firstName}
              onChange={setFirstName}
              error={profileError}
              onSave={handleProfileSave}
            />
          ) : null}

          {!isProfileModalVisible ? (
            <>
              <DateInputCard
                value={selectedDate}
                onChange={setSelectedDate}
                onSave={saveSoberDate}
                onReset={clearSoberDate}
                showReset={!!savedSoberDate}
                error={error}
              />

              {cleanTimeLabel ? (
                <CleanTimeCard
                  cleanTimeLabel={cleanTimeLabel}
                  milestoneLabel={milestoneLabel}
                  affirmation={affirmation}
                />
              ) : null}
            </>
          ) : null}

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

export default App;
