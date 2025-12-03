import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/db/supabase';

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const navigateByRole = async (userId: string) => {
        try {
            const { data: profile, error } = await supabase
                .from('perfil')
                .select('role')
                .eq('id', userId)
                .single();
            if (error || !profile) {
                console.error("Failed to load role:", error?.message);
                router.replace('/auth/login');
                return;
            }
            if (profile.role === 'org') {
                router.replace('/main/organizacao');
            } else if (profile.role === 'voluntario') {
                router.replace('/main/voluntario');
            } else {
                router.replace('/auth/login');
            }
        } catch (err) {
            console.error("Unexpected error loading role:", err);
            router.replace('/auth/login');
        }
    };

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error("Error getting session:", error.message);
                    router.replace('/auth/login');
                    return;
                }

                const session = data.session;

                if (session?.user) {
                    await navigateByRole(session.user.id);
                } else {
                    router.replace('/auth/login');
                }
            } catch (err) {
                console.error("Session check failed:", err);
                router.replace('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                if (session?.user) {
                    await navigateByRole(session.user.id);
                } else {
                    router.replace('/auth/login');
                }
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ marginTop: 20 }}>Verificando sessão...</Text>
            </View>
        );
    }

    return null;
}
