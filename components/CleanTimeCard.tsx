import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

import { palette } from "../ui/theme";

type Props = {
  cleanTimeLabel: string;
  milestoneLabel: string;
  affirmation: string;
};

const CleanTimeCard: React.FC<Props> = ({
  cleanTimeLabel,
  milestoneLabel,
  affirmation,
}) => {
  // Brief pulse animation when the clean time label changes
  const cleanTimeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!cleanTimeLabel) return;

    cleanTimeAnim.setValue(0);

    Animated.timing(cleanTimeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [cleanTimeAnim, cleanTimeLabel]);

  const cleanTimeScale = cleanTimeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  const cleanTimeOpacity = cleanTimeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });

  return (
    <View style={styles.cleanTimeCard}>
      <Animated.Text
        style={[
          styles.cleanTimeText,
          {
            transform: [{ scale: cleanTimeScale }],
            opacity: cleanTimeOpacity,
          },
        ]}
      >
        {cleanTimeLabel}
      </Animated.Text>
      {!!milestoneLabel && <Text style={styles.milestoneText}>{milestoneLabel}</Text>}
      <Text style={styles.affirmationText}>{affirmation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cleanTimeCard: {
    marginTop: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#E9F6EF",
    alignItems: "center",
    minHeight: 140,
  },
  cleanTimeText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2F8F5B",
  },
  milestoneText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "600",
    color: "#2F8F5B",
  },
  affirmationText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4F5E57",
    textAlign: "center",
    lineHeight: 20,
    fontStyle: "italic",
  },
});

export default CleanTimeCard;
