// app/_layout.tsx
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { Jost_700Bold } from "@expo-google-fonts/jost";
import { Sarpanch_600SemiBold } from "@expo-google-fonts/sarpanch";
import { Manrope_700Bold } from "@expo-google-fonts/manrope";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    Sarpanch_600SemiBold,
    Manrope_700Bold,
    Jost_700Bold,
  });

  if (!fontsLoaded) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  // Just render the stack, no header
  return (
      <Stack
          screenOptions={{
            headerShown: false,
          }}
      />
  );
}
