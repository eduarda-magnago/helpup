
import { supabase } from './supabase';

/**
 * Adiciona uma nova inscrição na tabela 'inscricoes' do Supabase.
 * @param {object} inscricao - O objeto da inscrição.
 * @param {number} inscricao.id_voluntario - UUID do voluntário que está se inscrevendo.
 * @param {number} inscricao.id_vaga - UUID da vaga.
 * @param {string} inscricao.nome - Nome do candidato
 * @param {string} inscricao.email - E-mail do candidato
 * @param {string} inscricao.mensagem - Mensagem do candidato
 */
export async function addInscricao(inscricao) {
  const { data, error } = await supabase
    .from('inscricoes')
    .insert([inscricao])
    .select();

  if (error) {
    console.error('Erro ao adicionar inscrição:', error.message);
    throw error;
  }

  return data;
}

/**
 * Busca todas as Vagas da tabela 'vagas'.
 * Usado para popular o seletor de ONGs na tela de avaliação.
 */
export async function getAllVagas() {
  const { data, error } = await supabase
    .from('vagas')
    .select('id, titulo'); // Seleciona o ID e o nome da vaga


  if (error) {
    console.error('Erro ao buscar Vagas:', error.message);
    throw error;
  }
  return data;
}



/**
 * Busca todas as inscrições de um voluntário específico, incluindo o nome da Vaga.
 * @param {number} id_voluntario - O UUID do voluntário.
 */
export async function getInscricoesByVoluntario(id_voluntario) {
  const { data, error } = await supabase
      .from("inscricoes")
      .select(`
      *,
      vagas (
        id,
        titulo,
        descricao,
        categoria,
        capa,
        perfil:ong (
          org_name,
          name,
          city,
          img
        )
      )
    `)
      .eq("id_voluntario", id_voluntario)
      .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar inscrições por voluntário:", error.message);
    throw error;
  }

  return data;
}


/**
 * Atualiza uma inscrição existente.
 * @param {string} id - O UUID da inscrição a ser atualizada.
 * @param {object} updates - Os campos a serem atualizados (nome, vaga, e-mail, mensagem).
 */
export async function updateInscricao(id, updates, userId) {
  const { data, error } = await supabase
    .from('inscricoes')
    .update(updates)
    .eq('id', id) // Garante que estamos atualizando a inscrição correta
    .eq('id_voluntario', userId); // E que ela pertence ao usuário logado

  if (error) {
    console.error('Erro ao atualizar inscrição:', error.message);
    throw error;
  }
  return data;
}

/**
 * Deleta uma inscrição.
 * @param {string} id - O UUID da avaliação a ser deletada.
 */
export async function deleteInscricao(id) {
  const { error } = await supabase.from('inscricoes').delete().eq('id', id);

  if (error) {
    console.error('Erro ao deletar inscrição:', error.message);
    throw error;
  }
}
