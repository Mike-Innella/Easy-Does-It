import React from "react";
import { Text, View } from "react-native";

import { appHeaderStyles as styles } from "../ui/appHeaderStyles";

type Props = {
  title: string;
  subtitle: string;
};

const AppHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.eyebrow}>Local-first wellness</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.accentBar} />
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default AppHeader;
