import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

import { cleanTimeCardStyles as styles } from "../ui/cleanTimeCardStyles";

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

export default CleanTimeCard;
