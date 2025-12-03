# Plano de Testes de Usabilidade

Os testes de usabilidade permitem avaliar a qualidade da interface com o usuário da aplicação interativa.

Um plano de teste de usabilidade deverá conter: 

## Definição do(s) objetivo(s)

Antes de iniciar os testes, é essencial definir o que se deseja avaliar na usabilidade do sistema. No caso do Help Up, os testes têm como objetivo principal analisar se o aplicativo realmente cumpre sua proposta de conectar voluntários e organizações sociais de forma simples, rápida e eficiente.

**Os objetivos específicos dos testes de usabilidade são:**

1) Verificar se os usuários conseguem realizar as tarefas essenciais do aplicativo (cadastro, login, candidatura e criação de oportunidades) sem dificuldades;<br>
2) Identificar barreiras na navegação e possíveis falhas de compreensão na interface;<br>
3) Avaliar se o design do aplicativo é intuitivo e agradável, promovendo uma experiência fluida e acessível;<br>
4) Medir o nível de satisfação dos usuários ao utilizar as principais funcionalidades;<br>
5) Testar a acessibilidade da aplicação para diferentes perfis de usuários, incluindo pessoas com diferentes níveis de familiaridade com tecnologia;<br>
6) Coletar sugestões dos usuários para aprimorar a experiência geral e fortalecer o engajamento social dentro da plataforma.

## Seleção dos participantes

Para garantir que o teste reflita o uso real do sistema, é importante selecionar participantes que representem o público-alvo do Help Up, ou seja, voluntários e representantes de organizações sociais.

**Critérios para seleção dos participantes:**

**Perfis variados:** incluir tanto voluntários quanto membros de ONGs, com diferentes idades e contextos sociais;<br>
**Níveis de familiaridade com tecnologia:** desde usuários que já utilizam aplicativos com frequência até pessoas com pouca experiência digital;<br>
**Interesses diversos:** pessoas que buscam causas sociais variadas (ambientais, educacionais, culturais, animais, etc.);<br>
**Acessibilidade:** incluir, se possível, participantes com necessidades especiais para avaliar a inclusão digital.

**Quantidade recomendada:**

**Mínimo:** 5 participantes.<br>
**Ideal:** Entre 8 e 12 para maior diversidade.

**Exemplo de perfis incluídos:**

Jovens estudantes interessados em ações de voluntariado;<br>
Profissionais que desejam contribuir com tempo ou conhecimento;<br>
Representantes de ONGs que buscam voluntários para projetos sociais;<br>
Aposentados que desejam se envolver em atividades solidárias;<br>
Pessoas em busca de oportunidades de impacto social local.

## Definição de cenários de teste

Os cenários representam tarefas reais que os usuários executam no sistema. Neste projeto, cada grupo deverá definir, no mínimo, **CINCO cenários para a aplicação** e cada cenário deve incluir:<br>

**Objetivo:** O que será avaliado.<br>
**Contexto:** A situação que leva o usuário a interagir com o sistema.<br>
**Tarefa:** A ação que o usuário deve realizar.<br>
**Critério de sucesso:** Como determinar se a tarefa foi concluída corretamente.<br>

| **Cenário de Teste** | **CTU1 - Cadastro e Login no Aplicativo**  |
|:---:	|:---:	|
| Perfil | Usuário (Voluntário ou Organização) | 
| Objetivo do teste | Verificar a tela inicial de cadastro e login. | 
| Contexto | O usuário deseja criar uma conta ou acessar o sistema pela primeira vez para buscar oportunidades ou criar ações sociais. |  
| Tarefas | O usuário deve abrir o aplicativo, preencher o formulário de cadastro com suas informações e clicar em “Cadastrar”. Após o cadastro, deve fazer login com o e-mail e senha criados. |
| Critério de sucesso | O sistema deve redirecionar o usuário à tela principal após o login, exibindo seu nome. |

| **Cenário de Teste** | **CTU2 - Candidatar-se a uma vaga de voluntariado**  |
|:---:	|:---:	|
| Perfil | Usuário (Voluntário) | 
| Objetivo do teste | Verificar a funcionalidade de visualização e candidatura às oportunidades disponíveis. | 
| Contexto | O voluntário deseja participar de uma ação solidária que corresponda aos seus interesses e localização. |  
| Tarefas |  O usuário deve acessar a aba “Vagas Disponíveis”, visualizar as oportunidades listadas, selecionar uma delas e clicar em “Candidatar-se”. |
| Critério de sucesso |  O sistema deve exibir uma mensagem de confirmação e a vaga deve aparecer na aba “Minhas Candidaturas”. |

