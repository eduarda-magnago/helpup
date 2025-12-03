import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
    Image,
  TouchableOpacity,
  View,
} from "react-native";
import Fundo1 from "../../assets/images/fundo1.png";
import Fundo2 from "../../assets/images/fundo2.png";
import Footer from "../../components/Footer";
import PremiumBadge from "../../components/PremiumBadge";
import { getAllOpenings } from "../../db/openings";
import { updatePlan, useProfile } from "../../db/profiles";
import OpeningsList from "../../components/Openingslist";
import Svg, {Path} from "react-native-svg";
import Header from "../../components/Header";
import PictureCard from "../../components/PictureCard";
import LinkCard from "../../components/LinkCard";
import ScreenWrapper from "../../components/ScreenWrapper";
import {theme} from "../../constants/theme";
export default function Voluntario() {
  const profile = useProfile();
  const planType = profile?.plan_type ?? "free";
  const [currentPlan, setCurrentPlan] = useState(planType);
  const [updatingPlan, setUpdatingPlan] = useState(false);
  const togglePlan = async () => {
    if (!profile) return;
    const nextPlan = currentPlan === "premium" ? "free" : "premium";
    try {
      setUpdatingPlan(true);
      const { error } = await updatePlan(nextPlan);
      if (error) {
        Alert.alert("Erro", "Não foi possível atualizar o plano.");
        return;
      }
      Alert.alert(
        "Plano atualizado",
        nextPlan === "premium"
          ? "Você agora é voluntário premium! Suas candidaturas terão prioridade."
          : "Plano Free reativado."
      );
      setCurrentPlan(nextPlan);
    } catch (_error) {
      Alert.alert("Erro", "Algo deu errado, tente novamente.");
    } finally {
      setUpdatingPlan(false);
    }
  };

  useEffect(() => {
    setCurrentPlan(planType);
  }, [planType]);


  return (
    <ScreenWrapper style={{ backgroundColor: theme.colors.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {profile &&
            <Header />
        }
        <PictureCard
            link="/auth/registerOng"
            title="Conta Ong"
            subtitle="Crie agora sua conta de organização para criar um
            voluntariado!"
        />
        <LinkCard
            link="/main/registrations"
            title="Veja suas candidaturas enviadas"
            subtitle="Acompanhe todas as suas candidaturas que já foram enviadas."
        />
        <View style={{marginBottom: 10}}>
          <OpeningsList />
        </View>

        <View style={styles.perfilContainer}>
          <View style={styles.perfilHeader}>
            <Image style={styles.perfilFotoPlaceholder} source={{ uri: profile?.img }}/>
            <View>
              <Text style={styles.perfilNome}>{profile?.name}</Text>
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
                  onPress={togglePlan}
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
                  onPress={togglePlan}
                  disabled={updatingPlan}
              >
                <Text style={styles.freePlanButtonText}>
                  {updatingPlan ? "Atualizando..." : "Voltar ao plano Free"}
                </Text>
              </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Footer />
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
  cardWrapper: {
    alignSelf: "center",
    marginBottom: 20,
  },
  cardConta: {
    width: 382,
    height: 255,
    borderRadius: 20,
    padding: 20,
    justifyContent: "flex-end",
  },
  cardTitulo: {
    fontFamily: "Just_700Bold",
    fontSize: 24,
    color: "#000",
    fontWeight: "bold",
  },
  cardTexto: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#000",
    marginTop: 10,
  },
  cardCandidaturas: {
    width: 382,
    height: 255,
    backgroundColor: "#FFF",
    borderRadius: 20,
    alignSelf: "center",
    padding: 20,
    marginBottom: 30,
    justifyContent: "center",
  },
  candidaturasTitulo: {
    fontFamily: "Sarpanch_600SemiBold",
    fontSize: 25,
    color: "#000",
  },
  candidaturasTexto: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#979CA5",
    marginTop: 10,
  },
  botaoArrow: {
    width: 60,
    height: 51,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  vagasHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  vagasTitulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#121212",
  },
  verTodos: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#FFD143",
  },
  openingsList: {
    marginTop: 4,
  },
  errorText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#d9534f",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  emptyText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#979CA5",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  perfilContainer: {
    width: 382,
    backgroundColor: "#F6F2DD",
    borderRadius: 20,
    alignSelf: "center",
    padding: 20,
    marginTop: 10,
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
  badgeSpacing: {
    marginTop: 8,
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
  benefitItem: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B5F2E",
    marginBottom: 4,
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
  cardPremiumSub: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#000",
    marginTop: 10,
    marginBottom: 16,
  },
  premiumActionButton: {
    backgroundColor: "#FFD143",
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: "center",
  },
  premiumActionText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#000",
  },
});
