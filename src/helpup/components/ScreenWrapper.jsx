// components/ScreenWrapper.tsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import {useNavigationState} from "@react-navigation/native";

const ScreenWrapper = ({ children, style }) => {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const canGoBack = useNavigationState(
        (state) => state.index > 0
    );
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            {/* Top area under the camera hole */}
            <View
                style={{
                    paddingTop: insets.top,
                    paddingHorizontal: 15,
                    paddingBottom: canGoBack ? 10 : 0,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {canGoBack && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            padding: 6,
                            borderRadius: 20,
                            backgroundColor: "rgba(255,255,255,0.9)",
                        }}
                    >
                        <Ionicons name="chevron-back" size={26} color="#333" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Actual screen content */}
            <View style={{ flex: 1, ...style }}>
                {children}
            </View>
        </View>
    );
};

export default ScreenWrapper;
