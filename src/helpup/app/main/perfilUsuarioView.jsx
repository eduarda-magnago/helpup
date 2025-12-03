import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { ZenKakuGothicAntique_400Regular } from "@expo-google-fonts/zen-kaku-gothic-antique";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Footer from "../../components/Footer";
import PremiumBadge from "../../components/PremiumBadge";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useProfile } from "../../db/profiles";

export default function PerfilUsuarioView() {
  const profile = useProfile();
  const planType = profile?.plan_type ?? "free";
  const [fontesCarregadas] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    ZenKakuGothicAntique_400Regular,
  });

  if (!fontesCarregadas) return null;
  const usuario = {
    nome: "Carla Santos",
    cidadeEstado: "Vitória, Espírito Santo - ES.",
    sobre:
      "Sou a Carla Santos, apaixonada pelo mar e pela natureza. Acredito que pequenas atitudes podem gerar grandes mudanças, por isso participo ativamente de ações de limpeza nas praias. Gosto de trabalhar em equipe, conhecer novas pessoas e contribuir para um ambiente mais limpo e saudável para todos. Meu objetivo é inspirar outras pessoas a cuidarem do planeta e mostrar que cada gesto de cuidado faz a diferença.",
    habilidades: ["Trabalho em equipe"],
  };
  return (
    <ScreenWrapper style={{ flex: 1, backgroundColor: "#FBFAF4" }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Bem-vindo(a), {profile?.name}!</Text>
          <PremiumBadge
            plan={planType}
            type="user"
            size="large"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.subtitulo}>
            Um pequeno gesto, um grande impacto. Pronto para fazer a diferença
            hoje?
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Meu Perfil</Text>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Nome completo</Text>
              <Text style={styles.text}>{profile?.name}</Text>

              <Text style={styles.label}>Plano</Text>
              <Text style={styles.text}>
                {planType === "premium"
                  ? "Premium — candidaturas com destaque"
                  : "Free — visibilidade padrão"}
              </Text>

              <Text style={styles.label}>Cidade/Estado</Text>
              <Text style={styles.text}>{profile?.city}</Text>

              <Text style={styles.label}>Sobre mim</Text>
              <Text style={styles.text}>{profile?.about}</Text>

              <Text style={styles.label}>Habilidades</Text>
              {usuario.habilidades.map((hab, index) => (
                <Text key={index} style={styles.text}>
                  • {hab}
                </Text>
              ))}
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
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#000",
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#F6F2DD",
    borderRadius: 12,
    padding: 16,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#000",
    marginTop: 10,
  },
  text: {
    fontFamily: "ZenKakuGothicAntique_400Regular",
    fontSize: 15,
    color: "#000",
    marginTop: 4,
    lineHeight: 22,
  },
});
