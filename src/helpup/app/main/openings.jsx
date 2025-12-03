import Opening from "@/components/Opening";
import { theme } from "@/constants/theme";
import { getOrganizationOpenings } from "@/db/openings";
import { useProfile } from "@/db/profiles";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../../components/Footer";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function OpeningsScreen() {
  const router = useRouter();
  const profile = useProfile();
  const [openings, setOpenings] = useState([]);

  const loadOpenings = useCallback(async () => {
    if (!profile?.id) return;
    const data = await getOrganizationOpenings(profile.id);
    setOpenings(data || []);
  }, [profile]);

  useEffect(() => {
    loadOpenings();
  }, [loadOpenings]);

  return (
      <ScreenWrapper>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <ScrollView
              contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
              style={{ flex: 1 }}
          >
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Vagas criadas</Text>

              <View style={{ marginTop: 20 }}>
                <FlatList
                    scrollEnabled={false}
                    data={openings}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Opening opening={item} showActions />
                    )}
                />
              </View>

              <View style={{ marginTop: 30 }}>
                <Text style={styles.sectionTitle}>Candidaturas recebidas</Text>

                <TouchableOpacity
                    style={styles.largeButton}
                    onPress={() => router.push("/main/candidaturas")}
                >
                  <Text style={styles.largeButtonText}>Ver candidaturas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Footer />
        </View>

      </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: theme.colors.darkGrey,
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
