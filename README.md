# Esse é o back-end da aplicação

Aqui foram implementados a interface de comunicação com o banco de dados tal qual a de comunicação com o front-end do sistema e suas rotas.

Eu consegui terminar os controllers e as rotas que achava imprescindíveis para seu funcionamento.

Usei o mongoDB, e sua modelagem foi feita usando libs do pacote npm.

# Sobre Login e usuários

O back-end permite a criação de usuários de dois tipos, acessores e procuradores. No dois tipos, temos atribuições parecidas, e que se diferem no quesito a criação, remoção e edição de processos, conforme foi pedido no documento.

# Como rodar e banco de dados

Como citei, utilizei o mongoDB para armazenar e manter dados de usuários. Uma coisa que queria ter tido tempo para fazer era o deploy desse repositório, o que faria a API funcionar em um estado mais pleno e não ter problemas endereçamento nos testes a qual ela será submetida.
Sendo assim, o sistema funcionará localmente, no quesito execução, mas suas funcionalidades junto ao MongoDB continuam remotamente utilizando a string de conexão ao banco, presente já aqui.

Para executar API basta rodar um npm start no terminal no diretório do projeto. Pressinto que a comunicação com o mongo atlas pode falhar e o sistema não funcionar, pois a versão gratuita que utilizei não fica ativa 24h. Então um erro de conexão pode ser esperado. 
