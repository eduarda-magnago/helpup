import { EditOpeningScreenProps } from "@/app/main/editOpening";
import { OpeningDetailsScreenProps } from "@/app/main/openingDetails";
import { theme } from "@/constants/theme";
import { deleteOpening, OpeningData } from "@/db/openings";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PremiumBadge from "./PremiumBadge";

interface OpeningProps {
  opening: OpeningData;
  showActions?: boolean;
}

export default function Opening({ opening, showActions }: OpeningProps) {
  const router = useRouter();
  const isPremiumOng = opening.ong?.plan_type === "premium";

  const handleDetails = () => {
    router.push({
      pathname: "/main/openingDetails",
      params: {
        screenProps: JSON.stringify({
          opening,
        } satisfies OpeningDetailsScreenProps),
      },
    });
  };

  const handleEdit = () => {
    router.push({
      pathname: "/main/editOpening",
      params: {
        screenProps: JSON.stringify({
          initialFormData: opening,
          openingId: opening.id,
        } satisfies EditOpeningScreenProps),
      },
    });
  };

  const handleDelete = () => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir esta vaga?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: handleDeleteConfirm },
    ]);
  };

  const handleDeleteConfirm = async () => {
    await deleteOpening(opening.id);
    router.replace("/main/openings");
  };

  const formattedDate = new Date(opening.created_at).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
    }
  );

  return (
    <View style={{ marginBottom: 16 }}>
      <TouchableOpacity onPress={handleDetails} activeOpacity={0.7}>
        <View style={[styles.cardContainer]}>
          {opening.capa && (
            <ExpoImage
              source={{ uri: opening.capa }}
              style={styles.coverImage}
              contentFit="cover"
            />
          )}

          <View style={styles.contentContainer}>
            <Text style={styles.openingTitle} numberOfLines={1}>
              {opening.titulo}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.openingDate}>{formattedDate}</Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4].map((i) => (
                  <FontAwesome key={i} name="star" size={12} color="#FFC107" />
                ))}
                <FontAwesome name="star-half-full" size={12} color="#FFC107" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>

            <View style={styles.orgRow}>
              <Text style={styles.orgText} numberOfLines={1}>
                Por {opening.ong?.org_name || "Organização"}
              </Text>
              <PremiumBadge
                plan={opening.ong?.plan_type}
                type="ong"
                style={{ marginLeft: 6 }}
              />
            </View>
          </View>

          {showActions && (
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={handleEdit}
                style={styles.actionButton}
              >
                <Feather
                  name="edit-2"
                  size={20}
                  color={theme.colors.darkGrey}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.actionButton}
              >
                <Feather
                  name="trash-2"
                  size={20}
                  color={theme.colors.darkGrey}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    paddingVertical: 12,
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: theme.colors.inputBackground,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  openingTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: theme.colors.darkGrey,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  openingDate: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#999",
    marginRight: 8,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    height: 18,
  },
  ratingText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#FFC107",
    marginLeft: 4,
    lineHeight: 18,
  },
  orgRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  orgText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#999",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    gap: 12,
  },
  actionButton: {
    padding: 4,
  },
});
