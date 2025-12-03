import React from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import Fundo1 from "../assets/images/fundo1.png";
const PictureCard = ({ link,title,subtitle }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardWrapper}
            onPress={() => router.push(link)}
        >
            <ImageBackground
                source={Fundo1}
                style={styles.cardConta}
                imageStyle={{ borderRadius: 20 }}
            >
                <Text style={styles.cardTitulo}>{title}</Text>
                <Text style={styles.cardTexto}>{subtitle}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        alignSelf: "center",
        marginBottom: 20,
    },
    cardConta: {
        width: 382,
        height: 255,
        borderRadius: 20,
        padding: 20,
        justifyContent: "flex-end",
    },
    cardTitulo: {
        fontFamily: "Jost_700Bold",
        fontSize: 24,
        color: "#000",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    cardTexto: {
        fontFamily: "Poppins_500Medium",
        fontSize: 15,
        color: "#000",
        marginTop: 10,
    }
})

export default PictureCard;
