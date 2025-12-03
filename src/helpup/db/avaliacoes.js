
import { supabase } from './supabase';

/**
 * Adiciona uma nova avaliação na tabela 'avaliacoes' do Supabase.
 * @param {object} avaliacao - O objeto da avaliação.
 * @param {string} avaliacao.id_organizacao - UUID da organização avaliada.
 * @param {string} avaliacao.id_voluntario - UUID do voluntário que está avaliando.
 * @param {number} avaliacao.nota - A nota de 1 a 5.
 * @param {string} avaliacao.comentario - O comentário da avaliação.
 */
export async function addAvaliacao(avaliacao) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .insert([avaliacao])
    .select();

  if (error) {
    console.error('Erro ao adicionar avaliação:', error.message);
    throw error;
  }

  return data;
}

/**
 * Busca todas as organizações (ONGs) da tabela 'perfil'.
 * Usado para popular o seletor de ONGs na tela de avaliação.
 */
export async function getAllOngs() {
  const { data, error } = await supabase
    .from('perfil')
    .select('id, org_name') // Seleciona o ID e o nome da organização
    .eq('role', 'org'); // Filtra apenas por perfis de organização

  if (error) {
    console.error('Erro ao buscar ONGs:', error.message);
    throw error;
  }
  return data;
}

/**
 * Busca todas as avaliações de uma organização específica.
 * @param {string} id_organizacao - O UUID da organização.
 */
export async function getAvaliacoesByOrganizacao(id_organizacao) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*')
    .eq('id_organizacao', id_organizacao);

  if (error) {
    console.error('Erro ao buscar avaliações por organização:', error.message);
    throw error;
  }
  return data;
}

/**
 * Busca todas as avaliações de um voluntário específico, incluindo o nome da ONG.
 * @param {string} id_voluntario - O UUID do voluntário.
 */
export async function getAvaliacoesByVoluntario(id_voluntario) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .select('*, perfil:id_organizacao ( org_name )')
    .eq('id_voluntario', id_voluntario)
    .order('data_avaliacao', { ascending: false });

  if (error) {
    console.error('Erro ao buscar avaliações por voluntário:', error.message);
    throw error;
  }
  return data;
}

/**
 * Atualiza uma avaliação existente.
 * @param {string} id - O UUID da avaliação a ser atualizada.
 * @param {object} updates - Os campos a serem atualizados (nota, comentario).
 */
export async function updateAvaliacao(id, updates, userId) {
  const { data, error } = await supabase
    .from('avaliacoes')
    .update(updates)
    .eq('id', id) // Garante que estamos atualizando a avaliação correta
    .eq('id_voluntario', userId); // E que ela pertence ao usuário logado

  if (error) {
    console.error('Erro ao atualizar avaliação:', error.message);
    throw error;
  }
  return data;
}

/**
 * Deleta uma avaliação.
 * @param {string} id - O UUID da avaliação a ser deletada.
 */
export async function deleteAvaliacao(id) {
  const { error } = await supabase.from('avaliacoes').delete().eq('id', id);

  if (error) {
    console.error('Erro ao deletar avaliação:', error.message);
    throw error;
  }
}
