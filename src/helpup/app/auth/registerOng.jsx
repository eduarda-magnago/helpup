import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
} from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useFonts, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { ZenKakuGothicAntique_400Regular } from "@expo-google-fonts/zen-kaku-gothic-antique";
import { Feather } from "@expo/vector-icons";
import {signUpWithProfile} from "../../hooks/helpers";

export default function RegisterOngScreen() {
    const role = "org";
    const router = useRouter();
    const [orgName, setOrgName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [audience, setAudience] = useState("");
    const [about, setAbout] = useState("");

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        ZenKakuGothicAntique_400Regular,
    });

    if (!fontsLoaded) return null;

    const handleSignup = async () => {
        try {
            await signUpWithProfile({
                email,
                password,
                role,
                city,
                about,
                orgName,
                audience,
            });
            alert('Conta criada com sucesso, obrigada!');
            router.replace('/auth/login');
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scroll} style={{ backgroundColor: "#FBFAF4" }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Cadastrar Perfil ONG</Text>
                    <Text style={styles.subtitle}>
                        Com a <Text style={{ fontWeight: "600" }}>HelpUP</Text>, você consegue criar vagas de
                        voluntariado para a sua organização, divulgando seu trabalho em uma plataforma segura!
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome da Organização</Text>
                        <TextInput
                            placeholder="Digite o nome da ONG"
                            placeholderTextColor="#979CA5"
                            value={orgName}
                            onChangeText={setOrgName}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            placeholder="exemplo@gmail.com"
                            placeholderTextColor="#979CA5"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Senha</Text>
                        <TextInput
                            placeholder="********"
                            placeholderTextColor="#979CA5"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Cidade / Estado</Text>
                        <TextInput
                            placeholder="Ex: Rio de Janeiro - RJ"
                            placeholderTextColor="#979CA5"
                            value={city}
                            onChangeText={setCity}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Público destinado</Text>
                        <TextInput
                            placeholder="Ex: Crianças, Geral, Idosos..."
                            placeholderTextColor="#979CA5"
                            value={audience}
                            onChangeText={setAudience}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Conte um pouco sobre o seu Projeto</Text>
                        <TextInput
                            placeholder="Descreva brevemente sua iniciativa e propósito"
                            placeholderTextColor="#979CA5"
                            value={about}
                            onChangeText={setAbout}
                            multiline
                            style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                        />
                    </View>

                    <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
                        <Text style={styles.loginText}>Criar ONG</Text>
                        <Feather name="arrow-right" size={22} color="#000" />
                    </TouchableOpacity>

                    <Image
                        source={require("../../assets/images/praia.png")}
                        style={styles.image}
                    />
                </View>
            </ScrollView>
        </ScreenWrapper>

    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#FBFAF4",
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 40,
    },
    title: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 28,
        color: "#000000",
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: "#979CA5",
        marginBottom: 28,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "#000000",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#F6F2DD",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: "ZenKakuGothicAntique_400Regular",
    },
    loginButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F1E6AC",
        borderRadius: 10,
        paddingHorizontal: 20,
        height: 59,
        marginTop: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    loginText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
        color: "#000",
    },
    image: {
        width: "100%",
        height: 260,
        borderRadius: 15,
        marginTop: 40,
        alignSelf: "center",
        resizeMode: "cover",
    },
});
