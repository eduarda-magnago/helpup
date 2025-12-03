# Arquitetura da Solução
## Diagrama de Classes
<img width="963" height="1032" alt="diagrama_classes_helpup" src="https://github.com/user-attachments/assets/e18b06aa-3218-42ed-b2e2-d008a36e438a" />

## Modelo ER
<img width="2698" height="2168" alt="Diagrama ER" src="https://github.com/user-attachments/assets/cecf9fec-c050-49cd-963c-546f2c931037" />

## Esquema Relacional
<img width="1280" height="720" alt="Modelo ER" src="https://github.com/user-attachments/assets/537551e4-1b04-4d6a-b612-c8c986ec79b4" />


## Modelo Físico
### SQLite
```
CREATE TABLE IF NOT EXISTS replies (
    message TEXT,
    topic_id SERIAL PRIMARY KEY,
    user_id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS avaliacoes (
    comentario TEXT,
    data_avaliacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    id_organizacao TEXT,
    id_voluntario TEXT,
    nota TEXT
);

CREATE TABLE IF NOT EXISTS topics (
    content TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    user_id SERIAL PRIMARY KEY
);
```

### Supabase
```
CREATE TABLE IF NOT EXISTS "public"."perfil" (
    "id" "uuid" NOT NULL,
    "role" "text" NOT NULL,
    "name" "text",
    "city" "text",
    "about" "text",
    "org_name" "text",
    "audience" "text",
    "skills" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "perfil_role_check" CHECK (("role" = ANY (ARRAY['voluntario'::"text", 'org'::"text", 'admin'::"text", 'guest'::"text"])))
);

CREATE TABLE IF NOT EXISTS "public"."vagas" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "titulo" "text" NOT NULL,
    "ong" "uuid" NOT NULL,
    "categoria" "text",
    "publico" "text",
    "descricao" "text",
    "habilidades" "text",
    "local_tempo" "text",
    "atividades" "text",
    "capa" "text"
);

```
## Tecnologias Utilizadas

| **Tecnologia** | **Função Principal** | **Tipo** |
|----------------|----------------------|-----------|
| **Expo** | Framework para desenvolvimento mobile | Framework |
| **Android Emulator** | Testes e simulação de dispositivo Android | Ferramenta |
| **Supabase** | Backend (autenticação + PostgreSQL + API REST) | BaaS |
| **JavaScript / TypeScript** | Lógica da aplicação e integração com backend | Linguagens |
| **SQLite** | Banco de dados local (cache e modo offline) | Banco local |
| **VS Code / GitHub / Node.js / Postman** | Suporte ao desenvolvimento, testes e versionamento | Ferramentas |


  
## Hospedagem (pendente)

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Adotaremos o modelo ISO/IEC 25010 para selecionar subcaracterísticas diretamente ligadas ao nosso contexto: app móvel que conecta voluntários e organizações, com forte ênfase em segurança, usabilidade, desempenho e confiabilidade.

Abaixo seguem as subcaracterísticas que nortearão o desenvolvimento, a justificativa de cada escolha e as métricas que usaremos para avaliar continuamente a qualidade de software.

- **Adequação Funcional**
  - Garantir que o aplicativo ofereça as funções certas (cadastro, busca, candidatura e comunicação).
  - **Métrica**: percentual de funcionalidades críticas implementadas e taxa de falhas funcionais.
- **Usabilidade**
  - Facilitar a vida do usuário, com interface clara, acessível e fácil de aprender.
  - **Métrica**: tempo médio para concluir a primeira candidatura
- **Confiabilidade**
  - Manter o sistema estável e disponível, mesmo em momentos de maior demanda.
  - **Métrica**: disponibilidade mensal (% uptime); taxa de sessões sem falhas (crash-free).
- **Eficiência de Desempenho**
  - Respostas rápidas e consumo otimizado de recursos do celular.
  - **Métrica**: tempo médio de resposta da API; consumo de dados por sessão.
- **Segurança**
  - Proteger dados pessoais e garantir autenticidade dos perfis.
  - **Métrica**: número de vulnerabilidades críticas detectadas; cobertura de criptografia nos dados.
- **Manutenibilidade**
  - Facilitar evolução e correção do sistema ao longo do tempo.
  - **Métrica**: tempo médio para corrigir erros; cobertura de testes automatizados.
- **Portabilidade**
  - Funcionar bem em diferentes versões de Android e dispositivos.
  - **Métrica**: taxa de falhas específicas por dispositivo/versão.
