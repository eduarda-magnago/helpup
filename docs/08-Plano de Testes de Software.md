# Plano de Testes de Software

## **CT01 – Página inicial e formulário de login/cadastro**

| **Caso de Teste** | **CT01 – Página inicial e formulário de login/cadastro** |
|---|---|
| **Requisito Associado** | RF-001 – A aplicação deverá conter uma página inicial da HelpUp com formulário de cadastro/login. |
| **Objetivo do Teste** | Verificar se a página inicial exibe corretamente o formulário de login e cadastro. |
| **Responsável** | Eduarda e Carolina |
| **Passos** | - Acessar o aplicativo HelpUp.<br>- Verificar se há opções de **“Entrar”** e **“Criar Perfil ONG ou Criar Perfil Voluntariado”**.<br>- Clicar em **“Criar Perfil ONG”** e observar se o formulário aparece corretamente.<br>- Retornar e clicar em **“Entrar”** para verificar se o formulário de login é exibido. |
| **Critério de Êxito** | A página inicial é exibida corretamente e os formulários de login e cadastro são acessíveis. |

## **CT02 – Edição de informações pessoais**

| **Caso de Teste** | **CT02 – Edição de informações pessoais** |
|---|---|
| **Requisito Associado** | RF-002 – Os usuários possuem o controle de editar suas informações pessoais na aba de Configurações. |
| **Objetivo do Teste** | Garantir que o usuário possa alterar e salvar suas informações com sucesso. |
| **Responsável** | Eduarda |
| **Passos** | - Acessar a aba **“Configurações”**.<br>- Editar campos (nome, habibilidades, sobre mim, etc).<br>- Clicar em **“Salvar”**.<br>- Sair e entrar novamente para verificar a persistência. |
| **Critério de Êxito** | As informações editadas são salvas e exibidas corretamente após o login. |


## **CT03 – Visualização da página de perfil**

| **Caso de Teste** | **CT03 – Visualização da página de perfil** |
|---|---|
| **Requisito Associado** | RF-003 – Os usuários conseguem visualizar sua página de Perfil com todas as suas informações salvas. |
| **Objetivo do Teste** | Verificar se a página de perfil exibe corretamente as informações do usuário. |
| **Responsável** | Eduarda |
| **Passos** | - Logar com uma conta de usuário.<br>- Acessar a aba **“Perfil”**.<br>- Verificar nome, e-mail, foto e demais informações.<br>- Confirmar se alterações feitas em **Configurações** aparecem no perfil. |
| **Critério de Êxito** | O perfil exibe corretamente todas as informações do usuário. |

## **CT04 – Criação de vagas voluntárias**

| **Caso de Teste** | **CT04 – Criação de vagas voluntárias** |
|---|---|
| **Requisito Associado** | RF-004 – A aplicação deve permitir que uma organização crie novas oportunidades de trabalho voluntário. |
| **Objetivo do Teste** | Verificar se as organizações podem criar novas vagas com sucesso. |
| **Responsável** | Matheus |
| **Passos** | - Entrar com uma conta de organização.<br>- Ir até a tela **“Criar Vaga”**.<br>- Preencher campos obrigatórios (título, categoria, público, local, habilidaes, etc).<br>- Clicar em **“Salvar”**.<br>- Verificar se a vaga aparece na lista de vagas disponíveis. |
| **Critério de Êxito** | A vaga é criada corretamente e exibida para os voluntários. |


## **CT05 – Visualização de candidaturas recebidas (organização)**

| **Caso de Teste** | **CT05 – Visualização de candidaturas recebidas** |
|---|---|
| **Requisito Associado** | RF-005 – O sistema deverá permitir que as organizações visualizem candidaturas recebidas. |
| **Objetivo do Teste** | Garantir que as organizações consigam ver as candidaturas às vagas criadas. |
| **Responsável** | Matheus |
| **Passos** | - Entrar com conta de organização.<br>- Acessar **“Gerenciar Vagas”**.<br>- Selecionar uma vaga criada.<br>- Verificar a lista de voluntários e os detalhes de cada candidatura. |
| **Critério de Êxito** | As candidaturas enviadas pelos voluntários são exibidas corretamente para a organização. |


