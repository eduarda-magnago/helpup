import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../../db/supabase';
import {
    addAvaliacao,
    getAllOngs,
    getAvaliacoesByVoluntario,
    updateAvaliacao,
    deleteAvaliacao,
} from '../../db/avaliacoes';
import {
    useFonts,
    Poppins_500Medium,
    Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ZenKakuGothicAntique_400Regular } from "@expo-google-fonts/zen-kaku-gothic-antique";
import { Feather } from "@expo/vector-icons";
import ScreenWrapper from "../../components/ScreenWrapper";
import Footer from "../../components/Footer";
import {theme} from "../../constants/theme";

export default function AvaliacoesScreen() {
    const [voluntarioId, setVoluntarioId] = useState(null);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [ongs, setOngs] = useState([]);
    const [nota, setNota] = useState('');
    const [comentario, setComentario] = useState('');
    const [selectedOng, setSelectedOng] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_600SemiBold,
        ZenKakuGothicAntique_400Regular,
    });


    const loadInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado.');

            setVoluntarioId(user.id);

            const [ongsData, avaliacoesData] = await Promise.all([
                getAllOngs(),
                getAvaliacoesByVoluntario(user.id)
            ]);

            setOngs(ongsData || []);
            setAvaliacoes(avaliacoesData || []);

        } catch (error) {
            Alert.alert('Erro', error.message || 'Não foi possível carregar os dados.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);

    const loadAvaliacoes = async (currentUserId) => { // Função para recarregar apenas as avaliações
        if (!currentUserId) return;
        const result = await getAvaliacoesByVoluntario(currentUserId);
        setAvaliacoes(result);
    };

    const clearForm = () => {
        setNota('');
        setComentario('');
        setSelectedOng(null);
        setEditingId(null);
    };

    const handleSubmit = async () => {
        if (!nota.trim() || !comentario.trim() || (!editingId && !selectedOng)) {
            Alert.alert('Erro', 'Preencha todos os campos: ONG, Nota e Comentário.');
            return;
        }
        if (!voluntarioId) {
            Alert.alert('Erro', 'Usuário não autenticado. Faça login.');
            return;
        }
        const notaNum = parseInt(nota);
        if (isNaN(notaNum) || notaNum < 1 || notaNum > 5) {
            Alert.alert('Erro', 'A nota deve ser um número entre 1 e 5.');
            return;
        }

        if (editingId) {
            await updateAvaliacao(editingId, { nota: notaNum, comentario }, voluntarioId);
        } else {
            await addAvaliacao({ id_voluntario: voluntarioId, id_organizacao: selectedOng, nota: notaNum, comentario });
        }
        clearForm();
        await loadAvaliacoes(voluntarioId);
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setNota(item.nota.toString());
        setComentario(item.comentario);
        setSelectedOng(item.id_organizacao);
    };

    const handleDelete = (id) => {
        Alert.alert('Confirmar', 'Deseja excluir esta avaliação?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    await deleteAvaliacao(id);
                    await loadAvaliacoes(voluntarioId);
                }
            }
        ]);
    };

    if (!fontsLoaded || loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#FBFAF4" }}>
                <ActivityIndicator size="large" color="#F1E6AC" />
            </View>
        );
    }

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scroll} style={{ backgroundColor: "#FBFAF4" }}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Avaliações</Text>
                    <Text style={styles.subtitulo}>
                        Compartilhe sua experiência e ajude outras pessoas a escolherem uma causa.
                    </Text>
                    <View style={styles.formContainer}>
                        <View style={styles.campoContainer}>
                            <Text style={styles.rotulo}>ONG</Text>
                            <Picker
                                selectedValue={selectedOng}
                                onValueChange={(itemValue) => setSelectedOng(itemValue)}
                                style={styles.picker}
                                enabled={!editingId}
                            >
                                <Picker.Item label="Selecione uma ONG..." value={null} />
                                {ongs.map((ong) => (
                                    <Picker.Item key={ong.id} label={ong.org_name} value={ong.id} />
                                ))}
                            </Picker>
                        </View>
                        <View style={styles.campoContainer}>
                            <Text style={styles.rotulo}>Nota (1 a 5)</Text>
                            <TextInput
                                placeholder="Nota de 1 a 5"
                                value={nota}
                                onChangeText={setNota}
                                style={styles.input}
                                keyboardType="numeric"
                                placeholderTextColor={theme.colors.subtitleDark}
                            />
                        </View>
                        <View style={styles.campoContainer}>
                            <Text style={styles.rotulo}>Comentário</Text>
                            <TextInput
                                placeholder="Descreva sua experiência"
                                value={comentario}
                                onChangeText={setComentario}
                                multiline
                                style={[styles.input, styles.textarea]}
                                placeholderTextColor={theme.colors.subtitleDark}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSubmit}>
                                <Text style={styles.textoBotaoSalvar}>{editingId ? 'Salvar Alterações' : 'Adicionar Avaliação'}</Text>
                            </TouchableOpacity>
                            {editingId && (
                                <TouchableOpacity style={[styles.botaoSalvar, styles.botaoCancelar]} onPress={clearForm}>
                                    <Text style={styles.textoBotaoSalvar}>Cancelar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <Text style={styles.listHeader}>Suas avaliações enviadas</Text>

                    <FlatList
                        data={avaliacoes}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.itemContent}>
                                    <Text style={styles.itemTitle}>Nota: {item.nota}/5 - {item.perfil?.org_name || 'ONG não encontrada'}</Text>
                                    <Text style={styles.itemText}>{item.comentario}</Text>
                                    <Text style={styles.itemDate}>{new Date(item.data_avaliacao).toLocaleDateString()}</Text>
                                </View>
                                <View style={styles.itemButtons}>
                                    <TouchableOpacity onPress={() => handleEdit(item)} style={styles.actionButton}>
                                        <Feather name="edit-3" size={18} color="#333" />
                                        <Text style={styles.actionButtonText}>Editar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.actionButton, styles.deleteButton]}>
                                        <Feather name="trash-2" size={18} color="#333" />
                                        <Text style={[styles.actionButtonText, { color: '#333' }]}>Excluir</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        ListEmptyComponent={<Text style={styles.emptyListText}>Você ainda não fez nenhuma avaliação.</Text>}
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
        fontFamily: "Poppins_500Medium",
    },
    picker: {
        backgroundColor: "#FBFAF4",
        borderRadius: 10,
        borderWidth: 0,
        color: theme.colors.subtitleDark
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
        backgroundColor: '#F6F2DD',
        borderRadius: 10,
        padding: 15,
        marginBottom: 12,
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
    deleteButton: {},
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: '#979CA5',
    }
});
