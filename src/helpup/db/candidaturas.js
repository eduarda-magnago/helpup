import { supabase } from "./supabase";

export async function getCandidaturasByOrganization(organizationId) {
    // First, get all vagas created by this organization
    const { data: vagas, error: vagasError } = await supabase
        .from("vagas")
        .select("id")
        .eq("ong", organizationId);

    if (vagasError) throw vagasError;

    if (!vagas || vagas.length === 0) {
        return [];
    }

    const vagaIds = vagas.map((v) => v.id);

    // Then, get candidaturas for those vagas
    const { data, error } = await supabase
        .from("candidaturas")
        .select(
            `
      *,
      usuario:perfil (
        id,
        name,
        plan_type
      ),
      vaga:vagas (
        id,
        titulo,
        capa
      )
    `
        )
        .in("vaga_id", vagaIds)
        .order("created_at", { ascending: false });

    if (error) throw error;

    // Normalize structure
    const candidaturas =
        data?.map((item) => ({
            id: item.id,
            usuario_id: item.usuario_id,
            vaga_id: item.vaga_id,
            created_at: item.created_at,
            usuario: item.usuario
                ? {
                    id: item.usuario.id,
                    name: item.usuario.name,
                    plan_type: item.usuario.plan_type || "free",
                }
                : null,
            vaga: item.vaga
                ? {
                    id: item.vaga.id,
                    titulo: item.vaga.titulo,
                    capa: item.vaga.capa,
                }
                : null,
        })) || [];

    // Sort: premium users first, then recent first
    return candidaturas.sort((a, b) => {
        const aPremium = a.usuario?.plan_type === "premium";
        const bPremium = b.usuario?.plan_type === "premium";

        if (aPremium !== bPremium) {
            return aPremium ? -1 : 1; // premium comes first
        }

        return new Date(b.created_at) - new Date(a.created_at);
    });
}

export async function createCandidatura(usuarioId, vagaId) {
    const { error } = await supabase.from("candidaturas").insert({
        usuario_id: usuarioId,
        vaga_id: vagaId,
    });

    if (error) throw error;
}

export async function deleteCandidatura(id) {
    const { error } = await supabase
        .from("candidaturas")
        .delete()
        .eq("id", id);

    if (error) throw error;
}
