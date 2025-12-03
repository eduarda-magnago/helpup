import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "../../../db/firebase";
import { supabase } from "../../../db/supabase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ScreenWrapper from "../../../components/ScreenWrapper";
import {theme} from "../../../constants/theme";

export default function EditForum() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [forum, setForum] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        (async () => {
            // Get current Supabase user
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                Alert.alert("Erro", "Você precisa estar logado para editar um fórum.");
                router.push("/forum");
                return;
            }
            setCurrentUser(user);

            // Get forum data
            const forumRef = doc(db, "forums", id);
            const snap = await getDoc(forumRef);
            if (snap.exists()) {
                const data = snap.data();
                if (data.createdBy !== user.id) {
                    Alert.alert("Erro", "Você não tem permissão para editar este fórum.");
                    router.back();
                    return;
                }

                setForum({ id: snap.id, ...data });
                setTitle(data.name);
                setDescription(data.description);
                setImage(data.image || "");
            } else {
                Alert.alert("Erro", "Fórum não encontrado.");
                router.back();
            }
        })();
    }, [id]);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert("Erro", "O título não pode estar vazio.");
            return;
        }

        try {
            setLoading(true);
            const ref = doc(db, "forums", id);
            await updateDoc(ref, {
                name: title,
                description,
                image,
                updatedAt: new Date(),
            });
            Alert.alert("Sucesso", "Fórum atualizado!");
            router.push(`/forum/${id}`);
        } catch (err) {
            console.error(err);
            Alert.alert("Erro", "Não foi possível atualizar o fórum.");
        } finally {
            setLoading(false);
        }
    };

    if (!forum) return <Text>Carregando...</Text>;

    return (
        <ScreenWrapper style={{ flexDirection:"column", backgroundColor: theme.colors.background }}>
            <View style={{ paddingHorizontal: 20}}>

            <Text style={{ fontSize: 26, fontWeight: "bold", marginVertical: 20 }}>
                Edit Fórum
            </Text>

            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Título do Fórum"
                style={{
                    backgroundColor: theme.colors.inputBackground,
                    borderRadius: 15,
                    padding: 10,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                }}
            />

            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Descrição"
                multiline
                style={{
                    borderRadius: 15,
                    backgroundColor: theme.colors.inputBackground,
                    padding: 10,
                    marginBottom: 10,
                    height: 100,
                }}
            />

            <TextInput
                value={image}
                onChangeText={setImage}
                placeholder="URL da imagem (opcional)"
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

            {image ? (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: "100%",
                        height: 200,
                        borderRadius: 8,
                        marginBottom: 20,
                    }}
                />
            ) : null}

            <TouchableOpacity
                onPress={handleSave}
                disabled={loading}
                style={{
                    backgroundColor: "#f2c94c",
                    padding: 15,
                    borderRadius: 8,
                    alignItems: "center",
                    opacity: loading ? 0.7 : 1,
                }}
            >
                {loading ? (
                    <ActivityIndicator color="#000" />
                ) : (
                    <Text style={{ fontWeight: "bold" }}>💾 Salvar Alterações</Text>
                )}
            </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
}
