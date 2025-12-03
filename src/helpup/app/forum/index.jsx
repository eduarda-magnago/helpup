import React, { useEffect, useState } from "react";
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from "react-native";
import { useRouter } from "expo-router";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import { db } from "../../db/firebase";
import {useProfile} from "../../db/profiles";
import ScreenWrapper from "../../components/ScreenWrapper";
import Footer from "../../components/Footer";
import {supabase} from "../../db/supabase";
import { theme } from "@/constants/theme";

export default function ForumListing() {
    const router = useRouter();
    const [forums, setForums] = useState([]);
    const profile = useProfile();

    useEffect(() => {
        const fetchForums = async () => {
            const snapshot = await getDocs(collection(db, "forums"));
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            data.forEach((forum) => {
                const messagesRef = collection(db, "forums", forum.id, "messages");
                onSnapshot(messagesRef, (msgSnap) => {
                    const count = msgSnap.size;
                    setForums((prev) =>
                        prev.map((f) =>
                            f.id === forum.id ? { ...f, messageCount: count } : f
                        )
                    );
                });
            });

            setForums(data);
        };

        fetchForums();
    }, []);

    return (
        <ScreenWrapper style={{backgroundColor: "#FBFAF4"}}>
            <View style={{ flex: 1, padding: 20 }}>
                <View style={{flexDirection:"row", justifyContent:"space-between", alignItems: "center",marginBottom: 10}}>
                    <Text style={styles.titulo}>Fórum</Text>
                    <TouchableOpacity
                        onPress={() => router.push("/forum/create")}
                        style={{
                            backgroundColor: theme.colors.buttonBackground,
                            padding: 10,
                            borderRadius: 14,
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>+ Criar Fórum</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitulo}>Entre em um fórum para participar das discussões.</Text>


                <FlatList
                    data={forums}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                padding: 15,
                                borderRadius: 14,
                                marginBottom: 10,
                                backgroundColor: theme.colors.inputBackground,
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}
                        >
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                                <Text style={{ fontSize: 12, color: "gray" }}>
                                    💬 {item.messageCount || 0} respostas
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => router.push(`/forum/${item.id}`)}
                            >
                                <View                    style={{
                                    backgroundColor: theme.colors.buttonBackground,
                                    padding: 10,
                                    paddingHorizontal: 15,
                                    borderRadius: 14,
                                    alignSelf: "flex-end",
                                }}
                                ><Text style={{ fontWeight: "bold" }}>Entrar</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
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
    }

})

