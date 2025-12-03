import { theme } from "@/constants/theme";
import { PlanType } from "@/db/types";
import { memo } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type PremiumBadgeProps = {
  plan?: PlanType | null;
  type: "user" | "ong";
  size?: "small" | "large";
  style?: StyleProp<ViewStyle>;
};

function PremiumBadge({
  plan,
  type,
  size = "small",
  style,
}: PremiumBadgeProps) {
  if (plan !== "premium") return null;

  const label = "PREMIUM";

  return (
    <View style={[styles.badge, size === "large" && styles.badgeLarge, style]}>
      <Text
        style={[styles.badgeText, size === "large" && styles.badgeTextLarge]}
      >
        {label}
      </Text>
    </View>
  );
}

export default memo(PremiumBadge);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#F6EFD8",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  badgeLarge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  badgeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: theme.colors.darkGrey,
  },
  badgeTextLarge: {
    fontSize: 14,
  },
});
