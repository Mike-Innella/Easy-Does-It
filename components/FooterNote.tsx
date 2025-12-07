import React from "react";
import { Platform, Text, View } from "react-native";

import { footerNoteStyles as styles } from "../ui/footerNoteStyles";

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

export default FooterNote;
