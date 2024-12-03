# Sistema De Avisos - UTFPR

Projeto criado em Angular para a disciplina de Tecnologias Cliente-Servidor da turma de ADS do segundo semestre de 2024.

## Estado atual do projeto

### Funcionalidades do servidor
-Prompt de seleção de port ao iniciar o servidor;

-Criação e validação de token JWT;

-Validação de "nível" de usuário via token (seja ele comum ou admin);

-Receber e responder requests de criação de usuário;

-visualização de usuário por email;

-listagem de usuários;

-atualização de usuários;

-deleção de usuários;

-login e logout.

### Funcionalidades do cliente
-Telas de seleção de IP, login e um menu de testes provisório;

-No momento, o usuário pode enviar todos os requests os quais o servidor pode responder.

## Para rodar o código
Após a instalação das dependências, é possível iniciar o servidor de desenvolvimento ao digitar `ng serve` no terminal, desde que a porta 4200 esteja livre. Para acessá-lo, navegue a `http://localhost:4200/`.

Para rodar o servido, é necessário navegar à pasta src/server e digitar `node server`.

Vale notar que o código depende de um banco de dados Mongo.
