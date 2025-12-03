# Instruções de utilização

### Instalar o Node.js

O projeto pede Node.js 22.13.1 (ou a última versão estável).

Passos:
- Acesse: https://nodejs.org
- Baixe e instale a versão recomendada (LTS 22.13.1).
- Confirme a instalação no terminal:
`node -v`
Deve retornar algo como v22.13.1.

### Entrar na pasta src/helpUp e instalar dependências

No diretório do projeto:
`cd src/helpUp`
`npx expo install`  
O expo install vai garantir que todas as dependências sejam instaladas na versão compatível com o Expo.

### Rodar o projeto no Android

Após a instalação:
`npx expo start`

Isso abre o Expo Developer Tools no terminal.
Para rodar no emulador Android:  
Pressione a `tecla a`.  
O Expo tentará abrir o projeto no Android Studio Emulator (precisa estar instalado e configurado).

### Conferir se está rodando

O app deve abrir no emulador Android ou no dispositivo físico.  
Qualquer mudança no código será recarregada automaticamente.
