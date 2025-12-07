import { StyleSheet } from "react-native";

export const cleanTimeCardStyles = StyleSheet.create({
  cleanTimeCard: {
    marginTop: 16,
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderWidth: 4,
    borderColor: "#74be979f",
    borderRadius: 12,
    backgroundColor: "#e9f6efff",
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
    width: "100%",
  },
});
