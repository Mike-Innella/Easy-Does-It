import React, { PropsWithChildren } from "react";
import { View } from "react-native";

import { glassCardStyles as styles } from "../ui/glassCardStyles";

type Props = PropsWithChildren<{
  padding?: number;
}>;

const GlassCard: React.FC<Props> = ({ children, padding = 20 }) => {
  return <View style={[styles.card, { padding }]}>{children}</View>;
};

export default GlassCard;
