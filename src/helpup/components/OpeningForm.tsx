import { theme } from "@/constants/theme";
import { supabase } from "@/db/supabase";
import { Tables } from "@/db/types";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type OpeningFormData = Omit<
  Tables<"vagas">,
  "ong" | "id" | "created_at"
>;

export const defaultOpeningFormData: OpeningFormData = Object.freeze({
  atividades: null,
  capa: null,
  categoria: null,
  descricao: null,
  habilidades: null,
  local_tempo: null,
  publico: null,
  titulo: "",
});

export interface OpeningFormProps {
  initialData?: OpeningFormData;
  button?: {
    label: string;
    onSubmit: (data: OpeningFormData) => void;
  };
}

export default function OpeningForm({ initialData, button }: OpeningFormProps) {
  const [data, setData] = useState<OpeningFormData>(
    initialData || defaultOpeningFormData
  );
  const [uploading, setUploading] = useState(false);

  const handleImagePick = async () => {
    try {
      // Request permission to access media library
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de permissão para acessar suas fotos."
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      const image = result.assets[0];
      if (!image) {
        return;
      }

      setUploading(true);

      // Generate unique filename
      const fileExt = image.uri.split(".").pop() || "jpg";
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `capa/${fileName}`;

      // Read file using new File API
      const file = new File(image.uri);
      const arrayBuffer = await file.arrayBuffer();
      const byteArray = new Uint8Array(arrayBuffer);

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("user-uploads")
        .upload(filePath, byteArray, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("user-uploads")
        .getPublicUrl(filePath);

      if (urlData?.publicUrl) {
        setData({ ...data, capa: urlData.publicUrl });
      }
    } catch (error: any) {
      Alert.alert(
        "Erro",
        error?.message || "Não foi possível fazer upload da imagem"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    button?.onSubmit({
      atividades: data.atividades?.trim() || null,
      capa: data.capa?.trim() || null,
      categoria: data.categoria?.trim() || null,
      descricao: data.descricao?.trim() || null,
      habilidades: data.habilidades?.trim() || null,
      local_tempo: data.local_tempo?.trim() || null,
      publico: data.publico?.trim() || null,
      titulo: data.titulo?.trim(),
    });
  };

  return (
    <View style={{marginTop: 20}}>
      <Text style={{ ...styles.titulo, marginBottom: 28 }}>
        Criar nova vaga
      </Text>

      <Text style={styles.rotulo}>Nome</Text>
      <TextInput
        value={data.titulo}
        onChangeText={(text) => setData({ ...data, titulo: text })}
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />

      <Text style={styles.rotulo}>Categoria</Text>
      <TextInput
        value={data.categoria ?? ""}
        onChangeText={(text) => setData({ ...data, categoria: text })}
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />

      <Text style={styles.rotulo}>Público</Text>
      <TextInput
        value={data.publico ?? ""}
        onChangeText={(text) => setData({ ...data, publico: text })}
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />

      <Text style={styles.rotulo}>Descrição do projeto</Text>
      <TextInput
        value={data.descricao ?? ""}
        onChangeText={(text) => setData({ ...data, descricao: text })}
        multiline
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />

      <Text style={styles.rotulo}>Habilidades necessárias</Text>
      <TextInput
        value={data.habilidades ?? ""}
        onChangeText={(text) => setData({ ...data, habilidades: text })}
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />

      <Text style={styles.rotulo}>Local, quantidade de horas e dias</Text>
      <TextInput
        value={data.local_tempo ?? ""}
        onChangeText={(text) => setData({ ...data, local_tempo: text })}
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />

      <Text style={styles.rotulo}>
        Quais serão as atividades realizadas nesse projeto?
      </Text>
      <TextInput
        value={data.atividades ?? ""}
        onChangeText={(text) => setData({ ...data, atividades: text })}
        style={styles.input}
        placeholderTextColor={theme.colors.subtitle}
      />
      <Text style={styles.rotulo}>Upload da capa</Text>
      {data.capa ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: data.capa }} style={styles.imagePreview} />
            <TouchableOpacity
                style={styles.changeImageButton}
                onPress={handleImagePick}
                disabled={uploading}
            >
              <Text style={styles.changeImageButtonText}>
                {uploading ? "Enviando..." : "Alterar imagem"}
              </Text>
            </TouchableOpacity>
          </View>
      ) : (
          <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePick}
              disabled={uploading}
          >
            <Text style={styles.uploadButtonText}>
              {uploading ? "Enviando..." : "Selecionar imagem"}
            </Text>
          </TouchableOpacity>
      )}
      <View style={{marginTop: 30}}>
        {button ? (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 30,
    color: "#000",
  },
  rotulo: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#000",
    marginBottom: 6,
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: theme.colors.darkGrey,
    marginBottom: 6,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 21,
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 11,
    borderRadius: 15,
    backgroundColor: theme.colors.buttonBackground,
    marginBottom: 32,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
  },
  uploadButton: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 21,
    marginBottom: 16,
    alignItems: "center",
  },
  uploadButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: theme.colors.darkGrey,
  },
  imageContainer: {
    marginBottom: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 15,
    marginBottom: 12,
    backgroundColor: theme.colors.inputBackground,
  },
  changeImageButton: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 15,
    paddingVertical: 11,
    paddingHorizontal: 21,
    alignItems: "center",
  },
  changeImageButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 20,
    color: theme.colors.darkGrey,
  },
});
