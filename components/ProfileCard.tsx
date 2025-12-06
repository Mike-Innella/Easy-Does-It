import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { palette } from "../ui/theme";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error: string;
  onSave: () => void;
};

const ProfileCard: React.FC<Props> = ({ value, onChange, error, onSave }) => {
  // Simple form for collecting the user's first name
  return (
    <View style={styles.profileCard}>
      <Text style={styles.profileTitle}>Set up your profile</Text>
      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor={palette.textFaint}
        value={value}
        onChangeText={onChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.primaryButton} onPress={onSave}>
        <Text style={styles.primaryButtonText}>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileCard;
