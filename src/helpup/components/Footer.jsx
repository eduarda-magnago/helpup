import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useProfile } from "@/db/profiles";

// Icons
import MenuIcon from "../assets/images/element-3.png";
import FogueteIcon from "../assets/images/foguete.png";
import HandIcon from "../assets/images/hand.png";
import CheckIcon from "../assets/images/check.png";
import ForumIcon from "../assets/images/forum.png";
import SettingsIcon from "../assets/images/settings.png";

const FooterButton = memo(({ icon, link, router }) => (
    <TouchableOpacity onPress={() => router.push(link)}>
        <Image source={icon} style={styles.iconePlaceholder} />
    </TouchableOpacity>
));

const Footer = () => {
    const router = useRouter();
    const profile = useProfile();

    const orgButtons = [
        { icon: MenuIcon, link: "/main/organizacao" },
        { icon: FogueteIcon, link: "/main/createOpening" },
        { icon: HandIcon, link: "/main/openings" },
        { icon: ForumIcon, link: "/forum" },
        { icon: SettingsIcon, link: "/main/perfilOng" },
    ];

    const volButtons = [
        { icon: MenuIcon, link: "/main/voluntario" },
        { icon: FogueteIcon, link: "/main/registrations" },
        // { icon: HandIcon, link: "/main/createOpening" },
        { icon: CheckIcon, link: "/main/avaliacoes" },
        { icon: ForumIcon, link: "/forum" },
        { icon: SettingsIcon, link: "/main/perfilUsuario" },
    ];

    const buttons = profile?.role === "org" ? orgButtons : volButtons;

    return (
        <View style={styles.iconesContainer}>
            {buttons.map((btn, index) => (
                <FooterButton key={index} icon={btn.icon} link={btn.link} router={router} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    iconesContainer: {
        width: "100%",
        height: 97,
        backgroundColor: "#ffffff",
        borderColor: "#e3e3e3",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingTop: 15,
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
    },
    iconePlaceholder: {
        width: 35,
        height: 35,
    },
});

export default memo(Footer);
