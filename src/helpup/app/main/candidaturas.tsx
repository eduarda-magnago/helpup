import Footer from "@/components/Footer";
import { theme } from "@/constants/theme";
import {
  CandidaturaData,
  getCandidaturasByOrganization,
} from "@/db/candidaturas";
import { getOrganizationOpeningsCount } from "@/db/openings";
import { useProfile } from "@/db/profiles";
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { Image as ExpoImage } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { supabase } from "../../db/supabase";
import ScreenWrapper from "@/components/ScreenWrapper";

export default function CandidaturasScreen() {
  const profile = useProfile();
  const [candidaturas, setCandidaturas] = useState<CandidaturaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [openingsCount, setOpeningsCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    })();
  }, []);

  useEffect(() => {
    if (!userId || profile?.plan_type !== "premium") return;
    (async () => {
      try {
        const count = await getOrganizationOpeningsCount(userId);
        setOpeningsCount(count);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [userId, profile?.plan_type]);

  const loadCandidaturas = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const data = await getCandidaturasByOrganization(userId);
      setCandidaturas(data);
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.message || "Não foi possível carregar as candidaturas"
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadCandidaturas();
  }, [loadCandidaturas]);


  const totalCandidaturas = candidaturas.length;
  const premiumCandidates = candidaturas.filter(
    (item) => item.usuario?.plan_type === "premium"
  ).length;
  const premiumShare = totalCandidaturas
    ? Math.round((premiumCandidates / totalCandidaturas) * 100)
    : 0;
  const avgPerOpening =
    openingsCount > 0
      ? (totalCandidaturas / openingsCount).toFixed(1)
      : totalCandidaturas.toString();
  const estimatedViews = Math.round(
    (openingsCount || 1) * 30 + totalCandidaturas * 4
  );

  return (
      <ScreenWrapper style={{backgroundColor: theme.colors.background}}>
          <ScrollView
              contentContainerStyle={{ paddingHorizontal: 20 }}
              style={{ flex: 1 }}
          >
            <View style={{ marginTop: 30 }}>
              <Text style={styles.header}>Gerenciar candidaturas</Text>

              {profile?.plan_type === "premium" && (
                  <View style={styles.metricsContainer}>
                    <Text style={styles.metricsTitle}>Insights Premium</Text>
                    <View style={styles.metricsGrid}>
                      <View style={styles.metricCard}>
                        <Text style={styles.metricValue}>{totalCandidaturas}</Text>
                        <Text style={styles.metricLabel}>Candidaturas</Text>
                      </View>
                      <View style={styles.metricCard}>
                        <Text style={styles.metricValue}>{estimatedViews}</Text>
                        <Text style={styles.metricLabel}>
                          Visualizações estimadas
                        </Text>
                      </View>
                      <View style={styles.metricCard}>
                        <Text style={styles.metricValue}>{premiumShare}%</Text>
                        <Text style={styles.metricLabel}>Candidatos premium</Text>
                      </View>
                      <View style={styles.metricCard}>
                        <Text style={styles.metricValue}>{avgPerOpening}</Text>
                        <Text style={styles.metricLabel}>Candidaturas/vaga</Text>
                      </View>
                    </View>
                  </View>
              )}

              <Text style={styles.subtitle}>Candidaturas</Text>

              {loading ? (
                  <View style={styles.centerContainer}>
                    <Text style={styles.loadingText}>Carregando...</Text>
                  </View>
              ) : candidaturas.length === 0 ? (
                  <View style={styles.centerContainer}>
                    <Text style={styles.emptyText}>
                      Nenhuma candidatura recebida ainda.
                    </Text>
                  </View>
              ) : (
                  <View style={{ marginTop: 10 }}>
                    <FlatList
                        scrollEnabled={false}
                        data={candidaturas}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                              {item.vaga?.capa ? (
                                  <ExpoImage
                                      source={{ uri: item.vaga.capa }}
                                      style={styles.cardImage}
                                      contentFit="cover"
                                  />
                              ) : (
                                  <View
                                      style={[
                                        styles.cardImage,
                                        { backgroundColor: theme.colors.inputBackground },
                                      ]}
                                  />
                              )}
                              <View style={styles.cardContent}>
                                <Text style={styles.cardTitle} numberOfLines={1}>
                                  {item.vaga?.titulo || "Vaga não encontrada"}
                                </Text>
                                <Text style={styles.cardSubtitle} numberOfLines={1}>
                                  Por {item.usuario?.name || "Usuário"}
                                </Text>
                              </View>
                              <TouchableOpacity
                                  style={styles.visualizarButton}
                                  onPress={() => {}}
                              >
                                <Text style={styles.visualizarButtonText}>
                                  Visualizar
                                </Text>
                              </TouchableOpacity>
                            </View>
                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                    />
                  </View>
              )}
            </View>
          </ScrollView>
          <Footer />
      </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: theme.colors.darkGrey,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#999",
    marginBottom: 16,
  },
  metricsContainer: {
    backgroundColor: "#FFF4D2",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  metricsTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: theme.colors.darkGrey,
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricCard: {
    width: "47%",
    backgroundColor: "#FFEAB8",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  metricValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#5C4300",
  },
  metricLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#5C4300",
    marginTop: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: theme.colors.subtitle,
  },
  emptyText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: theme.colors.subtitle,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: theme.colors.darkGrey,
  },
  cardSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#999",
  },
  visualizarButton: {
    backgroundColor: "#F3E4A4",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  visualizarButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: theme.colors.darkGrey,
  },
});
