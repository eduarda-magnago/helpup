import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Footer from "../../components/Footer";
import ScreenWrapper from "../../components/ScreenWrapper";
import { supabase } from '../../db/supabase';
import {theme} from "../../constants/theme";
import {useProfile} from "../../db/profiles";
import {getInscricoesByVoluntario} from "../../db/registration";
import {format} from "date-fns";
import {ptBR} from "date-fns/locale";
import StarRating from "../../components/StarRating";
import PremiumBadge from "../../components/PremiumBadge";


export default function RegistrationsScreen() {
    const [voluntarioId, setVoluntarioId] = useState(null);
    const [inscricoes, setInscricoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const profile = useProfile();

    useEffect(() => {

        const getInscricoes = async () => {
            try {
                if (!profile) return;
                const inscricoes = await getInscricoesByVoluntario(profile?.id);
                setInscricoes(inscricoes);
            } catch (error) {
                Alert.alert('Erro', error.message || 'Não foi possível carregar os dados.');
            } finally {
                setLoading(false);
            }
        }
        getInscricoes();
    }, [profile]);

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scroll} style={{ backgroundColor: "#FBFAF4" }}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Inscrições enviadas</Text>
                    <Text style={styles.subtitulo}>
                        Aqui você encontra todas as inscrições que foram enviadas para as ONGs.
                    </Text>

                    <FlatList
                        data={inscricoes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <Image source={{ uri: item?.vagas.capa }} style={styles.image} />
                                <View>
                                    <Text style={{ fontSize: 18, fontFamily: "Poppins_500Medium"}}>{item?.vagas.titulo}</Text>
                                    <Text style={{ color: theme.colors.subtitleDark, fontFamily: "Poppins_500Medium"}}>Por {item?.vagas.perfil.org_name}</Text>
                                </View>
                                <View style={{marginLeft: "auto", alignSelf: "center"}}>
                                    <Text style={{marginLeft: "auto", padding: 10, backgroundColor: theme.colors.inputBackground, borderRadius:8}}>Enviado</Text>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyListText}>Você ainda não fez nenhuma inscrição.</Text>}
                        scrollEnabled={false}
                    />

                </View>
            </ScrollView>
            <Footer />
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 20,
    },
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
    formContainer: {
        backgroundColor: '#F6F2DD',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
    },
    campoContainer: {
        marginBottom: 16,
    },
    rotulo: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: "#000",
        marginBottom: 6,
    },
    input: {
        backgroundColor: "#FBFAF4",
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: "ZenKakuGothicAntique_400Regular",
    },
    picker: {
        backgroundColor: "#FBFAF4",
        borderRadius: 10,
        borderWidth: 0, // No Android, o Picker pode ter uma borda padrão
    },
    textarea: {
        height: 100,
        textAlignVertical: "top",
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 10,
        marginTop: 10,
    },
    botaoSalvar: {
        backgroundColor: "#F1E6AC",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    textoBotaoSalvar: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
        color: "#000",
    },
    botaoCancelar: {
        backgroundColor: '#E0E0E0',
    },
    listHeader: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20,
        color: "#000",
        marginBottom: 16,
    },
    itemContainer: {
        marginBottom: 20,
        flexDirection: "row",
    },
    itemContent: {
        marginBottom: 10,
    },
    itemTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: '#000',
    },
    itemText: {
        fontFamily: "ZenKakuGothicAntique_400Regular",
        fontSize: 15,
        color: '#333',
        marginTop: 4,
    },
    itemDate: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: 'gray',
        marginTop: 8,
    },
    itemButtons: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0DBC4',
        paddingTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    actionButtonText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        color: '#333',
    },
    image: {
        width: 73,
        height: 72,
        borderRadius: 10,
        backgroundColor: "#E0DAC3",
        marginRight: 14,
    },
    deleteButton: {},
    emptyListText: {
        textAlign: 'center',
        backgroundColor: theme.colors.buttonBackground,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: theme.colors.darkGrey,
    }
});