## **CT06 – Visualização e candidatura às vagas**

| **Caso de Teste** | **CT06 – Visualização e candidatura às vagas** |
|---|---|
| **Requisito Associado** | RF-006 – O sistema deve permitir que os voluntários visualizem e se candidatem às vagas disponíveis. |
| **Objetivo do Teste** | Validar se o voluntário consegue ver as vagas e se candidatar com sucesso. |
| **Responsável** | Leandro |
| **Passos** | - Entrar com uma conta de voluntário.<br>- Navegar até **“Inscrições”**.<br>- Verificar se a lista de vagas é exibida.<br>- Selecionar uma vaga e clicar em **“Candidatar-se”**.<br>- Confirmar o envio da candidatura. |
| **Critério de Êxito** | O voluntário visualiza as vagas e consegue enviar sua candidatura com sucesso. |


## **CT07 – Visualização de candidaturas enviadas**

| **Caso de Teste** | **CT07 – Visualização de candidaturas enviadas** |
|---|---|
| **Requisito Associado** | RF-007 – O sistema deve permitir que os voluntários visualizem suas candidaturas enviadas. |
| **Objetivo do Teste** | Verificar se o voluntário consegue ver todas as candidaturas que enviou. |
| **Responsável** | Leandro |
| **Passos** | - Logar como voluntário.<br>- Acessar **“Candidaturas Enviadas”**.<br>- Verificar se são listadas as vagas para as quais o voluntário se candidatou.<br>- Abrir uma candidatura e validar os detalhes (status, data, vaga). |
| **Critério de Êxito** | Todas as candidaturas enviadas são exibidas corretamente. |


## **CT08 – Fórum geral de discussão**

| **Caso de Teste** | **CT08 – Fórum geral de discussão** |
|---|---|
| **Requisito Associado** | RF-008 – A aplicação deve conter um fórum geral de discussão com perguntas e respostas. |
| **Objetivo do Teste** | Verificar se o fórum está disponível e permite a visualização e interação entre usuários. |
| **Responsável** | Carolina |
| **Passos** | - Acessar o aplicativo com um usuário autenticado.<br>- Navegar até a seção **“Fórum”**.<br>- Verificar se perguntas e respostas existentes são exibidas.<br>- Criar uma nova pergunta e verificar se ela aparece na lista.<br>- Responder a uma pergunta e verificar se a resposta é registrada corretamente. |
| **Critério de Êxito** | O fórum exibe perguntas e respostas corretamente, permitindo novas interações. |

## **CT09 – Avaliação de ONG’s**

| **Caso de Teste** | **CT09 – Avaliação de ONG’s** |
|---|---|
| **Requisito Associado** | RF-009 – O sistema deve permitir que usuários possam avaliar ONG’s. |
| **Objetivo do Teste** | Validar se o usuário consegue avaliar uma ONG e se a avaliação é salva corretamente. |
| **Responsável** | Igor |
| **Passos** | - Acessar o aplicativo com um usuário autenticado.<br>- Navegar até o perfil de uma ONG.<br>- Selecionar a opção **“Avaliar ONG”**.<br>- Atribuir uma nota e escrever um comentário.<br>- Enviar a avaliação e verificar se aparece no histórico da ONG. |
| **Critério de Êxito** | O sistema registra e exibe corretamente a avaliação enviada. |


## **CT10 – Conta Premium**

| **Caso de Teste** | **CT10 – Conta Premium** |
|---|---|
| **Requisito Associado** | RF-010 – O sistema possibilitará o usuário de obter uma conta Premium. |
| **Objetivo do Teste** | Verificar se o usuário pode realizar a assinatura Premium e se o status é atualizado. |
| **Responsável** | Carolina |
| **Passos** | - Logar com uma conta de usuário comum.<br>- Navegar até a tela **“Premium”**.<br>- Clicar em **“Assinar Plano Premium”**.<br>- Realizar o pagamento simulado (sandbox).<br>- Confirmar se o status do usuário muda para **“Premium”** e se as funcionalidades são liberadas. |
| **Critério de Êxito** | O usuário conclui a assinatura e tem acesso às funcionalidades Premium. |

                                                
