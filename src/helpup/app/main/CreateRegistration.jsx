import { Picker } from '@react-native-picker/picker';
import { Label } from "@react-navigation/elements";
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from "../../components/Footer";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
    addInscricao,
    deleteInscricao,
    getAllVagas,
    updateInscricao
} from '../../db/registration';
import { supabase } from '../../db/supabase';
import {router, useLocalSearchParams} from "expo-router";
import {theme} from "../../constants/theme";

export default function InscricoesScreen() {

    const [voluntarioId, setVoluntarioId] = useState(null);
    const [inscricoes, setInscricoes] = useState([]);
    const [vagas, setVagas] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [selectedVaga, setSelectedVaga] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useLocalSearchParams();

    const loadInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado.');

            setVoluntarioId(user.id);

            const [vagasData, inscricoesData] = await Promise.all([
                getAllVagas(),
                //getInscricoesByVoluntario(user.id)
            ]);

            setVagas(vagasData || []);
            setInscricoes(inscricoesData || []);

        } catch (error) {
            Alert.alert('Erro', error.message || 'Não foi possível carregar os dados.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadInitialData();
    }, [loadInitialData]);


    const clearForm = () => {
        setNome('');
        setEmail('');
        setMensagem('');
        setSelectedVaga(null);
        setEditingId(null);
    };

    const handleSubmit = async () => {
        if (!nome.trim() || !email.trim() || (!params.id)) {
            Alert.alert('Erro', 'Preencha todos os campos: Nome, E-mail e Vaga.');
            return;
        }
        if (!voluntarioId) {
            Alert.alert('Erro', 'Usuário não autenticado. Faça login.');
            return;
        }

        if (editingId) {
            await updateInscricao(editingId, { id_vaga: params?.id, nome: nome, email: email, mensagem: mensagem }, voluntarioId);
        } else {
            await addInscricao({ id_voluntario: voluntarioId, id_vaga: params?.id, nome: nome, email: email, mensagem: mensagem });
            Alert.alert("Sucesso", "Inscrição registrada com sucesso!");
            router.push('/main/registrations');
        }
        clearForm();
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setNome(item.nome.toString());
        setEmail(item.email.toString());
        setMensagem(item.mensagem);
        setSelectedVaga(item.id_vaga);
        setVoluntarioId(voluntarioId);
    };

    const handleDelete = (id) => {
        Alert.alert('Confirmar', 'Deseja excluir esta inscrição?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Excluir', style: 'destructive', onPress: async () => {
                    await deleteInscricao(id);
                }
            }
        ]);
    };


    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scroll} style={{ backgroundColor: "#FBFAF4" }}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Inscrição</Text>
                    <Text style={styles.subtitulo}>
                        Se inscreva na vaga que desejar e a ONG irá receber a sua candidatura.
                    </Text>
                    <View style={styles.formContainer}>
                        <View style={styles.campoContainer}>
                            <View style={{flexDirection:"row", gap:10 }}>
                                <Text style={styles.rotulo}>Vaga:</Text>
                                {vagas.map(vaga => {
                                    if(vaga.id == params.id) {
                                        return <View key={vaga.id}>
                                            <Text style={{color: theme.colors.darkGrey}}>{vaga.titulo}</Text>
                                        </View>
                                    }
                                })}
                            </View>


                        </View>
                        <View style={styles.campoContainer}>
                            <Text style={styles.rotulo}>Nome completo</Text>
                            <TextInput
                                value={nome}
                                onChangeText={setNome}
                                style={styles.input}
                                placeholderTextColor="#979CA5"
                                placeholder="Insira seu nome"
                            />
                        </View>
                        <View style={styles.campoContainer}>
                            <Text style={styles.rotulo}>E-mail</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                placeholderTextColor="#979CA5"
                                placeholder="Digite seu e-mail"
                            />
                        </View>
                        <View style={styles.campoContainer}>
                            <Text style={styles.rotulo}>Mensagem (Opcional)</Text>
                            <TextInput
                                value={mensagem}
                                onChangeText={setMensagem}
                                multiline
                                style={[styles.input, styles.textarea]}
                                placeholderTextColor="#979CA5"
                                placeholder="Digite sua mensagem"
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSubmit}>
                                <Text style={styles.textoBotaoSalvar}>{editingId ? 'Salvar Alterações' : 'Enviar Inscrição'}</Text>
                            </TouchableOpacity>
                            {editingId && (
                                <TouchableOpacity style={[styles.botaoSalvar, styles.botaoCancelar]} onPress={clearForm}>
                                    <Text style={styles.textoBotaoSalvar}>Cancelar</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
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
        borderRadius: 15,
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
        backgroundColor: theme.colors.inputBackground,
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
