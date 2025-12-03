import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    FlatList,
    ImageBackground, ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {db} from "../../db/firebase";
import {addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp,} from "firebase/firestore";
import Footer from "../../components/Footer";
import ScreenWrapper from "../../components/ScreenWrapper";
import {useProfile} from "../../db/profiles";
import {theme} from "../../constants/theme";


export default function ForumPage() {
    const { id } = useLocalSearchParams();
    const [forum, setForum] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const profile = useProfile();
    const router = useRouter();

    const isOwner = forum?.createdBy === profile?.id;
    // Fetch forum details
    useEffect(() => {
        const fetchForum = async () => {
            const docRef = doc(db, "forums", id);
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                setForum({ id: snapshot.id, ...snapshot.data() });
            }
        };
        fetchForum();
    }, [id]);

    useEffect(() => {
        const q = query(
            collection(db, "forums", id, "messages"),
            orderBy("createdAt", "asc")
        );
        return onSnapshot(q, (querySnapshot) => {
            const msgs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setMessages(msgs);
        });
    }, [id]);

    // Send text message only
    const sendMessage = async () => {
        if (!newMsg.trim()) return;

        setLoading(true);
        try {
            await addDoc(collection(db, "forums", id, "messages"), {
                text: newMsg,
                author: profile?.role === "org" ? profile?.org_name : profile?.name,
                createdAt: serverTimestamp(),
            });
            setNewMsg("");
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!forum) return <Text>Carregando...</Text>;

    return (
        <ScreenWrapper style={{ flex: 1, justifyContent:"space-between", backgroundColor: theme.colors.background}}>
            <View style={{ paddingHorizontal: 20}}>
                <View style={{
                    marginTop: 30,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems:"center",
                    paddingHorizontal: 30
                }}>
                    <Text style={styles.titulo}>{forum.name}</Text>
                    {isOwner && (
                        <TouchableOpacity
                            onPress={() => router.push(`/forum/edit/${forum.id}`)}
                            style={{
                                backgroundColor: "#d1ecf1",
                                padding: 10,
                                borderRadius: 8,
                                // alignSelf: "flex-end",
                            }}
                        ><Text>Editar</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <Text style={styles.subtitulo}>{forum.description}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        // alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: theme.colors.inputBackground,
                        borderRadius: 15,
                        padding: 15,
                        fontFamily: "Poppins_500Medium",
                        fontSize: 20,
                        marginBottom: 16,

                    }}
                >
                    <TextInput
                        value={newMsg}
                        onChangeText={setNewMsg}
                        placeholder="Escreva uma mensagem"
                        style={{
                            borderRadius: 15,
                            justifyContent: "space-around",
                            backgroundColor: theme.colors.inputBackground,
                            // padding: 10,
                            // marginBottom: 10,
                            // height: 100,
                        }}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}
                        disabled={loading}
                        style={{
                            backgroundColor: theme.colors.buttonBackground,
                            padding: 10,
                            borderRadius: 14,
                            paddingHorizontal: 15,
                            opacity: loading ? 0.6 : 1,
                        }}
                    >
                        {loading ? <ActivityIndicator color="#000" /> : <Text style={{ fontWeight:"bold"}}>Enviar</Text>}
                    </TouchableOpacity>
                </View>
                <Text style={styles.rotulo}>Mensagens</Text>

                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                borderBottomWidth: 1,
                                borderColor: "#eee",
                            }}
                        >
                            <View style={{ flexDirection: "row", gap: 8 }}>
                                <Text style={styles.smallTitle}>{item.author}</Text>
                                {/*<Text>{isOwner ? "(criador do fórum)" : ""}</Text>*/}
                            </View>
                            <Text style={{ marginBottom: 20}}>{item.text}</Text>
                        </View>
                    )}
                    style={{ marginVertical: 20 }}
                />
            </View>

            <Footer />
        </ScreenWrapper>
    );
}
const styles = StyleSheet.create({
    titulo: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 28,
        color: "#000000",
        marginBottom: 10,
    },
    subtitulo: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: "#979CA5",
        marginBottom: 24,
    },
    rotulo: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "#000",
        marginVertical: 12,

    },
    smallTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 14,
        color: "#000",
        marginVertical: 12,

    },
})
