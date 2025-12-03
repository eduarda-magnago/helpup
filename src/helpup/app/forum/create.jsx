import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ScrollView,
    Alert, StyleSheet,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../db/firebase";
import { useRouter } from "expo-router";
import {supabase} from "../../db/supabase";
import Footer from "../../components/Footer";
import ScreenWrapper from "../../components/ScreenWrapper";
import {theme} from "../../constants/theme";

export default function CreateForum() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateForum = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            Alert.alert("Erro", "Você precisa estar logado para criar um fórum.");
            return;
        }

        if (!name.trim()) {
            Alert.alert("Erro", "Insira um nome para o fórum.");
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "forums"), {
                name,
                description,
                image: imageUrl || null,
                createdBy: user.id,         // ✅ Supabase user id
                creatorEmail: user.email,   // optional
                createdAt: new Date(),
            });

            Alert.alert("Sucesso", "Fórum criado com sucesso!");
            router.push("/forum");
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Falha ao criar o fórum.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenWrapper style={{ flexDirection:"column", justifyContent: "space-between", backgroundColor: theme.colors.background }}>
            <View style={{ paddingHorizontal: 20, gap: 10}}>
                <Text style={{ fontSize: 26, fontWeight: "bold", marginVertical: 20 }}>
                    Criar Fórum
                </Text>
                <Text style={styles.subtitulo}>Crie um Fórum para que os outros usuários possam interagir junto com você.</Text>
                <Text style={styles.rotulo}>Nome do Fórum</Text>
                <TextInput
                    placeholder="Nome do Fórum"
                    value={name}
                    onChangeText={setName}
                    style={{
                        backgroundColor: theme.colors.inputBackground,
                        borderRadius: 15,
                        padding: 10,
                        paddingHorizontal: 10,
                        marginBottom: 10,
                    }}
                />
                <Text style={styles.rotulo}>Descrição</Text>
                <TextInput
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    style={{
                        borderRadius: 15,
                        backgroundColor: theme.colors.inputBackground,
                        padding: 10,
                        marginBottom: 10,
                        height: 100,
                    }}
                />
                <Text style={styles.rotulo}>URL da Capa (Opcional)</Text>
                <TextInput
                    placeholder="Insira a URL da imagem"
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    autoCapitalize="none"
                    keyboardType="url"
                    style={{
                        backgroundColor: theme.colors.inputBackground,
                        borderRadius: 15,
                        padding: 10,
                        paddingHorizontal: 10,
                        marginBottom: 10,
                    }}
                />

                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: 8,
                            marginBottom: 20,
                        }}
                    />
                ) : null}

                <TouchableOpacity
                    onPress={handleCreateForum}
                    disabled={loading}
                    style={{
                        backgroundColor: theme.colors.buttonBackground,
                        padding: 15,
                        borderRadius: 8,
                        alignItems: "center",
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={{ fontWeight: "bold" }}>Criar</Text>
                    )}
                </TouchableOpacity>
            </View>

            <Footer />
        </ScreenWrapper>
    );
}


const styles = StyleSheet.create({
    titulo: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 30,
        color: "#000",
    },
    subtitulo: {
        fontFamily: "Poppins_500Medium",
        fontSize: 15,
        color: "#979CA5",
        marginBottom: 20,
    },
    rotulo: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "#000",
        marginBottom: 6,
    },

})

