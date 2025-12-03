import Footer from "@/components/Footer";
import OpeningForm, { OpeningFormData } from "@/components/OpeningForm";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { addOpening } from "@/db/openings";
import { supabase } from "@/db/supabase";
import ScreenWrapper from "../../components/ScreenWrapper";

export default function CreateOpeningScreen() {
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    })();
  }, []);

  const onSubmit = async (data: OpeningFormData) => {
    if (!userId) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }
    if (!data.titulo?.trim()) {
      Alert.alert("Erro", "Título é obrigatório");
      return;
    }

    try {
      await addOpening({
        ...data,
        ong: userId,
      });
      Alert.alert("Sucesso", "Vaga criada com sucesso!");
      router.replace("/main/openings");
    } catch (err: any) {
      Alert.alert("Erro", err?.message || "Não foi possível criar a vaga");
    }
  };

  return (
      <ScreenWrapper style={{ backgroundColor: "#FBFAF4" }}>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <OpeningForm button={{ label: "Criar vaga", onSubmit }} />

          </View>
        </ScrollView>
        <Footer />
      </ScreenWrapper>
  );
}
