import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { palette } from "../ui/theme";

const FooterNote: React.FC = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.footerText}>
        Data stays on this device using{" "}
        {Platform.OS === "web" ? "local storage" : "native secure storage"}.
      </Text>
      <Text style={styles.footerText}>
        Notifications run locally and can be turned off anytime.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 24,
    paddingHorizontal: 8,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: palette.textMuted,
    textAlign: "center",
    letterSpacing: 0.1,
  },
});

export default FooterNote;