|**Cenário de Teste** | **CTU3 - Criação de nova oportunidade de voluntariado** |
|:---:	|:---:	|
| Perfil |  Usuário (Organização) | 
| Objetivo do teste | Verificar a funcionalidade de criação de oportunidades no sistema. | 
| Contexto |  A organização deseja divulgar uma nova ação de voluntariado para receber candidaturas de voluntários. |
| Tarefas | O usuário deve clicar no botão “Criar Voluntariado”. Em seguida, preencher o formulário e confirmar.  |  
| Critério de sucesso | A nova oportunidade deve aparecer na lista de ações da organização e ficar visível para voluntários na aba “Vagas Disponíveis”. |

| **Cenário de Teste** | **CTU4 - Editar informações do perfil**  |
|:---:	|:---:	|
| Perfil | Usuário (Voluntário ou Organização) | 
| Objetivo do teste| Verificar a aba de Configurações e edição de informações pessoais. | 
| Contexto | O usuário deseja atualizar suas informações de perfil, como foto, nome ou telefone. |
| Tarefas |  O usuário deve acessar a aba “Configurações”, clicar em “Editar Perfil”, alterar os dados desejados e salvar.  |  
| Critério de sucesso | As informações atualizadas devem aparecer corretamente na página de perfil. |

| **Cenário de Teste** | **CTU5 - Avaliar uma ONG após participação**  |
|:---:	|:---:	|
| Perfil | Usuário (Voluntário) | 
| Objetivo do teste | Verificar o sistema de avaliações das organizações. | 
| Contexto | O voluntário concluiu uma atividade e deseja avaliar a ONG para ajudar outros usuários. |
| Cenário |  O usuário deve acessar a aba “Minhas Candidaturas”, selecionar uma oportunidade concluída, clicar em “Avaliar ONG” e registrar uma nota e comentário.  |  
| Critério de sucesso | A avaliação deve ser registrada com sucesso e aparecer na página da ONG. |

## Métodos de coleta de dados

Os dados coletados devem ajudar a entender a experiência dos usuários e os dados podem ser coletados por observação direta incluindo métricas quantitativas (quantidade de cliques, número de erros, tempo gasto para cada tarefa etc.), métricas qualitativas (dificuldades, comentários etc.) e questionários pós-teste (A interface foi fácil de entender? Você encontrou dificuldades em alguma etapa? O que poderia ser melhorado?)

Para cada voluntário do teste, é fundamental coletar e apresentar todos os dados/métricas previamente definidos, mas não se esqueça: atendendo à LGPD (Lei Geral de Proteção de Dados), nenhum dado sensível, que permita identificar o voluntário, deverá ser apresentado).

| **Usuário** | **Tempo Total (seg)**  | **Quantidade de cliques** | **Tarefa foi concluida?** | **Erros cometidos:** | **Feedback do Usuário** |
|----------- | --------------- | ------- | -------- | -------- | -------- |
| Usuário 01 - CTU01 | 45 | 6 | 5/5 (100%) | 0 | Positivo: Fluxo de cadastro e login fáceis. |
| Usuário 02 - CTU02 | 40 | 4 | 5/5 (100%) | 0 | Muito Positivo: Usuário com alta familiaridade digital. Completou a candidatura rapidamente.|
| Usuário 03 - CTU03 | 57 | 11 | 5/5 (100%) | 0 | Positivo: Foi criado o voluntariado sem dificuldades. |
| Usuário 04 - CTU04 | 50 | 7 | 5/5 (100%) | 0 | Muito Positivo: Interface objetiva e intuitiva. |
| Usuário 05 - CTU05 | 45 | 5 | 5/5 (100%) | 0 | Positivo: Gostou da funcionalidade de avaliar a ONG. |

As referências abaixo irão auxiliá-lo na geração do artefato "Plano de Testes de Usabilidade".

> **Links Úteis**:
> - [Teste De Usabilidade: O Que É e Como Fazer Passo a Passo (neilpatel.com)](https://neilpatel.com/br/blog/teste-de-usabilidade/)
> - [Teste de usabilidade: tudo o que você precisa saber! | by Jon Vieira | Aela.io | Medium](https://medium.com/aela/teste-de-usabilidade-o-que-voc%C3%AA-precisa-saber-39a36343d9a6/)
> - [Planejando testes de usabilidade: o que (e o que não) fazer | iMasters](https://imasters.com.br/design-ux/planejando-testes-de-usabilidade-o-que-e-o-que-nao-fazer/)
> - [Ferramentas de Testes de Usabilidade](https://www.usability.gov/how-to-and-tools/resources/templates.html)
