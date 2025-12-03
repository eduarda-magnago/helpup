// app/login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useFonts, Poppins_500Medium, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { ZenKakuGothicAntique_400Regular } from "@expo-google-fonts/zen-kaku-gothic-antique";
import { Feather } from "@expo/vector-icons";
import {supabase} from "../../db/supabase";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Poppins_500Medium,
    Poppins_600SemiBold,
    ZenKakuGothicAntique_400Regular,
  });

  if (!fontsLoaded) return null;

  async function handleLogin() {
    try {
      if (!email || !password) {
        Alert.alert("Erro", "Por favor, insira e-mail e senha.");
        return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        Alert.alert("Erro ao entrar", error.message);
        return;
      }
      router.push("/");
    } catch (err) {
      Alert.alert("Erro inesperado", err.message);
    }
  }

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.title}>Entrar na conta</Text>
          <Text style={styles.subtitle}>
            Um pequeno gesto, um grande impacto. Pronto para fazer a diferença hoje?
          </Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              placeholder="exemplo@gmail.com"
              placeholderTextColor="#979CA5"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              placeholder="********"
              placeholderTextColor="#979CA5"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Entrar</Text>
            <Feather name="arrow-right" size={22} color="#000" />
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.createTitle}>Criar conta</Text>
            <Text style={styles.cardText}>
              Na <Text style={{ fontWeight: "600" }}>HelpUP</Text>, você pode participar da maneira que preferir. Vamos começar?
            </Text>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/registerOng')}
            >
              <Text style={styles.secondaryText}>Criar Perfil ONG</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/auth/registerVolun')}
            >
              <Text style={styles.secondaryText}>Criar Perfil Voluntariado</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../assets/images/voluntarios.jpg")}
            style={styles.image}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#FBFAF4",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 32,
    color: "#000000",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#979CA5",
    marginBottom: 28,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#000000",
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
  loginButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F1E6AC",
    borderRadius: 10,
    paddingHorizontal: 20,
    height: 59,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  loginText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#000",
  },
  card: {
    backgroundColor: "#F6F2DD",
    borderRadius: 15,
    padding: 24,
    marginTop: 40,
  },
  createTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#000",
    marginBottom: 5,
    textAlign: "center",
  },
  cardText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#979CA5",
    marginBottom: 20,
    textAlign: "justify",
  },
  secondaryButton: {
    backgroundColor: "#F1E6AC",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#000",
  },
  image: {
    width: "100%",
    height: 280,
    borderRadius: 15,
    marginTop: 40,
    alignSelf: "center",
    resizeMode: "cover",
  },
});
