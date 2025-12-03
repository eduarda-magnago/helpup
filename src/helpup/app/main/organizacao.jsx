import {router, useRouter} from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet, ImageBackground,
} from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import Fundo2 from "../../assets/images/fundo2.png";
import Footer from "../../components/Footer";
import PictureCard from "../../components/PictureCard";
import LinkCard from "../../components/LinkCard";
import PremiumBadge from "../../components/PremiumBadge";
import ScreenWrapper from "../../components/ScreenWrapper";

import { getAllOpenings } from "../../db/openings";
import { getAvaliacoesByOrganizacao } from "../../db/avaliacoes";
import { updatePlan, useProfile } from "../../db/profiles";
import { theme } from "../../constants/theme";
import StarRating from "../../components/StarRating";
import Svg, {Path} from "react-native-svg";
import Header from "../../components/Header";
import OpeningsList from "../../components/Openingslist";
import OpeningsListOng from "../../components/OpeningslistOng";

export default function Organizacao() {
  const router = useRouter();
  const profile = useProfile();

  const [openings, setOpenings] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingPlan, setUpdatingPlan] = useState(false);
  const [error, setError] = useState(null);

  const currentPlan = profile?.plan_type ?? "free";

  // --- Fetch openings once ---
  useEffect(() => {
    async function load() {
      try {
        const data = await getAllOpenings();
        setOpenings(data);
      } catch (err) {
        setError("Erro ao carregar vagas.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (!profile?.id) return;
    async function loadAvaliacoes() {
      try {
        const data = await getAvaliacoesByOrganizacao(profile.id);
        setAvaliacoes(data);
      } catch (err) {
        console.log("Erro ao carregar avaliações:", err);
      }
    }
    loadAvaliacoes();
  }, [profile]);

  const handlePlanToggle = async () => {
    if (!profile) return;
    const nextPlan = currentPlan === "premium" ? "free" : "premium";
    try {
      setUpdatingPlan(true);
      const { error } = await updatePlan(nextPlan);
      if (error) {
        Alert.alert("Erro", "Não foi possível atualizar o plano.");
        return;
      }
      Alert.alert("Sucesso", "Plano atualizado!");
    } catch {
      Alert.alert("Erro", "Houve um problema ao alterar o plano");
    } finally {
      setUpdatingPlan(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }
  return (
      <ScreenWrapper style={{ backgroundColor: "#FBFAF4" }}>
        {profile &&
            <Header />
        }
        <ScrollView contentContainerStyle={styles.scroll}>
          <PictureCard
              link="/main/createOpening"
              title="Criar Vagas"
              subtitle="Clique para criar uma vaga!"
          />
          <LinkCard
              link="/main/openings"
              title="Veja todas as suas vagas"
              subtitle="Acompanhe, edite e organize todas as suas iniciativas."
          />
          <View style={{marginBottom: 10}}>
            <OpeningsListOng />
          </View>
          <View style={styles.perfilContainer}>
            <View style={styles.perfilHeader}>
              <Image style={styles.perfilFotoPlaceholder} source={{ uri: profile?.img }}/>
              <View>
                <Text style={styles.perfilNome}>{profile?.org_name}</Text>
                <TouchableOpacity onPress={() => router.push("/main/perfilUsuarioView")}>
                  <Text style={styles.verPerfil}>Ver Perfil</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.divisor} />
            <Text style={styles.perguntaTitulo}>
              {currentPlan === "premium"
                ? "Você já é Premium!"
                : "Por quê assinar uma conta Premium?"}
            </Text>
            <Text style={styles.perguntaTexto}>
              {currentPlan === "premium"
                ? "Suas vagas estão em destaque e recebem estatísticas exclusivas."
                : "Com o plano Premium, suas organizações se destacam para outros usuários da plataforma!"}
            </Text>

            {currentPlan === "free" ? (
              <TouchableOpacity
                activeOpacity={0.8}
                disabled={updatingPlan}
                onPress={handlePlanToggle}
              >
                <ImageBackground
                  source={Fundo2}
                  style={styles.cardPremium}
                  imageStyle={{ borderRadius: 20 }}
                >
                  <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={styles.cardPremiumTexto}>
                      {updatingPlan ? "Ativando..." : "Seja Premium!"}
                    </Text>
                    <View style={styles.botaoArrow}>
                      <Svg width="13" height="22" viewBox="0 0 13 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M0.75 21.0475L11.6033 10.8987L0.75 0.75" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </Svg>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.freePlanButton}
                onPress={handlePlanToggle}
                disabled={updatingPlan}
              >
                <Text style={styles.freePlanButtonText}>
                  {updatingPlan ? "Atualizando..." : "Voltar ao plano Free"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Footer />
        </ScrollView>
      </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#FBFAF4",
  },
  iconesContainer: {
    backgroundColor: "#F6F2DD",
    width: 403,
    height: 87,
    borderRadius: 20,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  iconePlaceholder: {
    width: 35,
    height: 35,
  },
  titulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 30,
    color: "#000",
    marginLeft: 24,
  },
  subtitulo: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#979CA5",
    marginLeft: 24,
    marginBottom: 20,
  },
  vagasHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 24,
    marginBottom: 10,
  },
  vagasTitulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color:  theme.colors.darkGrey,
  },
  verTodos: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: theme.colors.darkGrey,
  },
  vagaItem: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 24,
    marginBottom: 15,
  },
  vagaImagemPlaceholder: {
    width: 73,
    height: 72,
    backgroundColor: "#E0DAC3",
    borderRadius: 10,
    marginRight: 14,
  },
  vagaTitulo: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: "#121212",
  },
  vagaSubtexto: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#979CA5",
  },

  vagasLista: {
    justifyContent:"space-around",
    paddingHorizontal: 15,
    marginTop: 10,
  },
  perfilContainer: {
    width: 382,
    backgroundColor: "#F6F2DD",
    borderRadius: 20,
    alignSelf: "center",
    paddingVertical: 20,
    justifyContent:"space-around",
    paddingHorizontal: 15,
    marginTop: 20,
    paddingBottom: 40,
    marginBottom: 40,
  },
  perfilHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  perfilFotoPlaceholder: {
    width: 70,
    height: 70,
    backgroundColor: "#E0DAC3",
    borderRadius: 35,
    marginRight: 14,
  },
  perfilNome: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 25,
    color: "#121212",
  },
  verPerfil: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#979CA5",
  },
  divisor: {
    height: 1,
    backgroundColor: "#D8D3BE",
    marginVertical: 15,
  },
  perguntaTitulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#000",
    marginBottom: 8,
  },
  perguntaTexto: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#979CA5",
    marginBottom: 20,
  },
  freePlanButton: {
    backgroundColor: "#FFE4D8",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0A17F",
  },
  freePlanButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#A4482E",
  },
  cardPremium: {
    width: 340,
    height: 255,
    borderRadius: 20,
    padding: 20,
    justifyContent: "flex-end",
  },
  cardPremiumTexto: {
    fontFamily: "Sarpanch_600SemiBold",
    fontSize: 26,
    color: "#000",
  },
  botaoArrow: {
    width: 64,
    height: 64,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
