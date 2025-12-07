import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";

import { palette } from "../ui/theme";
import { profileCardStyles as styles } from "../ui/profileCardStyles";

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

export default ProfileCard;
