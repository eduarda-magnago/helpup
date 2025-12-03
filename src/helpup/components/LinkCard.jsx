import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import Arrow from "../assets/images/arrow.svg";
import Svg, {Path} from "react-native-svg";
import {theme} from "../constants/theme";

const LinkCard = ({ link,title,subtitle }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(link)}
            activeOpacity={0.8}
            style={styles.cardCandidaturas}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text style={styles.candidaturasTitulo}>
                    {title}
                </Text>
                <View style={styles.botaoArrow}>
                    <Svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M0.75 21.0475L11.6033 10.8987L0.75 0.75" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </Svg>
                </View>
            </View>
            <Text style={styles.candidaturasTexto}>
                {subtitle}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardCandidaturas: {
        width: 382,
        height: 255,
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        alignSelf: "center",
        padding: 20,
        marginBottom: 30,
        justifyContent: "center",
    },
    candidaturasTitulo: {
        fontFamily: "Sarpanch_600SemiBold",
        fontSize: 25,
        color: "#000",
        maxWidth: "75%"
    },
    candidaturasTexto: {
        fontFamily: "Manrope_700Bold",
        fontSize: 16,
        color: "#979CA5",
        marginTop: 20,
    },
    botaoArrow: {
        width: 64,
        height: 64,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    arrowText: {
        fontSize: 22,
        // fontWeight: "bold",
    },
})

export default LinkCard;
