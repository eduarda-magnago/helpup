import Footer from "@/components/Footer";
import OpeningForm, { OpeningFormData } from "@/components/OpeningForm";
import { theme } from "@/constants/theme";
import { updateOpening } from "@/db/openings";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, ScrollView, View } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";

export interface EditOpeningScreenProps {
  initialFormData: OpeningFormData;
  openingId: number;
}

export default function EditOpeningScreen() {
  const { screenProps } = useLocalSearchParams();
  const { initialFormData, openingId } = JSON.parse(
    screenProps as string
  ) as EditOpeningScreenProps;
  const router = useRouter();

  const onSubmit = async (data: OpeningFormData) => {
    if (!data.titulo?.trim()) {
      Alert.alert("Erro", "Título é obrigatório");
      return;
    }

    try {
      await updateOpening(openingId, data);
      Alert.alert("Sucesso", "Vaga atualizada com sucesso!");
      router.back();
    } catch (err: any) {
      Alert.alert("Erro", err?.message || "Não foi possível atualizar a vaga");
    }
  };

  return (
      <ScreenWrapper  style={{
        backgroundColor: theme.colors.background,
      }}>
        <ScrollView>
          <View style={{paddingHorizontal: 20}}>
            <OpeningForm
                initialData={initialFormData}
                button={{ label: "Salvar", onSubmit }}
            />
          </View>
          <Footer />
        </ScrollView>
      </ScreenWrapper>

  );
}
