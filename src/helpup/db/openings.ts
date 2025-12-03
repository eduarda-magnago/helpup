import { supabase } from "./supabase";
import { PlanType, Tables, TablesInsert } from "./types";

export async function addOpening(
  add: TablesInsert<"vagas">
): Promise<Tables<"vagas">> {
  const { data, error } = await supabase
    .from("vagas")
    .insert(add)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllOpenings() {
  const { data, error } = await supabase.from("vagas").select(`
    *,
    ong:perfil (
      id,
      org_name,
      plan_type
    )
  `);
  if (error) throw error;

  type OpeningWithOrg = Omit<Tables<"vagas">, "ong"> & {
    ong?: {
      id: string;
      org_name: string | null;
      plan_type?: PlanType | null;
    } | null;
  };

  const openings = (data ?? []) as OpeningWithOrg[];

  return openings
    .map((item) => {
      if (item.ong && typeof item.ong === "object") {
        return {
          ...item,
          ong: { ...item.ong, plan_type: item.ong.plan_type ?? "free" },
        };
      }
      return item;
    })
    .sort((a, b) => {
      const aPremium = a.ong?.plan_type === "premium";
      const bPremium = b.ong?.plan_type === "premium";
      if (aPremium !== bPremium) {
        return aPremium ? -1 : 1;
      }
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
}

export type OpeningData = Awaited<ReturnType<typeof getAllOpenings>>[number];

export async function updateOpening(
  id: Tables<"vagas">["id"],
  update: Partial<Tables<"vagas">>
): Promise<Tables<"vagas"> | null> {
  const { data, error } = await supabase
    .from("vagas")
    .update(update)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data[0];
}

export async function deleteOpening(id: Tables<"vagas">["id"]): Promise<void> {
  const { error } = await supabase.from("vagas").delete().eq("id", id);
  if (error) throw error;
}

export async function getOrganizationOpeningsCount(organizationId: string) {
  const { count, error } = await supabase
    .from("vagas")
    .select("*", { count: "exact", head: true })
    .eq("ong", organizationId);

  if (error) throw error;

  return count ?? 0;
}

export async function getOrganizationOpenings(organizationId: string) {
  const { data, error } = await supabase
      .from("vagas").select(`
    *,
    ong:perfil (
      id,
      org_name,
      plan_type
    )
  `).eq("ong", organizationId);

  if (error) throw error;

  return data;
}
