import { theme } from "@/constants/theme";
import { getAllOpenings } from "@/db/openings";
import { useProfile } from "@/db/profiles";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Footer from "../../components/Footer";
import OpeningsList from "@/components/Openingslist";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function OpeningsScreen() {
    const router = useRouter();
    const profile = useProfile();
    const [openings, setOpenings] = useState([]);

    const loadOpenings = useCallback(async () => {
        setOpenings(await getAllOpenings());
    }, []);

    useEffect(() => {
        loadOpenings();
    }, [loadOpenings]);

    return (
        <ScreenWrapper style={{ backgroundColor: theme.colors.background }}>
            <ScrollView>
                <View>
                    <Text style={styles.sectionTitle}>Vagas abertas</Text>
                    <View style={{ marginTop: 20 }}>
                        <OpeningsList display="list" />
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </ScreenWrapper>
);
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 24,
        color: theme.colors.darkGrey,
        paddingHorizontal: 15,
        marginTop: 20
    },
    largeButton: {
        marginTop: 20,
        backgroundColor: "#F3E4A4",
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    largeButtonText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 18,
        color: theme.colors.darkGrey,
    },
});
