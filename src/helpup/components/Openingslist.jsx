// components/OpeningsList.jsx
import React, { useEffect, useState } from "react";
import {View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet} from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getAllOpenings } from "../db/openings";
import { getAvaliacoesByOrganizacao } from "../db/avaliacoes";

import PremiumBadge from "./PremiumBadge";
import StarRating from "./StarRating";
import {theme} from "../constants/theme";
import {useRouter} from "expo-router";
import Svg, {Path} from "react-native-svg";

export default function OpeningsList({ onPressItem, display = null }) {
    const [openings, setOpenings] = useState([]);
    const [ratings, setRatings] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        async function load() {
            try {
                const data = await getAllOpenings();
                setOpenings(data ?? []);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    useEffect(() => {
        async function loadRatings() {
            const map = {};
            for (const opening of openings) {
                const orgId = opening?.ong?.id;
                if (!orgId) continue;

                const avs = await getAvaliacoesByOrganizacao(orgId);
                const avg =
                    avs.length > 0
                        ? avs.reduce((acc, a) => acc + a.nota, 0) / avs.length
                        : null;

                map[orgId] = avg;
            }
            setRatings(map);
        }

        if (openings.length > 0) loadRatings();
    }, [openings]);

    if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

    return (
        <View style={styles.listContainer}>
            {display !== "list" &&
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>Vagas abertas</Text>
                    <TouchableOpacity onPress={() => router.push("/main/openingsVol")}>
                        <View style={styles.botaoArrow}>
                            <Text style={styles.seeAll}>Ver todos</Text>
                            <Svg width="13" height="18" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <Path d="M0.75 21.0475L11.6033 10.8987L0.75 0.75" stroke={theme.colors.yellow} strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </Svg>
                        </View>

                    </TouchableOpacity>
                </View>
            }
            {openings.map((item) => {
                const avgRating = ratings[item.ong?.id];
                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.item}
                        activeOpacity={0.8}
                        onPress={() =>
                            router.push({
                                pathname: "/main/openingDetails",
                                params: {
                                    screenProps: JSON.stringify({ opening: item }),
                                },
                            })
                        }
                    >
                        <Image source={{ uri: item.capa }} style={styles.image} />
                        <View>
                            <Text style={styles.title}>{item.titulo}</Text>
                            <View style={{ flexDirection: "row"}}>
                                <Text style={styles.subText}>
                                    {format(new Date(item.created_at), "dd/MM", { locale: ptBR })}
                                    {" — "}
                                </Text>
                                <StarRating rating={avgRating} />
                            </View>
                            <View style={styles.orgRow}>
                                <Text>Por {item.ong?.org_name}</Text>
                                <PremiumBadge plan={item.ong?.plan_type} type="ong"/>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// components/OpeningsListStyles.js
export const styles = StyleSheet.create({
    listContainer: {
        justifyContent: "space-around",
        paddingHorizontal: 15,
        marginTop: 10,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    headerTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 24,
        color: theme.colors.darkGrey,
    },

    seeAll: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 20,
        color: theme.colors.yellow,
    },

    item: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },

    image: {
        width: 73,
        height: 72,
        borderRadius: 10,
        backgroundColor: "#E0DAC3",
        marginRight: 14,
    },

    title: {
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
        color: "#121212",
    },

    subText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 14,
        color: "#979CA5",
    },

    orgRow: {
        flexDirection: "row",
        gap: 8,
        marginTop: 4,
    },
    botaoArrow: {
        flexDirection: "row",
        // width: 24,
        // height: 24,
        borderColor: "#000",
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },
    error: {
        marginTop: 8,
        marginLeft: 24,
        color: "#d9534f",
        fontFamily: "Poppins_500Medium",
    },
});
