import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { PlanType, Tables } from "./types";

export function useProfile(): Tables<"perfil"> | null {
  const [profile, setProfile] = useState<Tables<"perfil"> | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const { data: profileData } = await supabase
        .from("perfil")
        .select("*")
        .eq("id", userData.user?.id ?? "")
        .single();
      setProfile(profileData);
    })();
  }, []);

  return profile;
}

export async function updateProfile(updates: Partial<Tables<"perfil">>) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return { error: userError };

  const { error } = await supabase
    .from("perfil")
    .update(updates)
    .eq("id", userData.user.id);

  return { error };
}

export async function updatePlan(plan: PlanType) {
  return updateProfile({ plan_type: plan });
}
