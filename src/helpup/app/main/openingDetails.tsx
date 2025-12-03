import PremiumBadge from "@/components/PremiumBadge";
import { theme } from "@/constants/theme";
import { createCandidatura } from "@/db/candidaturas";
import { OpeningData } from "@/db/openings";
import { useProfile } from "@/db/profiles";
import { supabase } from "@/db/supabase";
import { Image } from "expo-image";
import {router, useLocalSearchParams, useRouter} from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import Footer from "../../components/Footer";
import StarRating from "@/components/StarRating";
export interface OpeningDetailsScreenProps {
  opening: OpeningData;
}

export default function OpeningDetailsScreen() {
  const { screenProps } = useLocalSearchParams();
  const { opening } = JSON.parse(
    screenProps as string
  ) as OpeningDetailsScreenProps;
  const profile = useProfile();
  const [submitting, setSubmitting] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const ongId = typeof opening.ong === "object" ? opening.ong?.id : opening.ong;

    if (!ongId) return;

    const fetchRating = async () => {
      const { data, error } = await supabase
        .from("avaliacoes")
        .select("nota")
        .eq("id_organizacao", ongId);

      if (error) {
        console.error("Erro ao buscar avaliações:", error);
      } else if (data && data.length > 0) {
        const total = data.reduce((acc, item) => acc + (item?.nota || 0), 0);
        setAverageRating(total / data.length);
      } else {
        setAverageRating(0);
      }
    };

    fetchRating();
  }, [opening.ong]);

  return (
      <ScreenWrapper style={{ backgroundColor: "#FBFAF4" }}>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
          <View
              style={{
                backgroundColor: theme.colors.buttonBackground,
                paddingVertical: 16,
                paddingHorizontal: 30,
                gap: 16,
                borderRadius: 15,
                marginTop: opening.capa ? 16 : 0,
              }}
          >
            <View style={styles.titleRow}>
              <Text style={styles.title}>{opening.titulo}</Text>
              <PremiumBadge
                  plan={opening.ong?.plan_type}
                  type="ong"
                  style={{ marginLeft: 12 }}
              />
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={styles.regularText}>Data publicada:</Text>
              <Text style={styles.boldText}>
                {new Date(opening.created_at).toLocaleDateString()}
              </Text>
            </View>
            {averageRating !== null && (
                <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
                  <Text style={styles.regularText}>Avaliação da ONG:</Text>
                  <Text style={styles.boldText}>
                    {averageRating > 0
                        ? <StarRating rating={averageRating}/>
                        : "Sem avaliações"}
                  </Text>
                </View>
            )}
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={styles.regularText}>Categoria:</Text>
              <Text style={styles.boldText}>{opening.categoria}</Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={styles.regularText}>Criado(a) por:</Text>
              <Text style={styles.boldText}>
                {opening.ong?.org_name || "Desconhecido"}
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text style={styles.regularText}>Público:</Text>
              <Text style={styles.boldText}>{opening.publico || "N/A"}</Text>
            </View>
          </View>
            {opening.capa && (
                <View style={{ marginTop: 20}}>
                  <Image
                      source={{ uri: opening.capa }}
                      style={styles.coverImage}
                      contentFit="cover"
                  />
                </View>
            )}
          <View style={{ marginTop: 50, gap: 22 }}>
            <View>
              <Text style={styles.header}>Descrição do projeto voluntário</Text>
              <Text style={styles.paragraph}>{opening.descricao}</Text>
            </View>
            <View>
              <Text style={styles.header}>Local, quantidade de horas e dias</Text>
              <Text style={styles.paragraph}>{opening.local_tempo}</Text>
            </View>
            <View>
              <Text style={styles.header}>
                Quais serão as atividades nesse projeto?
              </Text>
              <Text style={styles.paragraph}>{opening.atividades}</Text>
            </View>
            <View>
              <Text style={styles.header}>Habilidades necessárias</Text>
              <Text style={styles.paragraph}>{opening.habilidades}</Text>
            </View>
            {profile?.role === "voluntario" && (
                <TouchableOpacity
                    onPress={() => router.push({
                      pathname: "/main/CreateRegistration",
                      params: { id: opening?.id }
                    })}
                    disabled={submitting}
                    style={[styles.applyButton, submitting && { opacity: 0.6 }]}
                >
                 <Text style={styles.applyButtonText}>
                    {submitting ? "Enviando..." : "Candidatar"}
                  </Text>
                  <Image
                      source={require("../../assets/images/lecriture.png")}
                      style={{ width: 25, height: 25 }}
                  />
                </TouchableOpacity>
            )}
          </View>
        </View>
        </ScrollView>
        <Footer/>
      </ScreenWrapper>

  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontWeight: "bold",
    fontSize: 20,
  },
  regularText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
  },
  boldText: {
    fontFamily: "Nunito_700Bold",
    fontWeight: "bold",
    fontSize: 16,
  },
  header: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: theme.colors.darkGrey,
  },
  paragraph: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: theme.colors.subtitle,
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    backgroundColor: theme.colors.inputBackground,
  },
  applyButton: {
    backgroundColor: theme.colors.buttonBackground,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 20
  },
  applyButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: theme.colors.darkGrey,
  },
  rotulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#000",
    marginBottom: 6,
  },
});
