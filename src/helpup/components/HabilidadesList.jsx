import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

import {
    getHabilidades,
    addHabilidade,
    deleteHabilidade,
    updateHabilidade,
} from "../db/habilidades";

export default function HabilidadesList({ userId }) {
    const [habilidades, setHabilidades] = useState([]);
    const [novaHabilidade, setNovaHabilidade] = useState("");

    // Load habilidades once
    useEffect(() => {
        async function load() {
            if (!userId) return;
            const rows = await getHabilidades(userId);

            // create local state with editing flags
            const mapped = rows.map((h) => ({
                id: h.id,
                texto: h.titulo,
                editando: false,
                edicaoTemp: h.titulo,
            }));

            setHabilidades(mapped);
        }

        load();
    }, [userId]);

    async function adicionar() {
        if (!novaHabilidade.trim()) return;

        await addHabilidade(userId, novaHabilidade.trim());
        setNovaHabilidade("");

        // reload
        const rows = await getHabilidades(userId);
        const mapped = rows.map((h) => ({
            id: h.id,
            texto: h.titulo,
            editando: false,
            edicaoTemp: h.titulo,
        }));
        setHabilidades(mapped);
    }

    function ativarEdicao(indice) {
        const nova = [...habilidades];
        nova[indice].editando = true;
        setHabilidades(nova);
    }

    async function salvarEdicao(indice) {
        const item = habilidades[indice];
        await updateHabilidade(item.id, item.edicaoTemp);

        const nova = [...habilidades];
        nova[indice].texto = item.edicaoTemp;
        nova[indice].editando = false;

        setHabilidades(nova);
    }

    async function remover(indice) {
        const item = habilidades[indice];
        await deleteHabilidade(item.id);

        const nova = habilidades.filter((_, i) => i !== indice);
        setHabilidades(nova);
    }

    return (
        <View>
            {habilidades.map((habilidade, indice) => (
                <View key={habilidade.id} style={styles.habilidadeItem}>
                    {habilidade.editando ? (
                        <TextInput
                            value={habilidade.edicaoTemp}
                            onChangeText={(t) => {
                                const nova = [...habilidades];
                                nova[indice].edicaoTemp = t;
                                setHabilidades(nova);
                            }}
                            style={styles.habilidadeInput}
                            placeholderTextColor="#979CA5"
                        />
                    ) : (
                        <Text style={styles.habilidadeTexto}>{habilidade.texto}</Text>
                    )}

                    {habilidade.editando ? (
                        <TouchableOpacity onPress={() => salvarEdicao(indice)}>
                            <Feather name="check" size={16} color="#000" style={{ marginLeft: 8 }} />
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => ativarEdicao(indice)}>
                                <Feather
                                    name="edit-3"
                                    size={16}
                                    color="#000"
                                    style={{ marginHorizontal: 8 }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => remover(indice)}>
                                <Feather name="x" size={16} color="#000" />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            ))}

            <View style={styles.addRow}>
                <TextInput
                    value={novaHabilidade}
                    onChangeText={setNovaHabilidade}
                    placeholder="Adicionar habilidade..."
                    style={styles.addInput}
                    placeholderTextColor="#979CA5"
                />

                <TouchableOpacity onPress={adicionar}>
                    <Feather name="plus" size={18} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    habilidadeItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#F6F2DD",
        padding: 10,
        borderRadius: 10,
    },
    habilidadeTexto: {
        flex: 1,
        fontSize: 16,
    },
    habilidadeInput: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        backgroundColor: "#F6F2DD",
        padding: 10,
        borderRadius: 10,
    },
    addInput: {
        flex: 1,
        paddingHorizontal: 10,
    },
});
