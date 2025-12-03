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
import { useProfile } from "../../db/profiles";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function PerfilOngView() {
  const profile = useProfile();
  const planType = profile?.plan_type ?? "free";

  const [fontesCarregadas] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    ZenKakuGothicAntique_400Regular,
  });

  if (!fontesCarregadas) return null;

  return (
    <ScreenWrapper style={{ backgroundColor: "#FBFAF4" }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.titulo}>Bem-vindo(a), {profile?.org_name}!</Text>
          <PremiumBadge
            plan={planType}
            type="ong"
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
              <Text style={styles.label}>Nome da Organização</Text>
              <Text style={styles.text}>{profile?.org_name}</Text>

              <Text style={styles.label}>Plano</Text>
              <Text style={styles.text}>
                {planType === "premium"
                  ? "Premium — vagas em destaque e acesso a métricas"
                  : "Free — publicação gratuita e alcance padrão"}
              </Text>

              <Text style={styles.label}>
                Cidade/Estado onde o trabalho é realizado
              </Text>
              <Text style={styles.text}>{profile?.city}</Text>

              <Text style={styles.label}>Sobre a Organização</Text>
              <Text style={styles.text}>{profile?.about}</Text>

              <Text style={styles.label}>
                Qual o público destinado a esse projeto?
              </Text>
              <Text style={styles.text}>{profile?.audience}</Text>
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
