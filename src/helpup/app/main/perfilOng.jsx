import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { ZenKakuGothicAntique_400Regular } from "@expo-google-fonts/zen-kaku-gothic-antique";
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
import {theme} from "../../constants/theme"
import PremiumBadge from "../../components/PremiumBadge";
import { updatePlan, updateProfile, useProfile } from "../../db/profiles";
import { supabase } from "../../db/supabase";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function PerfilOng() {
  const profile = useProfile();
  const planType = profile?.plan_type ?? "free";
  const [atualizandoPlano, setAtualizandoPlano] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigation = useNavigation();
  const [currentPlan, setCurrentPlan] = useState(planType);
  const [habilidades, setHabilidades] = useState(null);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [OngName, setOngName] = useState("");
  const [cidadeEstado, setCidadeEstado] = useState("");
  const [sobreOng, setSobreOng] = useState("");
  const [publico, setPublico] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    setCurrentPlan(planType);
  }, [planType]);

  const [fontesCarregadas] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    ZenKakuGothicAntique_400Regular,
  });

  if (!fontesCarregadas) return null;

  const salvarEdicao = (indice) => {
    const novaLista = habilidades.map((h, i) =>
        i === indice ? { texto: h.edicaoTemp, editando: false } : h
    );
    setHabilidades(novaLista);
  };

  const handleSave = async () => {
    const { error } = await updateProfile({ org_name: OngName ? OngName : profile.org_name, city: cidadeEstado ? cidadeEstado : profile.city, about: sobreOng ? sobreOng : profile.about, audience: publico ? publico : profile.publico, img: imageUrl ? imageUrl : profile.imageUrl});
    if (error) console.log(error);
    else router.push("/main/perfilOng");
  };

  const handlePlanChange = async (novoPlano) => {
    if (!profile || novoPlano === currentPlan) return;
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
              ? "Suas vagas agora aparecerão em destaque e você poderá acessar estatísticas exclusivas."
              : "Plano Free reativado."
      );
      setCurrentPlan(novoPlano);
    } catch (error) {
      Alert.alert("Erro", "Algo inesperado aconteceu.");
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
      // Expo Router navigation
      router.replace("/auth/login");

    } catch (_error) {
      Alert.alert("Erro", "Algo inesperado aconteceu ao sair.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
      <ScreenWrapper style={{backgroundColor: "#FBFAF4"}}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <Text style={styles.titulo}>Configurações Gerais</Text>
            <Text style={styles.subtitulo}>
              Utilize esse espaço para gerenciar sua conta da maneira que preferir.
            </Text>
            <Text style={styles.tituloprincipal}>Veja seu plano atual</Text>
            <View style={styles.planCard}>
              <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
              >
                <Text style={styles.planLabel}>Plano atual</Text>
                <PremiumBadge plan={currentPlan} type="ong" />
              </View>
              <Text style={styles.planDescription}>
                {currentPlan === "premium"
                    ? "Suas vagas são destacadas e aparecem primeiro nas buscas. Acesse também estatísticas de candidaturas."
                    : "No plano Free você publica vagas normalmente. Torne-se Premium para ganhar destaque e ferramentas extras."}
              </Text>
              <View style={styles.benefitsList}>
                <Text style={styles.benefitItem}>
                  • Publicar vagas gratuitamente
                </Text>
                <Text style={styles.benefitItem}>
                  • Receber candidaturas no fluxo padrão
                </Text>
                <Text style={styles.benefitItem}>
                  •{" "}
                  {currentPlan === "premium"
                      ? "Estatísticas e destaques ativos"
                      : "Upgrade para liberar destaques e estatísticas"}
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
                      : "Ativar Premium"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.tituloprincipal}>Configurações do Perfil</Text>
              <Text style={styles.rotulo}>Nome da Organização</Text>
              <TextInput
                  value={OngName}
                  onChangeText={setOngName}
                  style={styles.input}
                  placeholder={profile?.org_name}
                  placeholderTextColor="#979CA5"
              />
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.rotulo}>
                Cidade/Estado onde o trabalho é realizado
              </Text>
              <TextInput
                  value={cidadeEstado}
                  onChangeText={setCidadeEstado}
                  style={styles.input}
                  placeholder={profile?.city}
                  placeholderTextColor="#979CA5"
              />
            </View>

            <View style={styles.campoContainer}>
              <Text style={styles.rotulo}>Sobre a Organização</Text>
              <TextInput
                  value={sobreOng}
                  onChangeText={setSobreOng}
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
              <Text style={styles.rotulo}>
                Qual o público destinado a este projeto?
              </Text>
              <TextInput
                  value={publico}
                  onChangeText={setPublico}
                  style={[styles.input, styles.textarea]}
                  placeholder={profile?.audience}
                  placeholderTextColor="#979CA5"
                  multiline
                  textAlignVertical="top"
              />
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
  planCard: {
    backgroundColor: "#FFF4D2",
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#F8D37A",
  },
  planLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#604300",
  },
  planDescription: {
    fontFamily: "ZenKakuGothicAntique_400Regular",
    fontSize: 14,
    color: "#5C4B0B",
    marginTop: 12,
    lineHeight: 20,
  },
  benefitsList: {
    marginTop: 12,
    marginBottom: 16,
  },
  benefitItem: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#5C4B0B",
    marginBottom: 4,
  },
  planButton: {
    backgroundColor: "#FFC73A",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  planButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#3B2600",
  },
});
