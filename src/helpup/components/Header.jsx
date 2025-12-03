import React from 'react';
import {View, Image, StyleSheet,Text, TouchableOpacity, Button, Platform, Pressable} from 'react-native';
import {useRouter} from "expo-router";
import {useProfile} from "../db/profiles";

const Header = () => {
    const profile = useProfile();
    const router = useRouter();

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.titulo}>Bem-vindo(a), {profile?.role === "org" ? profile?.org_name: profile?.name}</Text>
            <Text style={styles.subtitulo}>
                Um pequeno gesto, um grande impacto. Pronto para fazer a diferença hoje?
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        padding: 20,
    },
    titulo: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 30,
        color: "#000",
    },
    subtitulo: {
        fontFamily: "Poppins_500Medium",
        fontSize: 15,
        color: "#979CA5",
    }
});

export default Header;
