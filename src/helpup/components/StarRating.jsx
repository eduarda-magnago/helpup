// components/StarRating.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StarRating({ rating = 0, size = 18, color = "#FFD700" }) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Ionicons
                key={i}
                name={i <= rating ? "star" : "star-outline"}
                size={size}
                color={i <= rating ? "#FFD700" : "#C3C3C3"}
                style={{ marginRight: 2 }}
            />
        );
    }

    return <View style={styles.container}>{stars}</View>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
});
