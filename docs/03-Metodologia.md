
# Metodologia

Para garantir um desenvolvimento eficiente e organizado, adotamos a metodologia ágil Scrum, combinando sua estrutura iterativa com ferramentas que otimizam a colaboração e o acompanhamento do projeto. O Scrum foi escolhido devido aos seus benefícios, como ciclos curtos de entrega, flexibilidade para mudanças e maior comunicação entre os membros da equipe. Além do Scrum, utilizamos Kanban para visualização do fluxo de trabalho e priorização das tarefas, garantindo uma melhor organização e transparência no andamento do projeto.

## Relação de Ambientes de Trabalho (pendente)

Os artefatos do projeto são desenvolvidos a partir de diversas plataformas e a relação dos ambientes com seu respectivo propósito deverá ser apresentada em uma tabela que especifica que detalha Ambiente, Plataforma e Link de Acesso. 
Nota: Vide documento modelo do estudo de caso "Portal de Notícias" e defina também os ambientes e frameworks que serão utilizados no desenvolvimento de aplicações móveis.

## Controle de Versão

A ferramenta de controle de versão adotada no projeto foi o
[Git](https://git-scm.com/), sendo que o [Github](https://github.com)
foi utilizado para hospedagem do repositório.

O projeto segue a seguinte convenção para o nome de branches:

`main`: versão estável já testada do código  
`test`: versão em testes do código  
`dev`: versão de desenvolvimento do código

Fluxo de Trabalho entre Branches

`dev → test → main`

Regras de Transição

`dev → test`: Apenas código revisado e funcional  
`test → main`: Apenas versões completamente estáveis e validadas

Proteção de Branches

Branch `main`:
- Requer revisão de pull request para o merge (2 aprovações)
- Requer branches atualizados antes do merge

Branch `test`:
- Permite merge direto apenas da branch dev

Sistema de Issues - Etiquetas Principais   

`bug`: Funcionalidade com problemas    
`feature`: Nova funcionalidade  
`enhancement`: Melhoria em funcionalidade existente  
`documentation`: Melhorias na documentação  

## Gerenciamento de Projeto

### Divisão de Papéis

A equipe foi organizada da seguinte maneira:

- `Scrum Master`: Fernando Gavioli;
- `Product Owner`: Carolina Longhini;
- `Equipe de Desenvolvimento`: Carolina Longhini, Eduarda Azeredo Magnago, Fernando Gavioli, Igor Gabriel Cardoso, Leandro Araújo, Matheus Henrique Castiglieri Okamoto;
- `Equipe de Design`: Carolina Longhini, Eduarda Azeredo Magnago, Fernando Gavioli, Igor Gabriel Cardoso, Leandro Araújo, Matheus Henrique Castiglieri Okamoto.

### Processo

O acompanhamento e a organização das atividades do projeto são realizados por meio da ferramenta GitHub Projects, que permite estruturar visualmente o fluxo de trabalho em quadros e listas. Esse recurso facilita a gestão do desenvolvimento ágil, garantindo transparência na distribuição das tarefas e no progresso das entregas.
 
- `Product Backlog`: compreende o repositório de todas as funcionalidades, melhorias e correções previstas para o projeto. Essa lista centraliza as demandas identificadas ao longo do planejamento e durante o ciclo de vida do aplicativo.
- `Sprint Backlog`: corresponde à seleção das tarefas priorizadas para a sprint em andamento, permitindo foco nas entregas de maior valor para os usuários em um período determinado.
- `To Do`: reúne as atividades já planejadas e prontas para execução, mas que ainda não foram iniciadas.
- `In Progress`: contempla as tarefas que estão em desenvolvimento, possibilitando a identificação clara do que está sendo trabalhado pela equipe.
- `Done`: armazena as atividades já concluídas, funcionando como registro histórico de entregas e evidência da evolução do projeto.

### Ferramentas

As ferramentas empregadas no projeto são:

- `Desenvolvimento da aplicação`: React Native + Expo Framework
  - Permite desenvolvimento multiplataforma (Android e iOS) com uma única base de código. O Expo facilita o ciclo de testes e deploy, oferecendo ferramentas integradas que simplificam a manutenção do app
- `Editor de código`: VSCode
  - Editor leve, gratuito e amplamente utilizado, com integração nativa ao controle de versão e Javascript/Typescript
- `Comunicação`: Whatsapp
  - Acessível, popular e prático para comunicação rápida entre membros da equipe
- `Wireframing`: Figma
  - Plataforma colaborativa online para design e prototipação, permitindo que a equipe visualize, edite e comente em tempo real
