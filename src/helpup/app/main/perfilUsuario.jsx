import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { ZenKakuGothicAntique_400Regular } from "@expo-google-fonts/zen-kaku-gothic-antique";
import { Feather } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../../components/Footer";
import PremiumBadge from "../../components/PremiumBadge";
import { addHabilidades } from "../../db/database";
import {theme} from "../../constants/theme"
import { updatePlan, updateProfile, useProfile } from "../../db/profiles";
import { supabase } from "../../db/supabase";
import ScreenWrapper from "../../components/ScreenWrapper";
import HabilidadesList from "../../components/HabilidadesList";

export default function PerfilUsuario() {
  const profile = useProfile();
  const planType = profile?.plan_type ?? "free";
  const navigation = useNavigation();
  const [currentPlan, setCurrentPlan] = useState(planType);

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [cidadeEstado, setCidadeEstado] = useState("");
  const [sobreMim, setSobreMim] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [atualizandoPlano, setAtualizandoPlano] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    setCurrentPlan(planType);
  }, [planType]);

  const [fontesCarregadas] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    ZenKakuGothicAntique_400Regular,
  });

  if (!fontesCarregadas) return null;
  const handleSave = async () => {
    const { error } = await updateProfile({ name: nomeCompleto ? nomeCompleto : profile.name, city: cidadeEstado ? cidadeEstado : profile.city, about: sobreMim ? sobreMim : profile.about, img: imageUrl ? imageUrl : profile.imageUrl});
    if (error) console.log(error);
    else router.push("/main/perfilUsuario");
  };

  const handlePlanChange = async (novoPlano) => {
    if (!profile || currentPlan === novoPlano) return;
    try {
      setAtualizandoPlano(true);
      const { error } = await updatePlan(novoPlano);
      if (error) {
        Alert.alert("Erro", "Não foi possível atualizar o plano.");
        return;
      }
      Alert.alert(
          "Plano atualizado",
          novoPlano === "premium"
              ? "Agora você é voluntário premium! Suas candidaturas aparecerão primeiro para as ONGs."
              : "Você voltou para o plano Free."
      );
      setCurrentPlan(novoPlano);
    } catch (_error) {
      Alert.alert("Erro", "Algo inesperado aconteceu. Tente novamente.");
    } finally {
      setAtualizandoPlano(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Erro", "Não foi possível sair da conta.");
        return;
      }
      router.replace("/auth/login");
    } catch (_error) {
      Alert.alert("Erro", "Algo inesperado aconteceu ao sair.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
      <ScreenWrapper style={{backgroundColor: "#FBFAF4"}}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.titulo}>Configurações Gerais</Text>
            <Text style={styles.subtitulo}>
              Utilize esse espaço para gerenciar sua conta da maneira que preferir.
            </Text>
            <Text style={styles.tituloprincipal}>Veja seu plano atual</Text>
            <View style={styles.planCard}>
              <Text style={styles.planLabel}>Plano atual</Text>
              <PremiumBadge plan={currentPlan} type="user" size="large" />
              <Text style={styles.planDescription}>
                {currentPlan === "premium"
                    ? "Seu perfil aparece primeiro para as ONGs e você exibe o selo Premium em toda a plataforma."
                    : "Com o plano Free você já pode criar seu perfil e se candidatar. Faça upgrade para ganhar destaque."}
              </Text>
              <View style={styles.benefitsList}>
                <Text style={styles.benefitItem}>
                  • Criar perfil e se candidatar
                </Text>
                <Text style={styles.benefitItem}>
                  • Visualizar vagas em ordem padrão
                </Text>
                <Text style={styles.benefitItem}>
                  •{" "}
                  {currentPlan === "premium"
                      ? "Candidaturas com prioridade"
                      : "Upgrade para ter prioridade nas candidaturas"}
                </Text>
              </View>
              <TouchableOpacity
                  style={styles.planButton}
                  disabled={atualizandoPlano}
                  onPress={() =>
                      handlePlanChange(currentPlan === "premium" ? "free" : "premium")
                  }
              >
                <Text style={styles.planButtonText}>
                  {currentPlan === "premium"
                      ? "Voltar ao plano Free"
                      : "Assinar Premium"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.tituloprincipal}>Configurações do Perfil</Text>
              <Text style={styles.rotulo}>Nome completo</Text>
              <TextInput
                  value={nomeCompleto}
                  onChangeText={setNomeCompleto}
                  style={styles.input}
                  placeholder={profile?.name}
                  placeholderTextColor="#979CA5"
              />
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.rotulo}>Cidade/Estado</Text>
              <TextInput
                  value={cidadeEstado}
                  onChangeText={setCidadeEstado}
                  style={styles.input}
                  placeholder={profile?.city}
                  placeholderTextColor="#979CA5"
              />
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.rotulo}>Sobre mim</Text>
              <TextInput
                  value={sobreMim}
                  onChangeText={setSobreMim}
                  style={[styles.input, styles.textarea]}
                  placeholder={profile?.about}
                  placeholderTextColor="#979CA5"
                  multiline
                  textAlignVertical="top"
              />
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.rotulo}>Foto de perfil (opcional)</Text>
              <TextInput
                  placeholder="Cole a URL da imagem escolhida"
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  autoCapitalize="none"
                  keyboardType="url"
                  style={[styles.input]}
                  placeholderTextColor="#979CA5"
                  multiline
                  textAlignVertical="top"
              />
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.rotulo}>Habilidades</Text>
              <HabilidadesList userId={profile?.id} />
            </View>

            <TouchableOpacity style={styles.botaoSalvar} onPress={handleSave}>
              <Text style={styles.textoBotaoSalvar}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                disabled={loggingOut}
            >
              <Text style={styles.logoutButtonText}>
                {loggingOut ? "Saindo..." : "Sair da conta"}
              </Text>
            </TouchableOpacity>
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
  tituloprincipal: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#000000",
    marginBottom: 10,
  },
  subtitulo: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#979CA5",
    marginBottom: 24,
  },
  campoContainer: {
    marginBottom: 20,
  },
  rotulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#000",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F6F2DD",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "ZenKakuGothicAntique_400Regular",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  containerNovaHabilidade: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  planCard: {
    backgroundColor: "#FFF1C4",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F3C969",
  },
  planLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#7A5400",
    marginBottom: 8,
  },
  planDescription: {
    fontFamily: "ZenKakuGothicAntique_400Regular",
    fontSize: 14,
    color: "#5A4C1B",
    marginVertical: 10,
    lineHeight: 20,
  },
  benefitsList: {
    marginBottom: 14,
  },
  benefitItem: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#5A4C1B",
    marginBottom: 4,
  },
  planButton: {
    backgroundColor: "#FFCE3C",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  planButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#3C2A00",
  },
  logoutButton: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#121212",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  logoutButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#121212",
  },
  habilidadeItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1E6AC",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  habilidadeTexto: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginRight: 6,
    color: "#000",
  },
  habilidadeInput: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    backgroundColor: "#F1E6AC",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
    color: "#000",
    minWidth: 100,
  },
  botaoSalvar: {
    backgroundColor: "#F1E6AC",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  textoBotaoSalvar: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#000",
  },
});
